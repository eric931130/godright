import "server-only";

import { FieldValue, Timestamp, type DocumentData, type Firestore } from "firebase-admin/firestore";

import { getAdminDb } from "@/lib/firebase/admin";
import { shopProducts } from "@/data/shop";
import type { Bundle } from "@/lib/shop/bundle-types";

// Firebase Admin 未設定時的 fallback 組合包。
const MOCK_BUNDLES: Bundle[] = [
  {
    id: "mock-first-volume-set",
    slug: "first-volume-collector-set",
    title: "第一卷收藏入門組",
    description: "第一卷電子書搭配天魂角色設定集，最適合剛踏入七界的讀者。",
    productIds: ["volume-one-godrank-fracture", "tianhun-character-setting"],
    originalPrice: 340,
    bundlePrice: 299,
    isActive: true,
  },
  {
    id: "mock-seven-realms-set",
    slug: "seven-realms-explorer-set",
    title: "七界探索組",
    description: "第二卷電子書、七界世界觀設定集與角色手機桌布包，一次掌握七界全貌。",
    productIds: ["volume-two-seven-realms-throne", "seven-realms-worldbook", "character-mobile-wallpaper-pack"],
    originalPrice: 570,
    bundlePrice: 469,
    isActive: true,
  },
];

function tsToIso(value: unknown): string | undefined {
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (typeof value === "string") return value;
  return undefined;
}

function mapBundleDoc(id: string, data: DocumentData): Bundle {
  return {
    id,
    slug: data.slug ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    productIds: Array.isArray(data.productIds) ? data.productIds : [],
    originalPrice: Number(data.originalPrice ?? 0),
    bundlePrice: Number(data.bundlePrice ?? 0),
    coverImage: data.coverImage ?? undefined,
    isActive: data.isActive !== false,
    startsAt: tsToIso(data.startsAt),
    endsAt: tsToIso(data.endsAt),
    createdAt: tsToIso(data.createdAt),
  };
}

function isWithinWindow(bundle: Bundle): boolean {
  const now = Date.now();
  if (bundle.startsAt && now < new Date(bundle.startsAt).getTime()) return false;
  if (bundle.endsAt && now > new Date(bundle.endsAt).getTime()) return false;
  return true;
}

export async function listBundles(): Promise<Bundle[]> {
  try {
    const snapshot = await getAdminDb().collection("bundles").orderBy("createdAt", "desc").limit(200).get();
    return snapshot.docs.map((doc) => mapBundleDoc(doc.id, doc.data()));
  } catch {
    return MOCK_BUNDLES;
  }
}

export async function listActiveBundles(): Promise<Bundle[]> {
  const bundles = await listBundles();
  return bundles.filter((bundle) => bundle.isActive && isWithinWindow(bundle));
}

export async function getBundleBySlug(slug: string): Promise<Bundle | null> {
  try {
    const snapshot = await getAdminDb().collection("bundles").where("slug", "==", slug).limit(1).get();
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return mapBundleDoc(doc.id, doc.data());
    }
    return null;
  } catch {
    return MOCK_BUNDLES.find((bundle) => bundle.slug === slug) ?? null;
  }
}

/** 依成員商品 slug/id 計算原價總和。 */
export function computeOriginalPrice(productIds: string[]): number {
  return productIds.reduce((sum, idOrSlug) => {
    const product = shopProducts.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
    return sum + (product?.price ?? 0);
  }, 0);
}

export type CreateBundleInput = {
  title: string;
  slug: string;
  description: string;
  productIds: string[];
  bundlePrice: number;
  coverImage?: string;
  startsAt?: string;
  endsAt?: string;
  isActive: boolean;
};

export async function createBundle(input: CreateBundleInput, adminUid: string): Promise<{ id: string; slug: string }> {
  let db: Firestore;
  try {
    db = getAdminDb();
  } catch {
    throw new Error("需要設定 Firebase Admin 環境變數才能建立組合包。");
  }

  const existing = await db.collection("bundles").where("slug", "==", input.slug).limit(1).get();
  if (!existing.empty) {
    throw new Error("組合包 slug 已存在。");
  }

  const originalPrice = computeOriginalPrice(input.productIds);

  const ref = await db.collection("bundles").add({
    slug: input.slug,
    title: input.title,
    description: input.description,
    productIds: input.productIds,
    originalPrice,
    bundlePrice: input.bundlePrice,
    coverImage: input.coverImage ?? null,
    isActive: input.isActive,
    startsAt: input.startsAt ? Timestamp.fromDate(new Date(input.startsAt)) : null,
    endsAt: input.endsAt ? Timestamp.fromDate(new Date(input.endsAt)) : null,
    createdBy: adminUid,
    createdAt: FieldValue.serverTimestamp(),
  });

  return { id: ref.id, slug: input.slug };
}
