import { NextRequest, NextResponse } from "next/server";

import { requireAdminRequest } from "@/lib/auth/api-auth";
import { getAdminDb } from "@/lib/firebase/admin";

export async function GET(request: NextRequest) {
  const admin = await requireAdminRequest(request);
  if (!admin.ok) return admin.response;

  const snapshot = await getAdminDb()
    .collection("adminAuditLogs")
    .orderBy("createdAt", "desc")
    .limit(50)
    .get();

  return NextResponse.json({ logs: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) });
}
