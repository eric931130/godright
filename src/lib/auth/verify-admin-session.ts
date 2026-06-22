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

function signAdminCookiePayload(payload: string) {
  return crypto.createHmac("sha256", getSigningSecret()).update(payload).digest("hex");
}

function timingSafeHexEqual(left: string, right: string) {
  try {
    return crypto.timingSafeEqual(Buffer.from(left, "hex"), Buffer.from(right, "hex"));
  } catch {
    return false;
  }
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

  const segments = value.split(".");
  const [version, firstValue, secondValue, thirdValue] = segments;

  if (version === "v2" && segments.length === 3 && firstValue && secondValue) {
    const payload = firstValue;
    const signature = secondValue;
    const expectedSignature = signAdminCookiePayload(payload);

    if (!timingSafeHexEqual(expectedSignature, signature)) {
      return { verified: false as const };
    }

    try {
      const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
        expiresAt?: number;
        uid?: string;
      };

      return parsed.uid && parsed.expiresAt && parsed.expiresAt > Date.now()
        ? { verified: true as const, uid: parsed.uid, expiresAt: parsed.expiresAt }
        : { verified: false as const };
    } catch {
      return { verified: false as const };
    }
  }

  const isValid =
    version === "v1" &&
    Boolean(firstValue) &&
    Boolean(secondValue) &&
    Number(secondValue) > Date.now() &&
    timingSafeHexEqual(signAdminCookieValue(firstValue, secondValue), thirdValue ?? "");

  return isValid
    ? { verified: true as const, uid: firstValue, expiresAt: Number(secondValue) }
    : { verified: false as const };
}

export function createVerifiedAdminCookie(uid: string) {
  const expiresAt = Date.now() + 1000 * 60 * 60 * 8;
  const payload = Buffer.from(JSON.stringify({ uid, expiresAt }), "utf8").toString("base64url");
  const signature = signAdminCookiePayload(payload);
  return `v2.${payload}.${signature}`;
}
