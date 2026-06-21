import type { Metadata } from "next";

import { LegalPage } from "@/components/legal/legal-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "著作權與 IP 授權聲明｜神權崩壞",
  description: "神權崩壞官方網站著作權、角色、世界觀、商品素材與禁止未授權商用聲明。",
  path: "/copyright",
  keywords: ["著作權", "IP 授權", "禁止商用", "角色授權", "原創小說"],
});

export default function CopyrightPage() {
  return (
    <LegalPage
      eyebrow="Copyright"
      title="著作權與 IP 授權聲明"
      updatedAt="2026-06-20"
      intro="《神權崩壞：誰是最後的天命之子》之小說文字、角色、世界觀、勢力、場地、神器、視覺風格與商品企劃均屬原創 IP 資產。"
      sections={[
        {
          title: "權利歸屬",
          body: "本網站與相關作品之文字、角色名稱、角色設定、世界觀、圖像、標誌、商品設計與衍生內容，除另有標示外，均由 Godright IP Studio 或權利人保留所有權利。",
        },
        {
          title: "禁止未授權商用",
          body: "未經書面授權，不得將本 IP 用於營利販售、廣告、商品製作、商業委託、NFT、模型訓練、資料集整理、公開散布或任何可使第三方取得商業利益之用途。",
        },
        {
          title: "個人分享規範",
          body: "讀者可在合理範圍內分享官方頁面連結、心得、評論與非商業二創；但不得假冒官方、移除權利標示、散布付費內容或造成市場替代效果。",
        },
        {
          title: "授權洽詢",
          body: "若需合作、出版、動畫、遊戲、商品、聯名、展覽或其他商業授權，請聯絡：contact@godright.example.com。",
        },
        {
          title: "侵權通知",
          body: "若發現疑似侵權或盜版內容，請提供連結、截圖、權利說明與聯絡方式，本網站將依合理程序處理。",
        },
      ]}
    />
  );
}
