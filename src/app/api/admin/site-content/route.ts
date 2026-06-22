import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { FieldValue } from "firebase-admin/firestore";

import { requireAdminRequest } from "@/lib/auth/api-auth";
import { getAdminDb } from "@/lib/firebase/admin";

const schema = z.object({
  key: z.string().min(1).max(120).regex(/^[A-Za-z0-9._-]+$/, "key 僅能使用英數字與 . _ -"),
  text: z.string().max(5000).optional(),
  imageUrl: z.string().max(1000).optional(),
});

export async function POST(request: NextRequest) {
  const admin = await requireAdminRequest(request);
  if (!admin.ok) return admin.response;

  const body = schema.safeParse(await request.json().catch(() => null));
  if (!body.success) {
    return NextResponse.json({ error: "表單資料不正確。", issues: body.error.issues }, { status: 400 });
  }

  const { key, text, imageUrl } = body.data;
  try {
    await getAdminDb()
      .collection("siteContent")
      .doc(key)
      .set(
        {
          key,
          ...(text !== undefined ? { text } : {}),
          ...(imageUrl !== undefined ? { imageUrl } : {}),
          updatedBy: admin.admin.uid,
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true },
      );
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "儲存失敗。" },
      { status: 400 },
    );
  }
}
