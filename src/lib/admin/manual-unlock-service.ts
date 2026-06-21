import "server-only";

import { FieldValue, Timestamp } from "firebase-admin/firestore";

import { getAdminDb } from "@/lib/firebase/admin";
import { searchUsers } from "@/lib/users/search-users";
import type { ManualUnlockForm } from "@/lib/admin/types";

function parseExpiresAt(value?: string) {
  return value ? Timestamp.fromDate(new Date(value)) : null;
}

export async function grantManualUnlock(adminUid: string, input: ManualUnlockForm) {
  const [targetUser] = await searchUsers(input.targetUserInput);

  if (!targetUser) {
    throw new Error("找不到指定使用者。");
  }

  const db = getAdminDb();
  const logRef = db.collection("manualUnlockLogs").doc();
  const expiresAt = parseExpiresAt(input.expiresAt);
  const baseRecord = {
    adminUid,
    targetFirebaseUid: targetUser.firebaseUid,
    targetPublicUid: targetUser.publicUid,
    unlockType: input.unlockType,
    targetId: input.targetId,
    reason: input.reason,
    createdAt: FieldValue.serverTimestamp(),
    expiresAt,
    action: "grant",
  };

  await db.runTransaction(async (transaction) => {
    if (input.unlockType === "chapter") {
      transaction.set(db.collection("chapterUnlocks").doc(`${targetUser.firebaseUid}_${input.targetId}`), {
        userId: targetUser.firebaseUid,
        chapterId: input.targetId,
        source: "admin_grant",
        grantedBy: adminUid,
        expiresAt,
        createdAt: FieldValue.serverTimestamp(),
      });
    }

    if (input.unlockType === "volume") {
      transaction.set(db.collection("volumePurchases").doc(`${targetUser.firebaseUid}_${input.targetId}`), {
        userId: targetUser.firebaseUid,
        volumeId: input.targetId,
        source: "admin_grant",
        grantedBy: adminUid,
        expiresAt,
        createdAt: FieldValue.serverTimestamp(),
      });
    }

    if (input.unlockType === "ebook" || input.unlockType === "product") {
      transaction.set(db.collection("productPurchases").doc(`${targetUser.firebaseUid}_${input.targetId}`), {
        userId: targetUser.firebaseUid,
        productId: input.targetId,
        source: "admin_grant",
        grantedBy: adminUid,
        expiresAt,
        createdAt: FieldValue.serverTimestamp(),
      });
    }

    if (input.unlockType === "vip") {
      transaction.set(db.collection("vipGrants").doc(targetUser.firebaseUid), {
        userId: targetUser.firebaseUid,
        source: "admin_grant",
        grantedBy: adminUid,
        expiresAt,
        createdAt: FieldValue.serverTimestamp(),
        active: true,
      });
      transaction.set(db.collection("users").doc(targetUser.firebaseUid), {
        role: "vip",
        updatedAt: FieldValue.serverTimestamp(),
      }, { merge: true });
    }

    transaction.set(logRef, { id: logRef.id, ...baseRecord });
    transaction.set(db.collection("adminAuditLogs").doc(), {
      adminUid,
      action: "manual_unlock",
      targetType: input.unlockType,
      targetId: input.targetId,
      after: baseRecord,
      reason: input.reason,
      createdAt: FieldValue.serverTimestamp(),
    });
  });

  return { id: logRef.id, targetUser };
}

export async function revokeManualUnlock(adminUid: string, input: ManualUnlockForm) {
  const [targetUser] = await searchUsers(input.targetUserInput);
  if (!targetUser) throw new Error("找不到指定使用者。");

  const db = getAdminDb();
  const logRef = db.collection("manualUnlockLogs").doc();

  await db.runTransaction(async (transaction) => {
    const docId = `${targetUser.firebaseUid}_${input.targetId}`;
    if (input.unlockType === "chapter") transaction.delete(db.collection("chapterUnlocks").doc(docId));
    if (input.unlockType === "volume") transaction.delete(db.collection("volumePurchases").doc(docId));
    if (input.unlockType === "ebook" || input.unlockType === "product") {
      transaction.delete(db.collection("productPurchases").doc(docId));
    }
    if (input.unlockType === "vip") transaction.delete(db.collection("vipGrants").doc(targetUser.firebaseUid));

    const log = {
      id: logRef.id,
      adminUid,
      targetFirebaseUid: targetUser.firebaseUid,
      targetPublicUid: targetUser.publicUid,
      unlockType: input.unlockType,
      targetId: input.targetId,
      reason: input.reason,
      createdAt: FieldValue.serverTimestamp(),
      action: "revoke",
    };
    transaction.set(logRef, log);
    transaction.set(db.collection("adminAuditLogs").doc(), {
      adminUid,
      action: "manual_revoke",
      targetType: input.unlockType,
      targetId: input.targetId,
      after: log,
      reason: input.reason,
      createdAt: FieldValue.serverTimestamp(),
    });
  });

  return { id: logRef.id, targetUser };
}
