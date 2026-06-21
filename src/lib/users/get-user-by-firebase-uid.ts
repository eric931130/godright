import "server-only";

import { getAdminDb } from "@/lib/firebase/admin";
import type { UserProfile } from "@/lib/users/types";

export async function getUserByFirebaseUid(firebaseUid: string) {
  if (!firebaseUid) return null;
  const snapshot = await getAdminDb().collection("users").doc(firebaseUid).get();
  return snapshot.exists ? (snapshot.data() as UserProfile) : null;
}
