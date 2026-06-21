import type { Metadata } from "next";

import { LegalPage } from "@/components/legal/legal-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "數位商品退款規則｜神權崩壞",
  description: "神權崩壞電子書、付費章節、設定集、桌布與貼圖等數位商品退款規則。",
  path: "/refund",
  keywords: ["退款規則", "數位商品", "電子書退款", "付費章節"],
});

export default function RefundPage() {
  return (
    <LegalPage
      eyebrow="Refund"
      title="數位商品退款規則"
      updatedAt="2026-06-20"
      intro="數位商品具有可即時交付與複製特性。本草稿以清楚揭露、付款前確認與客服審核為原則，正式上線前仍需依所在地法規調整。"
      sections={[
        {
          title: "適用商品",
          body: "本規則適用電子書、小說合集、角色設定集、世界觀設定集、桌布、貼圖展示包、數位資料集與其他非實體下載商品。",
        },
        {
          title: "退款限制",
          body: "完成付款且已解鎖章節、開啟下載、取得檔案、產生授權或開始使用之數位商品，原則上不接受任意退款。",
        },
        {
          title: "可申請退款情形",
          body: "若發生重複扣款、錯誤商品、檔案無法取得且經客服確認、未完成交付、或依法應退款之情形，可於合理期間內提出申請。",
        },
        {
          title: "退款後權限",
          body: "退款成立後，相關章節解鎖、商品下載、會員權益、收藏版授權與訂單狀態可能被撤銷或調整。",
        },
        {
          title: "申請方式",
          body: "請提供訂單編號、購買 Email、問題描述與截圖，聯絡：contact@godright.example.com。",
        },
      ]}
    />
  );
}
