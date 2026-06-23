import { NextRequest, NextResponse } from "next/server";

import { requireAdminRequest } from "@/lib/auth/api-auth";
import { surveyCreateSchema } from "@/lib/validations/survey";
import { createSurvey, listSurveys } from "@/lib/surveys/surveys";

export async function GET(request: NextRequest) {
  const admin = await requireAdminRequest(request);
  if (!admin.ok) return admin.response;
  return NextResponse.json({ ok: true, surveys: await listSurveys() });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdminRequest(request);
  if (!admin.ok) return admin.response;

  const body = surveyCreateSchema.safeParse(await request.json().catch(() => null));
  if (!body.success) {
    return NextResponse.json({ error: "表單資料不正確。", issues: body.error.issues }, { status: 400 });
  }

  try {
    const result = await createSurvey(body.data, admin.admin.uid);
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "建立失敗。" }, { status: 400 });
  }
}
