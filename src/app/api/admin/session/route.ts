import { NextResponse } from "next/server";

import {
  adminAttemptCookie,
  adminLockCookie,
  adminSecondFactorCookie,
  adminStepCookie,
  getAdminSecondFactorSession,
} from "@/lib/auth/verify-admin-session";

export async function GET() {
  const session = await getAdminSecondFactorSession();
  return NextResponse.json(session);
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(adminSecondFactorCookie);
  response.cookies.delete(adminStepCookie);
  response.cookies.delete(adminAttemptCookie);
  response.cookies.delete(adminLockCookie);
  return response;
}
