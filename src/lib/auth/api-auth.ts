import { NextResponse } from "next/server";

import { getBearerToken } from "@/lib/firebase/admin";
import { verifyUniqueAdminToken } from "@/lib/auth/admin-guard";
import { getAdminSecondFactorSession } from "@/lib/auth/verify-admin-session";

export async function requireAdminRequest(request: Request) {
  const token = getBearerToken(request.headers);

  if (!token) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "缺少 Authorization Bearer token。" }, { status: 401 }),
    };
  }

  const admin = await verifyUniqueAdminToken(token);
  if (!admin.ok) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: admin.message }, { status: admin.status }),
    };
  }

  const session = await getAdminSecondFactorSession();
  if (!session.verified || session.uid !== admin.uid) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "尚未完成開發者二次驗證。" }, { status: 403 }),
    };
  }

  return { ok: true as const, admin };
}
