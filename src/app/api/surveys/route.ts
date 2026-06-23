import { NextResponse } from "next/server";

import { listActiveSurveys } from "@/lib/surveys/surveys";

// 公開：取得啟用中的問卷。
export async function GET() {
  return NextResponse.json({ surveys: await listActiveSurveys() });
}
