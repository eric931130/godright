import { NextResponse } from "next/server";

import { listActiveCampaigns } from "@/lib/campaigns/campaigns";

// 公開取得啟用中的活動（前台依路徑/類型/優先序渲染）。
export async function GET() {
  const campaigns = await listActiveCampaigns();
  return NextResponse.json({ campaigns });
}
