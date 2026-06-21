import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getBearerToken, verifyFirebaseIdToken } from "@/lib/firebase/admin";
import { recordRedemption } from "@/lib/shop/coupons";

const schema = z.object({ code: z.string().min(1), orderId: z.string().optional() });

// 結帳成功後 best-effort 記錄優惠碼使用（mock 金流，不阻擋流程）。
export async function POST(request: NextRequest) {
  const body = schema.safeParse(await request.json().catch(() => null));
  if (!body.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
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

  await recordRedemption(body.data.code, userId, body.data.orderId);
  return NextResponse.json({ ok: true });
}
