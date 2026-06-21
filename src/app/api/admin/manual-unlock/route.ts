import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { requireAdminRequest } from "@/lib/auth/api-auth";
import { grantManualUnlock } from "@/lib/admin/manual-unlock-service";

const schema = z.object({
  targetUserInput: z.string().min(3),
  unlockType: z.enum(["chapter", "volume", "ebook", "product", "vip"]),
  targetId: z.string().min(1),
  reason: z.string().min(3),
  expiresAt: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const admin = await requireAdminRequest(request);
  if (!admin.ok) return admin.response;

  const body = schema.safeParse(await request.json().catch(() => null));
  if (!body.success) {
    return NextResponse.json({ error: "表單資料不正確。", issues: body.error.issues }, { status: 400 });
  }

  try {
    const result = await grantManualUnlock(admin.admin.uid, body.data);
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "手動解鎖失敗。" }, { status: 400 });
  }
}
