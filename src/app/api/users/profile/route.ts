import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { isConfiguredAdminIdentity } from "@/lib/auth/admin-guard";
import { createUserProfile } from "@/lib/users/create-user-profile";
import { getUserByFirebaseUid } from "@/lib/users/get-user-by-firebase-uid";
import { getBearerToken, verifyFirebaseIdToken } from "@/lib/firebase/admin";

const profileSchema = z.object({
  displayName: z.string().trim().min(1).max(40).optional(),
});

export async function GET(request: NextRequest) {
  const token = getBearerToken(request.headers);
  if (!token) {
    return NextResponse.json({ error: "Missing Authorization Bearer token." }, { status: 401 });
  }

  const decoded = await verifyFirebaseIdToken(token);
  const profile = await getUserByFirebaseUid(decoded.uid);

  return NextResponse.json({ profile });
}

export async function POST(request: NextRequest) {
  const token = getBearerToken(request.headers);
  if (!token) {
    return NextResponse.json({ error: "Missing Authorization Bearer token." }, { status: 401 });
  }

  const decoded = await verifyFirebaseIdToken(token);
  const body = profileSchema.safeParse(await request.json().catch(() => ({})));
  if (!body.success) {
    return NextResponse.json({ error: "Invalid profile payload." }, { status: 400 });
  }

  const profile = await createUserProfile({
    firebaseUid: decoded.uid,
    email: decoded.email ?? "",
    displayName: body.data.displayName || decoded.name || decoded.email?.split("@")[0] || "七界旅人",
    role:
      decoded.admin === true && isConfiguredAdminIdentity({ uid: decoded.uid, email: decoded.email })
        ? "admin"
        : "user",
  });

  return NextResponse.json({ profile });
}
