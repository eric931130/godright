import type { Metadata } from "next";

import { LegalPage } from "@/components/legal/legal-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "隱私權政策｜神權崩壞",
  description: "神權崩壞官方網站隱私權政策，說明會員、訂閱、訂單、分析與資料保護方式。",
  path: "/privacy",
  keywords: ["隱私權政策", "個人資料", "會員資料", "訂閱資料"],
});

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="隱私權政策"
      updatedAt="2026-06-20"
      intro="本政策說明本網站如何蒐集、使用、保存與保護使用者資料。正式串接 Firebase、Supabase、金流與 Email service 後，應依實際服務再補充處理者資訊。"
      sections={[
        {
          title: "蒐集資料",
          body: "可能蒐集 Email、暱稱、登入方式、會員等級、閱讀進度、收藏、訂單、下載紀錄、訂閱偏好、裝置與瀏覽行為等服務必要資料。",
        },
        {
          title: "資料用途",
          body: "資料將用於會員登入、權限判斷、訂單處理、數位下載、訂閱通知、客服回覆、資安防護、服務分析與內容優化。",
        },
        {
          title: "第三方服務",
          body: "本網站可能使用 Firebase、Supabase、金流服務、Email service 與網站分析工具。各服務將依其資料處理政策與本網站設定進行資料保護。",
        },
        {
          title: "Cookie 與分析",
          body: "網站可能使用必要 Cookie、登入狀態資料、App Check token 與分析事件。非必要分析工具正式上線時應提供適當告知與偏好設定。",
        },
        {
          title: "資料保存與刪除",
          body: "使用者可請求查詢、更正或刪除個人資料；但訂單、付款、稅務、資安稽核等依法或契約必要資料，可能需保存至法定或合理期間。",
        },
        {
          title: "聯絡方式",
          body: "隱私權相關請求請聯絡：contact@godright.example.com。",
        },
      ]}
    />
  );
}
