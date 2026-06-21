import { NextRequest, NextResponse } from "next/server";

import { requireAdminRequest } from "@/lib/auth/api-auth";
import { deleteMediaAsset, listMediaAssets } from "@/lib/media/media-service";

export async function GET(request: NextRequest) {
  const admin = await requireAdminRequest(request);
  if (!admin.ok) return admin.response;

  const assets = await listMediaAssets();
  return NextResponse.json({ ok: true, assets });
}

export async function DELETE(request: NextRequest) {
  const admin = await requireAdminRequest(request);
  if (!admin.ok) return admin.response;

  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "缺少 id。" }, { status: 400 });
  }

  try {
    await deleteMediaAsset(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "刪除失敗。" }, { status: 400 });
  }
}
