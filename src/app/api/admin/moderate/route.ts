import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { requireAdminRequest } from "@/lib/auth/api-auth";
import { applySanction } from "@/lib/admin/moderation";

const schema = z.object({
  publicUid: z.string().regex(/^\d{10}$/, "請輸入 10 位數字 UID。"),
  action: z.enum([
    "mute_1d",
    "mute_3d",
    "mute_7d",
    "ban_6h",
    "ban_12h",
    "ban_36h",
    "ban_permanent",
    "unmute",
    "unban",
  ]),
});

export async function POST(request: NextRequest) {
  const admin = await requireAdminRequest(request);
  if (!admin.ok) return admin.response;

  const body = schema.safeParse(await request.json().catch(() => null));
  if (!body.success) {
    return NextResponse.json({ error: body.error.issues[0]?.message ?? "資料不正確。" }, { status: 400 });
  }

  const result = await applySanction({
    publicUid: body.data.publicUid,
    action: body.data.action,
    adminUid: admin.admin.uid,
  });

  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
