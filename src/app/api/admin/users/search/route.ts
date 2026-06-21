import { NextRequest, NextResponse } from "next/server";

import { requireAdminRequest } from "@/lib/auth/api-auth";
import { searchUsers } from "@/lib/users/search-users";

export async function GET(request: NextRequest) {
  const admin = await requireAdminRequest(request);
  if (!admin.ok) return admin.response;

  const q = request.nextUrl.searchParams.get("q") ?? "";
  const users = await searchUsers(q);
  return NextResponse.json({ users });
}
