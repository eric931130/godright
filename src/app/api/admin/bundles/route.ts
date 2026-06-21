import { NextRequest, NextResponse } from "next/server";

import { requireAdminRequest } from "@/lib/auth/api-auth";
import { bundleCreateSchema } from "@/lib/validations/bundle";
import { createBundle, listBundles } from "@/lib/shop/bundles";

export async function GET(request: NextRequest) {
  const admin = await requireAdminRequest(request);
  if (!admin.ok) return admin.response;

  const bundles = await listBundles();
  return NextResponse.json({ ok: true, bundles });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdminRequest(request);
  if (!admin.ok) return admin.response;

  const body = bundleCreateSchema.safeParse(await request.json().catch(() => null));
  if (!body.success) {
    return NextResponse.json({ error: "表單資料不正確。", issues: body.error.issues }, { status: 400 });
  }

  try {
    const result = await createBundle(body.data, admin.admin.uid);
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "建立組合包失敗。" }, { status: 400 });
  }
}
