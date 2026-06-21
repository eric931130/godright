import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getBearerToken, verifyFirebaseIdToken } from "@/lib/firebase/admin";
import { shopProducts } from "@/data/shop";
import { validateCoupon } from "@/lib/shop/coupons";
import type { CouponLineItem } from "@/lib/shop/coupon-types";

const schema = z.object({
  code: z.string().min(1),
  items: z
    .array(z.object({ productId: z.string(), quantity: z.number().int().positive() }))
    .max(100),
});

export async function POST(request: NextRequest) {
  const body = schema.safeParse(await request.json().catch(() => null));
  if (!body.success) {
    return NextResponse.json({ valid: false, reason: "請求格式不正確。" }, { status: 400 });
  }

  // 由 server 依 productId 解析價格與類型，避免前端偽造金額。
  const items: CouponLineItem[] = body.data.items.flatMap((item) => {
    const product = shopProducts.find((p) => p.id === item.productId);
    if (!product) return [];
    return [
      {
        productId: product.id,
        productSlug: product.slug,
        productType: product.type,
        price: product.price,
        quantity: item.quantity,
      },
    ];
  });

  // 取得登入者（若有）以套用 perUserLimit。
  let userId: string | null = null;
  const token = getBearerToken(request.headers);
  if (token) {
    try {
      userId = (await verifyFirebaseIdToken(token)).uid;
    } catch {
      userId = null;
    }
  }

  const result = await validateCoupon(body.data.code, items, userId);
  return NextResponse.json(result, { status: result.valid ? 200 : 422 });
}
