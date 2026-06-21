import "server-only";

import { getAdminDb } from "@/lib/firebase/admin";
import { getUserByFirebaseUid } from "@/lib/users/get-user-by-firebase-uid";

export async function getUserByPublicUid(publicUid: string) {
  if (!/^\d{10}$/.test(publicUid)) return null;

  const index = await getAdminDb().collection("publicUidIndex").doc(publicUid).get();
  const firebaseUid = index.data()?.firebaseUid;

  return typeof firebaseUid === "string" ? getUserByFirebaseUid(firebaseUid) : null;
}
