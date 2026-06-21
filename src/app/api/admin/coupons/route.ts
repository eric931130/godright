import { NextRequest, NextResponse } from "next/server";

import { requireAdminRequest } from "@/lib/auth/api-auth";
import { couponCreateSchema } from "@/lib/validations/coupon";
import { createCoupon, listCoupons } from "@/lib/shop/coupons";

export async function GET(request: NextRequest) {
  const admin = await requireAdminRequest(request);
  if (!admin.ok) return admin.response;

  const coupons = await listCoupons();
  return NextResponse.json({ ok: true, coupons });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdminRequest(request);
  if (!admin.ok) return admin.response;

  const body = couponCreateSchema.safeParse(await request.json().catch(() => null));
  if (!body.success) {
    return NextResponse.json({ error: "表單資料不正確。", issues: body.error.issues }, { status: 400 });
  }

  try {
    const result = await createCoupon(body.data, admin.admin.uid);
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "建立優惠碼失敗。" }, { status: 400 });
  }
}
