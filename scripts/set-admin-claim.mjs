import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
const adminUid = process.env.ADMIN_FIREBASE_UID;

if (!projectId || !clientEmail || !privateKey || !adminUid) {
  console.error(
    "Missing FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, or ADMIN_FIREBASE_UID.",
  );
  process.exit(1);
}

if (!getApps().length) {
  initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

const auth = getAuth();
const user = await auth.getUser(adminUid);
await auth.setCustomUserClaims(adminUid, {
  ...(user.customClaims ?? {}),
  admin: true,
  role: "admin",
});

console.log(`Admin custom claim set for UID: ${adminUid}`);
