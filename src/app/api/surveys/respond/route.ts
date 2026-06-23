import { NextRequest, NextResponse } from "next/server";

import { getBearerToken, verifyFirebaseIdToken } from "@/lib/firebase/admin";
import { surveyRespondSchema } from "@/lib/validations/survey";
import { submitSurveyResponse } from "@/lib/surveys/surveys";

export async function POST(request: NextRequest) {
  const body = surveyRespondSchema.safeParse(await request.json().catch(() => null));
  if (!body.success) {
    return NextResponse.json({ error: "問卷回應格式不正確。" }, { status: 400 });
  }

  let userId: string | null = null;
  const token = getBearerToken(request.headers);
  if (token) {
    try {
      userId = (await verifyFirebaseIdToken(token)).uid;
    } catch {
      userId = null;
    }
  }

  try {
    await submitSurveyResponse({ surveyId: body.data.surveyId, answers: body.data.answers, userId });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "送出失敗。" }, { status: 400 });
  }
}
