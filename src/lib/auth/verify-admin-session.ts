import "server-only";

import crypto from "node:crypto";
import { cookies } from "next/headers";

export const adminSecondFactorCookie = "godright_admin_2fa";
export const adminStepCookie = "godright_admin_2fa_step";
export const adminLockCookie = "godright_admin_2fa_lock";
export const adminAttemptCookie = "godright_admin_2fa_attempts";

function getSigningSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ??
    process.env.ADMIN_SECONDARY_PIN_SALT ??
    process.env.FIREBASE_PRIVATE_KEY ??
    "dev-only-admin-session-secret"
  );
}

export function signAdminCookieValue(uid: string, expiresAt: string) {
  return crypto
    .createHmac("sha256", getSigningSecret())
    .update(`${uid}.${expiresAt}`)
    .digest("hex");
}

export function verifyPinHash(pin: string) {
  const expectedHash = process.env.ADMIN_SECONDARY_PIN_HASH;
  const salt = process.env.ADMIN_SECONDARY_PIN_SALT;

  if (!expectedHash || !salt || !/^\d{4,12}$/.test(pin)) {
    return false;
  }

  const actual = crypto.createHash("sha256").update(`${salt}:${pin}`).digest("hex");

  try {
    return crypto.timingSafeEqual(Buffer.from(actual), Buffer.from(expectedHash));
  } catch {
    return false;
  }
}

export async function getAdminSecondFactorSession() {
  const cookieStore = await cookies();
  const value = cookieStore.get(adminSecondFactorCookie)?.value;

  if (!value) {
    return { verified: false as const };
  }

  const [version, uid, expiresAt, signature] = value.split(".");
  const isValid =
    version === "v1" &&
    Boolean(uid) &&
    Boolean(expiresAt) &&
    Number(expiresAt) > Date.now() &&
    signAdminCookieValue(uid, expiresAt) === signature;

  return isValid
    ? { verified: true as const, uid, expiresAt: Number(expiresAt) }
    : { verified: false as const };
}

export function createVerifiedAdminCookie(uid: string) {
  const expiresAt = String(Date.now() + 1000 * 60 * 60 * 8);
  const signature = signAdminCookieValue(uid, expiresAt);
  return `v1.${uid}.${expiresAt}.${signature}`;
}
