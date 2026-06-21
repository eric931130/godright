import { NextRequest, NextResponse } from "next/server";

import { requireAdminRequest } from "@/lib/auth/api-auth";
import { getUserByFirebaseUid } from "@/lib/users/get-user-by-firebase-uid";
import { getUserByPublicUid } from "@/lib/users/get-user-by-public-uid";

type UserRouteProps = {
  params: Promise<{ uid: string }>;
};

export async function GET(request: NextRequest, { params }: UserRouteProps) {
  const admin = await requireAdminRequest(request);
  if (!admin.ok) return admin.response;

  const { uid } = await params;
  const user = /^\d{10}$/.test(uid) ? await getUserByPublicUid(uid) : await getUserByFirebaseUid(uid);

  if (!user) {
    return NextResponse.json({ error: "找不到使用者。" }, { status: 404 });
  }

  return NextResponse.json({ user });
}
