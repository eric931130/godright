import { NextRequest, NextResponse } from "next/server";

import { inquiryCreateSchema } from "@/lib/validations/collaboration";
import { createInquiry } from "@/lib/collaboration/inquiries";

export async function POST(request: NextRequest) {
  const body = inquiryCreateSchema.safeParse(await request.json().catch(() => null));
  if (!body.success) {
    return NextResponse.json({ error: "表單資料不正確。", issues: body.error.issues }, { status: 400 });
  }

  const result = await createInquiry(body.data);
  return NextResponse.json({ ok: true, persisted: result.persisted });
}
