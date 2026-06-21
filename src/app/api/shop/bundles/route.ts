import { NextResponse } from "next/server";

import { listActiveBundles } from "@/lib/shop/bundles";

// 公開取得啟用中的組合包（供商品頁推薦使用）。
export async function GET() {
  const bundles = await listActiveBundles();
  return NextResponse.json({ bundles });
}
