import "server-only";

import { FieldValue } from "firebase-admin/firestore";

import { getAdminDb } from "@/lib/firebase/admin";
import { generatePublicUid } from "@/lib/users/generate-public-uid";
import type { UserProfile } from "@/lib/users/types";

export async function createUserProfile(input: {
  firebaseUid: string;
  email: string;
  displayName?: string;
  role?: UserProfile["role"];
}) {
  const db = getAdminDb();
  const userRef = db.collection("users").doc(input.firebaseUid);
  const existing = await userRef.get();

  if (existing.exists) {
    await userRef.set(
      {
        lastLoginAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
    return existing.data() as UserProfile;
  }

  const publicUid = await generatePublicUid();
  const profile = {
    firebaseUid: input.firebaseUid,
    publicUid,
    email: input.email,
    displayName: input.displayName || input.email.split("@")[0] || "七界旅人",
    role: input.role ?? "user",
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    lastLoginAt: FieldValue.serverTimestamp(),
    readingStats: {
      totalReadingMinutes: 0,
      totalReadChapters: 0,
    },
    purchaseStats: {
      totalPaidChapters: 0,
      totalSpent: 0,
    },
    isBanned: false,
  };

  await userRef.set(profile);
  await db.collection("publicUidIndex").doc(publicUid).set({
    firebaseUid: input.firebaseUid,
    publicUid,
    email: input.email,
    createdAt: FieldValue.serverTimestamp(),
  });

  return {
    ...profile,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: new Date(),
  } as UserProfile;
}
