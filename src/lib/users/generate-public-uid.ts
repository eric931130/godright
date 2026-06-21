import "server-only";

import { FieldValue } from "firebase-admin/firestore";

import { getAdminDb } from "@/lib/firebase/admin";

const counterRefPath = "publicUidCounters/users";
const firstPublicUid = 1000000001;

export async function generatePublicUid() {
  const db = getAdminDb();

  return db.runTransaction(async (transaction) => {
    const counterRef = db.doc(counterRefPath);
    const snapshot = await transaction.get(counterRef);
    const currentValue = snapshot.exists ? Number(snapshot.data()?.current) : firstPublicUid - 1;
    const nextValue = currentValue + 1;

    transaction.set(
      counterRef,
      {
        current: nextValue,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    return String(nextValue).padStart(10, "0");
  });
}
