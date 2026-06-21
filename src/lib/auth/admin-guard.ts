import "server-only";

import { cookies } from "next/headers";

import { verifyFirebaseIdToken } from "@/lib/firebase/admin";

type AdminCheck = {
  uid: string;
  email?: string;
};

export type AdminVerificationResult =
  | { ok: true; uid: string; email?: string }
  | { ok: false; status: number; message: string };

export function isConfiguredAdminIdentity(user: AdminCheck) {
  const adminUid = process.env.ADMIN_FIREBASE_UID;
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();

  return Boolean(
    adminUid && adminEmail && user.uid === adminUid && user.email?.toLowerCase() === adminEmail,
  );
}

export async function verifyUniqueAdminToken(idToken: string): Promise<AdminVerificationResult> {
  try {
    const decoded = await verifyFirebaseIdToken(idToken);
    const requireCustomClaim = process.env.ADMIN_REQUIRE_CUSTOM_CLAIM === "true";
    const isConfiguredAdmin = isConfiguredAdminIdentity({ uid: decoded.uid, email: decoded.email });
    const hasAdminClaim = decoded.admin === true;

    if (!isConfiguredAdmin || (requireCustomClaim && !hasAdminClaim)) {
      return {
        ok: false,
        status: 403,
        message: requireCustomClaim
          ? "This account is missing the admin custom claim."
          : "This account is not the configured developer admin account.",
      };
    }

    return { ok: true, uid: decoded.uid, email: decoded.email };
  } catch {
    return { ok: false, status: 401, message: "Firebase ID token verification failed." };
  }
}

export async function hasAdminSecondFactorCookie() {
  const cookieStore = await cookies();
  const value = cookieStore.get("godright_admin_2fa")?.value;

  if (!value) {
    return false;
  }

  const [version, uid, expiresAt, signature] = value.split(".");
  if (version !== "v1" || !uid || !expiresAt || !signature) {
    return false;
  }

  if (Number(expiresAt) < Date.now()) {
    return false;
  }

  const { signAdminCookieValue } = await import("@/lib/auth/verify-admin-session");
  return signature === signAdminCookieValue(uid, expiresAt);
}
