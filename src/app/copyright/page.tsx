import type { Metadata } from "next";

import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "著作權、IP 與授權聲明｜神權崩壞",
  description: "神權崩壞官方網站著作權、角色、世界觀、商品素材、AI 訓練禁止與授權規範聲明。",
  path: "/copyright",
  keywords: ["著作權", "IP 授權", "禁止商用", "AI 訓練禁止", "角色授權", "原創小說"],
});

export default function CopyrightPage() {
  return (
    <LegalPage
      eyebrow="Copyright"
      title="著作權、IP 與授權聲明"
      updatedAt="2026-06-21"
      intro={`《神權崩壞：誰是最後的天命之子》之小說文字、角色、世界觀、勢力、場地、神器、標誌、視覺風格、商品企劃、網站編排與衍生素材，除另有標示外，均為 ${siteConfig.studioName} 或合法權利人保留之原創 IP 資產。`}
      sections={[
        {
          title: "權利歸屬",
          body: `本網站與相關產品中之語文著作、美術著作、攝影著作、圖形著作、視聽著作、電腦程式、編輯著作、資料庫、角色設定、世界觀設定、商品設計、UI 文案與品牌識別，除另有書面授權或第三方權利標示外，均由 ${siteConfig.studioName} 或權利人保留所有權利。`,
        },
        {
          title: "使用者取得之限制授權",
          body: "購買、註冊、登入、訂閱、下載或取得會員權益，僅取得個人、非專屬、不可轉讓、不可再授權之使用權。未經書面授權，不得主張任何著作財產權、商標權、角色商業權、出版權、遊戲化權、影像化權、商品化權或其他衍生開發權。",
        },
        {
          title: "禁止未授權利用",
          body: (
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>不得重製、改作、編輯、公開播送、公開上映、公開演出、公開傳輸、散布、出租、販售、上架或製作衍生商品。</li>
              <li>不得移除權利管理資訊、浮水印、署名、序號或安全標記。</li>
              <li>不得將本 IP 或網站資料用於 AI 模型訓練、資料集、爬蟲庫、提示詞素材庫、NFT、鏈上資產、商業委託、廣告素材或第三方平台素材包。</li>
              <li>不得以二創、評論、分享、測試、備份或教育名義散布付費內容、完整章節、下載檔案或可替代官方商品之內容。</li>
            </ul>
          ),
        },
        {
          title: "個人分享與非商業二創",
          body: "讀者可在合理範圍內分享官方頁面連結、心得、評論、短摘錄與非商業二創；但不得假冒官方、造成市場替代、混淆來源、損害角色或作品名譽、散布未公開內容、揭露付費內容核心文本，或違反本網站另行公告之二創規範。",
        },
        {
          title: "侵權處理與權利保全",
          body: "若發現疑似侵權、盜版、未授權商用、AI 訓練資料集收錄、平台轉載或商品仿冒，本網站得要求移除、保存證據、通知平台、限制帳號、撤銷授權、求償損害、請求不當得利返還或採取其他法律行動。",
        },
        {
          title: "授權洽詢",
          body: "出版、漫畫、動畫、遊戲、影視、商品、聯名、展覽、海外代理、教育使用、商業二創、素材授權或任何超出個人閱讀範圍之利用，均須事前取得書面授權。",
        },
        {
          title: "法源依據",
          body: (
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>
                <a className="text-divine-gold hover:text-platinum" href="https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=J0070017">
                  著作權法
                </a>
                ：著作完成時享有著作權、語文與美術等著作類型、著作人格權、著作財產權與侵害救濟。
              </li>
              <li>
                <a className="text-divine-gold hover:text-platinum" href="https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=B0000001">
                  民法
                </a>
                ：人格權、契約、侵權行為、損害賠償與不當得利等一般規定。
              </li>
            </ul>
          ),
        },
        {
          title: "聯絡方式",
          body: `授權洽詢或侵權通知，請聯絡：${siteConfig.contactEmail}。`,
        },
      ]}
    />
  );
}
