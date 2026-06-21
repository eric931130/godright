import type { Metadata } from "next";

import { LegalPage } from "@/components/legal/legal-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "服務條款｜神權崩壞",
  description: "神權崩壞官方網站服務條款，包含會員、數位內容、商城、帳號與使用限制。",
  path: "/terms",
  keywords: ["服務條款", "會員規範", "數位內容", "商城規範"],
});

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="服務條款"
      updatedAt="2026-06-20"
      intro="本條款為正式版草稿，適用於《神權崩壞》官方網站、小說閱讀、電子書商城、會員服務與相關數位內容。正式營運前仍建議由法律顧問審閱。"
      sections={[
        {
          title: "服務範圍",
          body: "本網站提供原創小說 IP 內容瀏覽、章節閱讀、電子書與數位商品展示、會員收藏、訂閱消息及後續可能推出之付費內容服務。",
        },
        {
          title: "帳號與會員",
          body: "使用者應提供正確資料並妥善保管登入憑證。若帳號涉及異常使用、未授權分享、盜用或侵害他人權益，本網站得暫停或終止相關服務。",
        },
        {
          title: "數位內容使用限制",
          body: "所有小說章節、設定集、角色圖、世界觀資料與周邊素材僅限個人閱讀、收藏與合法展示，不得轉售、公開散布、重製、改作、上傳至第三方平台或作為 AI 模型訓練資料。",
        },
        {
          title: "付款與訂單",
          body: "數位商品與付費章節之付款、授權與下載權限，將依訂單狀態、會員權限與金流紀錄判斷。若付款失敗、退款或取消，相關閱讀與下載權限可能同步調整。",
        },
        {
          title: "服務變更",
          body: "本網站得依營運、法規、資安或內容更新需求調整服務內容、價格、會員權益與條款。重大變更將盡可能於網站或 Email 公告。",
        },
        {
          title: "聯絡方式",
          body: "如對服務條款、訂單或會員權益有疑問，請聯絡：contact@godright.example.com。",
        },
      ]}
    />
  );
}
