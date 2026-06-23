import "server-only";

import { FieldValue, type DocumentData } from "firebase-admin/firestore";

import { getAdminDb } from "@/lib/firebase/admin";

export type ModerationAction =
  | "mute_1d"
  | "mute_3d"
  | "mute_7d"
  | "ban_6h"
  | "ban_12h"
  | "ban_36h"
  | "ban_permanent"
  | "unmute"
  | "unban";

const MUTE_HOURS: Record<string, number> = { mute_1d: 24, mute_3d: 72, mute_7d: 168 };
const BAN_HOURS: Record<string, number> = { ban_6h: 6, ban_12h: 12, ban_36h: 36 };

function hoursFromNow(hours: number): string {
  return new Date(Date.now() + hours * 3600_000).toISOString();
}

async function resolveFirebaseUid(publicUid: string): Promise<string | null> {
  const doc = await getAdminDb().collection("publicUidIndex").doc(publicUid).get();
  const data = doc.data();
  return (data?.firebaseUid as string | undefined) ?? null;
}

export type SanctionResult = {
  ok: boolean;
  message: string;
  displayName?: string;
};

export async function applySanction(input: {
  publicUid: string;
  action: ModerationAction;
  adminUid: string;
}): Promise<SanctionResult> {
  const db = getAdminDb();
  const firebaseUid = await resolveFirebaseUid(input.publicUid);
  if (!firebaseUid) {
    return { ok: false, message: "找不到此 UID 對應的使用者。" };
  }

  const userRef = db.collection("users").doc(firebaseUid);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    return { ok: false, message: "使用者資料不存在。" };
  }
  const displayName = (snapshot.data()?.displayName as string | undefined) ?? input.publicUid;

  const updates: Record<string, unknown> = { updatedAt: FieldValue.serverTimestamp() };
  let summary = "";

  if (input.action in MUTE_HOURS) {
    updates.mutedUntil = hoursFromNow(MUTE_HOURS[input.action]);
    summary = `禁言至 ${updates.mutedUntil}`;
  } else if (input.action in BAN_HOURS) {
    updates.bannedUntil = hoursFromNow(BAN_HOURS[input.action]);
    updates.isBanned = true;
    summary = `停權至 ${updates.bannedUntil}`;
  } else if (input.action === "ban_permanent") {
    updates.bannedUntil = FieldValue.delete();
    updates.isBanned = true;
    summary = "永久停權";
  } else if (input.action === "unmute") {
    updates.mutedUntil = FieldValue.delete();
    summary = "解除禁言";
  } else if (input.action === "unban") {
    updates.bannedUntil = FieldValue.delete();
    updates.isBanned = false;
    summary = "解除停權";
  } else {
    return { ok: false, message: "未知的懲處動作。" };
  }

  await userRef.set(updates, { merge: true });
  await db.collection("adminAuditLogs").add({
    type: "moderation",
    action: input.action,
    targetPublicUid: input.publicUid,
    targetUid: firebaseUid,
    summary,
    adminUid: input.adminUid,
    createdAt: FieldValue.serverTimestamp(),
  });

  return { ok: true, message: `已對「${displayName}」執行：${summary}`, displayName };
}

export type ReportRecord = {
  id: string;
  targetType: string;
  targetId: string;
  targetPublicUid?: string;
  reporterUid: string;
  reason: string;
  status: string;
  createdAt?: string;
};

export async function listRecentReports(): Promise<ReportRecord[]> {
  try {
    const snapshot = await getAdminDb()
      .collection("hallReports")
      .orderBy("createdAt", "desc")
      .limit(100)
      .get();
    return snapshot.docs.map((doc) => {
      const data = doc.data() as DocumentData;
      const createdAt = data.createdAt;
      return {
        id: doc.id,
        targetType: data.targetType ?? "",
        targetId: data.targetId ?? "",
        targetPublicUid: data.targetPublicUid ?? undefined,
        reporterUid: data.reporterUid ?? "",
        reason: data.reason ?? "",
        status: data.status ?? "pending",
        createdAt:
          createdAt && typeof createdAt.toDate === "function"
            ? createdAt.toDate().toISOString()
            : undefined,
      } satisfies ReportRecord;
    });
  } catch {
    return [];
  }
}
