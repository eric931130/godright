import type { Metadata } from "next";

import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "隱私權與個人資料保護政策｜神權崩壞",
  description: "神權崩壞官方網站隱私權政策，說明會員、訂閱、訂單、分析、個人資料權利與資料保護方式。",
  path: "/privacy",
  keywords: ["隱私權政策", "個人資料", "會員資料", "訂單資料", "資料保護"],
});

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="隱私權與個人資料保護政策"
      updatedAt="2026-06-21"
      intro="本政策依中華民國個人資料保護法及相關法規訂定，說明本網站如何蒐集、處理、利用、保存與保護使用者資料。使用者使用本網站、建立帳號、訂閱、下單、下載或聯絡客服時，即表示知悉本政策。"
      sections={[
        {
          title: "資料蒐集類別",
          body: "本網站可能蒐集 Email、暱稱、登入識別碼、公開 UID、會員等級、閱讀進度、收藏、訂閱偏好、訂單、付款狀態、下載紀錄、客服紀錄、裝置資訊、IP 位址、瀏覽事件、資安紀錄與使用者自行提供之內容。非必要敏感個資原則上不主動蒐集。",
        },
        {
          title: "蒐集目的與利用方式",
          body: "資料將用於會員登入、身分驗證、權限判斷、開發者封印驗證、訂單處理、數位下載、退款審核、客服回覆、訂閱通知、資安防護、異常偵測、服務分析、內容優化、法律遵循與權利保護。",
        },
        {
          title: "第三方服務與跨境處理",
          body: "本網站可能使用 Firebase、Supabase、金流服務、Email service、網站分析、雲端主機與資安工具。資料可能因服務提供商所在地、雲端節點或備份機制而進行跨境處理；本網站將依服務必要性、契約與合理安全措施管理第三方處理者。",
        },
        {
          title: "Cookie、分析與資安紀錄",
          body: "網站可能使用必要 Cookie、登入狀態、App Check token、CSRF 或資安 token、裝置識別與分析事件。非必要行銷或追蹤工具正式上線時，將於適當位置揭露或提供偏好設定。",
        },
        {
          title: "資料保存期間",
          body: "資料保存至蒐集目的消失、使用者請求刪除且無保存必要，或法令要求保存期間屆滿為止。訂單、付款、退款、稅務、資安稽核、侵權處理、爭議證據與法定義務相關資料，得於必要範圍內繼續保存。",
        },
        {
          title: "使用者權利",
          body: "使用者得依法請求查詢或閱覽、製給複製本、補充或更正、停止蒐集處理利用、刪除個人資料。本網站得於法律允許範圍內請求確認身分、酌收必要成本、拒絕會妨害重大利益或法定義務之請求，並於法定或合理期間內回覆。",
        },
        {
          title: "安全措施與事故通知",
          body: "本網站將以權限控管、後端驗證、資料最小化、日誌稽核、雲端安全設定、金鑰隔離與必要加密等方式保護資料。若發生個人資料被竊取、竄改、毀損、滅失或洩漏等事件，將依法律要求採取應變、紀錄、通知或通報措施。",
        },
        {
          title: "法源依據",
          body: (
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>
                <a className="text-divine-gold hover:text-platinum" href="https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=I0050021">
                  個人資料保護法
                </a>
                ：個人資料定義、當事人權利、告知義務、特定目的、契約關係、安全維護與事故通知。
              </li>
              <li>
                <a className="text-divine-gold hover:text-platinum" href="https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=J0080037">
                  電子簽章法
                </a>
                ：電子文件、電子同意與資料訊息保存之效力。
              </li>
            </ul>
          ),
        },
        {
          title: "聯絡方式",
          body: `隱私權、個人資料或資料刪除請求，請聯絡：${siteConfig.contactEmail}。`,
        },
      ]}
    />
  );
}
