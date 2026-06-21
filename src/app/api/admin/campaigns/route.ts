import { NextRequest, NextResponse } from "next/server";

import { requireAdminRequest } from "@/lib/auth/api-auth";
import { campaignCreateSchema } from "@/lib/validations/campaign";
import { createCampaign, listCampaigns } from "@/lib/campaigns/campaigns";

export async function GET(request: NextRequest) {
  const admin = await requireAdminRequest(request);
  if (!admin.ok) return admin.response;

  const campaigns = await listCampaigns();
  return NextResponse.json({ ok: true, campaigns });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdminRequest(request);
  if (!admin.ok) return admin.response;

  const body = campaignCreateSchema.safeParse(await request.json().catch(() => null));
  if (!body.success) {
    return NextResponse.json({ error: "表單資料不正確。", issues: body.error.issues }, { status: 400 });
  }

  try {
    const result = await createCampaign(body.data, admin.admin.uid);
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "建立活動失敗。" }, { status: 400 });
  }
}
