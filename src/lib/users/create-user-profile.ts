import "server-only";

import { FieldValue } from "firebase-admin/firestore";

import { getAdminDb } from "@/lib/firebase/admin";
import { generatePublicUid } from "@/lib/users/generate-public-uid";
import type { UserProfile } from "@/lib/users/types";

export async function createUserProfile(input: {
  firebaseUid: string;
  email: string;
  displayName?: string;
  birthdate?: string;
  gender?: UserProfile["gender"];
  avatarUrl?: string;
  onboarded?: boolean;
  role?: UserProfile["role"];
}) {
  const db = getAdminDb();
  const userRef = db.collection("users").doc(input.firebaseUid);
  const existing = await userRef.get();

  // 只合併「有提供」的欄位，避免每次登入把既有值覆蓋成空。
  const provided: Record<string, unknown> = {};
  if (input.displayName) provided.displayName = input.displayName;
  if (input.birthdate) provided.birthdate = input.birthdate;
  if (input.gender) provided.gender = input.gender;
  if (input.avatarUrl) provided.avatarUrl = input.avatarUrl;
  if (input.onboarded !== undefined) provided.onboarded = input.onboarded;

  if (existing.exists) {
    await userRef.set(
      {
        ...provided,
        lastLoginAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
    return { ...(existing.data() as UserProfile), ...provided };
  }

  const publicUid = await generatePublicUid();
  const profile = {
    firebaseUid: input.firebaseUid,
    publicUid,
    email: input.email,
    displayName: input.displayName || input.email.split("@")[0] || "七界旅人",
    role: input.role ?? "user",
    onboarded: input.onboarded ?? false,
    ...(input.birthdate ? { birthdate: input.birthdate } : {}),
    ...(input.gender ? { gender: input.gender } : {}),
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
