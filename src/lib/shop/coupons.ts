import "server-only";

import { FieldValue, Timestamp, type DocumentData, type Firestore } from "firebase-admin/firestore";

import { getAdminDb } from "@/lib/firebase/admin";
import {
  computeCouponDiscount,
  type AppliedCoupon,
  type Coupon,
  type CouponLineItem,
  type CouponValidationResult,
} from "@/lib/shop/coupon-types";

// Firebase Admin 未設定時的 fallback 優惠碼，讓本地 / 未連線環境仍可 demo。
const MOCK_COUPONS: Coupon[] = [
  { id: "mock-godright", code: "GODRIGHT", title: "全站 9 折", discountType: "percent", discountValue: 10, appliesTo: "all", usedCount: 0, isActive: true },
  { id: "mock-ebook50", code: "EBOOK50", title: "電子書折 NT$50", discountType: "fixed", discountValue: 50, appliesTo: "ebooks", usedCount: 0, isActive: true },
  { id: "mock-first100", code: "FIRSTBUY100", title: "首購折 NT$100", discountType: "fixed", discountValue: 100, appliesTo: "all", usageLimit: 1000, perUserLimit: 1, usedCount: 0, isActive: true },
];

function tsToIso(value: unknown): string | undefined {
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (typeof value === "string") return value;
  return undefined;
}

function mapCouponDoc(id: string, data: DocumentData): Coupon {
  return {
    id,
    code: String(data.code ?? "").toUpperCase(),
    title: data.title ?? "",
    discountType: data.discountType === "fixed" ? "fixed" : "percent",
    discountValue: Number(data.discountValue ?? 0),
    appliesTo: data.appliesTo ?? "all",
    targetIds: Array.isArray(data.targetIds) ? data.targetIds : undefined,
    startsAt: tsToIso(data.startsAt),
    endsAt: tsToIso(data.endsAt),
    usageLimit: typeof data.usageLimit === "number" ? data.usageLimit : undefined,
    usedCount: Number(data.usedCount ?? 0),
    perUserLimit: typeof data.perUserLimit === "number" ? data.perUserLimit : undefined,
    isActive: data.isActive !== false,
    createdAt: tsToIso(data.createdAt),
  };
}

function toApplied(coupon: Coupon): AppliedCoupon {
  return {
    code: coupon.code,
    title: coupon.title,
    discountType: coupon.discountType,
    discountValue: coupon.discountValue,
    appliesTo: coupon.appliesTo,
    targetIds: coupon.targetIds,
  };
}

async function getCouponByCode(code: string): Promise<Coupon | null> {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return null;

  try {
    const snapshot = await getAdminDb()
      .collection("coupons")
      .where("code", "==", normalized)
      .limit(1)
      .get();
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return mapCouponDoc(doc.id, doc.data());
    }
    return null;
  } catch {
    return MOCK_COUPONS.find((coupon) => coupon.code === normalized) ?? null;
  }
}

async function countUserRedemptions(code: string, userId: string): Promise<number> {
  try {
    const snapshot = await getAdminDb()
      .collection("couponRedemptions")
      .where("code", "==", code)
      .where("userId", "==", userId)
      .count()
      .get();
    return snapshot.data().count;
  } catch {
    return 0;
  }
}

/** 驗證優惠碼並計算折扣（server 唯一真實來源）。 */
export async function validateCoupon(
  code: string,
  items: CouponLineItem[],
  userId?: string | null,
): Promise<CouponValidationResult> {
  const coupon = await getCouponByCode(code);
  if (!coupon) return { valid: false, reason: "優惠碼不存在。" };
  if (!coupon.isActive) return { valid: false, reason: "優惠碼已停用。" };

  const now = Date.now();
  if (coupon.startsAt && now < new Date(coupon.startsAt).getTime()) {
    return { valid: false, reason: "優惠碼尚未開始。" };
  }
  if (coupon.endsAt && now > new Date(coupon.endsAt).getTime()) {
    return { valid: false, reason: "優惠碼已過期。" };
  }
  if (coupon.usageLimit != null && coupon.usedCount >= coupon.usageLimit) {
    return { valid: false, reason: "優惠碼使用次數已達上限。" };
  }
  if (coupon.perUserLimit != null && userId) {
    const used = await countUserRedemptions(coupon.code, userId);
    if (used >= coupon.perUserLimit) {
      return { valid: false, reason: "您已使用過此優惠碼。" };
    }
  }

  const discount = computeCouponDiscount(coupon, items);
  if (discount <= 0) {
    return { valid: false, reason: "本次購物車沒有符合此優惠碼的商品。" };
  }

  return { valid: true, coupon: toApplied(coupon), discount };
}

/** 記錄一次使用（mock 結帳時 best-effort 呼叫）。 */
export async function recordRedemption(code: string, userId?: string | null, orderId?: string): Promise<void> {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return;
  try {
    const db = getAdminDb();
    const snapshot = await db.collection("coupons").where("code", "==", normalized).limit(1).get();
    if (!snapshot.empty) {
      await snapshot.docs[0].ref.update({ usedCount: FieldValue.increment(1) });
    }
    await db.collection("couponRedemptions").add({
      code: normalized,
      userId: userId ?? null,
      orderId: orderId ?? null,
      createdAt: FieldValue.serverTimestamp(),
    });
  } catch {
    // Firebase 未設定：略過（mock 模式不持久化使用次數）。
  }
}

export async function listCoupons(): Promise<Coupon[]> {
  try {
    const snapshot = await getAdminDb().collection("coupons").orderBy("createdAt", "desc").limit(200).get();
    return snapshot.docs.map((doc) => mapCouponDoc(doc.id, doc.data()));
  } catch {
    return MOCK_COUPONS;
  }
}

export type CreateCouponInput = {
  code: string;
  title: string;
  discountType: "percent" | "fixed";
  discountValue: number;
  appliesTo: "all" | "products" | "ebooks" | "chapters" | "bundles";
  targetIds?: string[];
  startsAt?: string;
  endsAt?: string;
  usageLimit?: number;
  perUserLimit?: number;
  isActive: boolean;
};

export async function createCoupon(input: CreateCouponInput, adminUid: string): Promise<{ id: string; code: string }> {
  let db: Firestore;
  try {
    db = getAdminDb();
  } catch {
    throw new Error("需要設定 Firebase Admin 環境變數才能建立優惠碼。");
  }

  const normalized = input.code.trim().toUpperCase();
  const existing = await db.collection("coupons").where("code", "==", normalized).limit(1).get();
  if (!existing.empty) {
    throw new Error("優惠碼代碼已存在。");
  }

  const ref = await db.collection("coupons").add({
    code: normalized,
    title: input.title,
    discountType: input.discountType,
    discountValue: input.discountValue,
    appliesTo: input.appliesTo,
    targetIds: input.targetIds ?? [],
    startsAt: input.startsAt ? Timestamp.fromDate(new Date(input.startsAt)) : null,
    endsAt: input.endsAt ? Timestamp.fromDate(new Date(input.endsAt)) : null,
    usageLimit: input.usageLimit ?? null,
    perUserLimit: input.perUserLimit ?? null,
    usedCount: 0,
    isActive: input.isActive,
    createdBy: adminUid,
    createdAt: FieldValue.serverTimestamp(),
  });

  return { id: ref.id, code: normalized };
}
