import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "網站與會員服務條款｜神權崩壞",
  description: "神權崩壞官方網站服務條款，包含會員、數位內容、商城、退費、帳號、智慧財產與使用限制。",
  path: "/terms",
  keywords: ["服務條款", "會員規範", "數位內容", "退款條款", "商城規範"],
});

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="網站與會員服務條款"
      updatedAt="2026-06-21"
      intro="本條款適用於《神權崩壞：誰是最後的天命之子》官方網站、會員帳號、小說閱讀、電子書商城、數位下載、IP 周邊、活動與後續相關產品。使用者註冊、登入、下單、付款、下載、瀏覽付費內容或繼續使用本網站時，即表示已閱讀並同意本條款成為雙方契約之一部；但本條款不得排除中華民國法律或消費者所在地強制法規所保障之不可預先拋棄最低權利。"
      sections={[
        {
          title: "條款效力與電子同意",
          body: (
            <p>
              使用者以網站介面勾選同意、建立帳號、登入、下單、付款、開啟下載、解鎖章節或使用會員功能，均視為對本條款、退費條款、隱私權政策與各商品頁揭露內容作成同意。依中華民國電子簽章法之精神，符合可完整呈現並可日後取出查驗之電子文件與電子同意，不得僅因電子形式而否認其效力。
            </p>
          ),
        },
        {
          title: "定型化契約與法定最低保障",
          body: (
            <p>
              本網站得於法律允許最大範圍內保留營運、內容、授權、風險控管、停權、退款審核與權益調整之權利。若任一條款依消費者保護法、民法或其他強制規定被認定無效、不構成契約內容或需作有利消費者之解釋，其餘條款仍於可執行範圍內繼續有效。
            </p>
          ),
        },
        {
          title: "服務範圍與授權性質",
          body: (
            <p>
              本網站提供原創小說 IP 內容瀏覽、章節閱讀、電子書、數位設定集、桌布、貼圖、會員功能、訂閱通知、實體或數位周邊展示與後續新增服務。除商品頁另有明示外，使用者取得者為個人、非專屬、不可轉讓、不可再授權且可依本條款撤銷之使用授權，不代表取得著作權、商標、角色、世界觀、資料庫、原始檔或商業利用權。
            </p>
          ),
        },
        {
          title: "帳號、會員與開發者驗證",
          body: (
            <p>
              使用者應提供正確資料並妥善保管登入憑證，不得出借、轉讓、販售或與多人共用帳號。若帳號涉及異常流量、盜用、破解、權限繞過、未授權分享、付款爭議、侵害他人權益或違反本條款，本網站得暫停、限制、終止服務或撤銷相關權益。開發者帳號登入後會進入三次封印驗證，未完成驗證不得進入後台。
            </p>
          ),
        },
        {
          title: "付款、訂單與退費",
          body: (
            <p>
              商品價格、幣別、授權內容、交付方式、可否下載、使用期限與退費限制，以商品頁、結帳頁與
              <Link className="mx-1 text-divine-gold hover:text-platinum" href="/refund">
                退費與數位商品退款條款
              </Link>
              公告為準。付款失敗、拒付、退款、取消、詐欺疑慮或違反使用限制時，本網站得暫停或撤銷閱讀、下載、會員、收藏版、活動資格與其他已授權權益。
            </p>
          ),
        },
        {
          title: "禁止行為",
          body: (
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>不得重製、轉售、公開傳輸、公開散布、改作、去除浮水印、擷取付費內容或以任何方式使第三人取得未授權內容。</li>
              <li>不得使用爬蟲、批次下載、自動化註冊、逆向工程、規避權限、破壞安全機制或干擾網站服務。</li>
              <li>不得將本 IP、文本、角色、圖像、設定、使用者資料或付費內容作為 AI 模型訓練、資料集、商業素材庫、NFT 或其他未授權商業用途。</li>
              <li>不得冒用官方、誤導第三人、散布不實訊息、侵害人格權、個資、著作權、商標權或其他權利。</li>
            </ul>
          ),
        },
        {
          title: "服務變更、暫停與終止",
          body: (
            <p>
              本網站得因營運、法規、資安、金流、授權、內容規劃或不可抗力因素，調整服務內容、價格、會員權益、活動規則、商品資訊與條款。重大變更將以網站公告、結帳揭露或 Email 等方式通知；使用者於公告後繼續使用服務，視為同意修訂內容。
            </p>
          ),
        },
        {
          title: "準據法、管轄與國際最低保障",
          body: (
            <p>
              本網站與相關產品之契約、使用、付款、退款、授權、侵權與爭議，原則上以中華民國法律為準據法。若使用者所在地之強制消費者保護、隱私或數位服務法規提供不可排除之最低保障，則僅於該最低強制範圍內適用；其餘事項仍依本條款與中華民國法律處理。除法律另有強制管轄外，雙方同意以臺灣臺北地方法院為第一審管轄法院。
            </p>
          ),
        },
        {
          title: "法源依據",
          body: (
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>
                中華民國
                <a className="mx-1 text-divine-gold hover:text-platinum" href="https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=J0170001">
                  消費者保護法
                </a>
                ：通訊交易資訊揭露、七日解除權、定型化契約與消費者最低保障。
              </li>
              <li>
                中華民國
                <a className="mx-1 text-divine-gold hover:text-platinum" href="https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=J0080037">
                  電子簽章法
                </a>
                ：電子文件、電子簽章與電子形式同意之效力。
              </li>
              <li>
                中華民國
                <a className="mx-1 text-divine-gold hover:text-platinum" href="https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=J0070017">
                  著作權法
                </a>
                及
                <a className="mx-1 text-divine-gold hover:text-platinum" href="https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=I0050021">
                  個人資料保護法
                </a>
                ：IP 保護、使用者資料處理與資料主體權利。
              </li>
            </ul>
          ),
        },
        {
          title: "聯絡方式",
          body: `如對服務條款、訂單、退費、會員權益或授權有疑問，請聯絡：${siteConfig.contactEmail}。`,
        },
      ]}
    />
  );
}
