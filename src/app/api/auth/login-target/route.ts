import { NextRequest, NextResponse } from "next/server";

import { isConfiguredAdminIdentity } from "@/lib/auth/admin-guard";
import { getBearerToken, verifyFirebaseIdToken } from "@/lib/firebase/admin";

export async function GET(request: NextRequest) {
  const token = getBearerToken(request.headers);
  if (!token) {
    return NextResponse.json({ target: "/account" });
  }

  try {
    const decoded = await verifyFirebaseIdToken(token);
    const isDeveloper = isConfiguredAdminIdentity({
      uid: decoded.uid,
      email: decoded.email,
    });

    return NextResponse.json({
      target: isDeveloper ? "/admin-verify" : "/account",
    });
  } catch {
    return NextResponse.json({ target: "/account" });
  }
}
