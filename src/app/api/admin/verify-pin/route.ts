import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { verifyUniqueAdminToken } from "@/lib/auth/admin-guard";
import {
  adminAttemptCookie,
  adminLockCookie,
  adminSecondFactorCookie,
  adminStepCookie,
  createVerifiedAdminCookie,
  verifyPinHash,
} from "@/lib/auth/verify-admin-session";
import { getBearerToken } from "@/lib/firebase/admin";

const pinSchema = z.object({
  pin: z.string().regex(/^\d{4,12}$/, "PIN must be 4 to 12 digits."),
});

function getCookieOptions(request: NextRequest) {
  const forwardedProto = request.headers.get("x-forwarded-proto");

  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: request.nextUrl.protocol === "https:" || forwardedProto === "https",
    path: "/",
  };
}

export async function POST(request: NextRequest) {
  const cookieOptions = getCookieOptions(request);
  const token = getBearerToken(request.headers);
  if (!token) {
    return NextResponse.json({ error: "Missing Authorization Bearer token." }, { status: 401 });
  }

  const admin = await verifyUniqueAdminToken(token);
  if (!admin.ok) {
    return NextResponse.json({ error: admin.message }, { status: admin.status });
  }

  const lockedUntil = Number(request.cookies.get(adminLockCookie)?.value ?? 0);
  if (lockedUntil > Date.now()) {
    return NextResponse.json(
      { error: "Too many failed attempts. Try again later.", lockedUntil },
      { status: 429 },
    );
  }

  const body = pinSchema.safeParse(await request.json().catch(() => null));
  if (!body.success) {
    return NextResponse.json(
      { error: body.error.issues[0]?.message ?? "Invalid request body." },
      { status: 400 },
    );
  }

  if (!verifyPinHash(body.data.pin)) {
    const attempts = Number(request.cookies.get(adminAttemptCookie)?.value ?? 0) + 1;
    const response =
      attempts >= 5
        ? NextResponse.json(
            { error: "Too many failed attempts. Admin verification is locked for 10 minutes." },
            { status: 429 },
          )
        : NextResponse.json({ error: "PIN is incorrect.", attempts }, { status: 401 });

    if (attempts >= 5) {
      response.cookies.set(adminLockCookie, String(Date.now() + 1000 * 60 * 10), {
        ...cookieOptions,
        maxAge: 60 * 10,
      });
      response.cookies.delete(adminAttemptCookie);
    } else {
      response.cookies.set(adminAttemptCookie, String(attempts), {
        ...cookieOptions,
        maxAge: 60 * 10,
      });
    }

    return response;
  }

  const currentStep = Number(request.cookies.get(adminStepCookie)?.value ?? 0);
  const nextStep = currentStep + 1;
  const response =
    nextStep >= 3
      ? NextResponse.json({ ok: true, verified: true, step: 3, redirectTo: "/admin" })
      : NextResponse.json({ ok: true, verified: false, step: nextStep });

  response.cookies.delete(adminAttemptCookie);
  response.cookies.delete(adminLockCookie);

  if (nextStep >= 3) {
    response.cookies.set(adminSecondFactorCookie, createVerifiedAdminCookie(admin.uid), {
      ...cookieOptions,
      maxAge: 60 * 60 * 8,
    });
    response.cookies.delete(adminStepCookie);
  } else {
    response.cookies.set(adminStepCookie, String(nextStep), {
      ...cookieOptions,
      maxAge: 60 * 10,
    });
  }

  return response;
}
