import "server-only";

import { getAdminDb } from "@/lib/firebase/admin";
import { getUserByFirebaseUid } from "@/lib/users/get-user-by-firebase-uid";
import { getUserByPublicUid } from "@/lib/users/get-user-by-public-uid";
import type { UserProfile } from "@/lib/users/types";

export async function searchUsers(input: string): Promise<UserProfile[]> {
  const query = input.trim();
  if (!query) return [];

  if (/^\d{10}$/.test(query)) {
    const user = await getUserByPublicUid(query);
    return user ? [user] : [];
  }

  if (!query.includes("@")) {
    const user = await getUserByFirebaseUid(query);
    return user ? [user] : [];
  }

  const snapshot = await getAdminDb()
    .collection("users")
    .where("email", "==", query.toLowerCase())
    .limit(10)
    .get();

  return snapshot.docs.map((doc) => doc.data() as UserProfile);
}
