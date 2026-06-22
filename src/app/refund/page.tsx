import type { Metadata } from "next";

import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "退費與數位商品退款條款｜神權崩壞",
  description: "神權崩壞電子書、付費章節、設定集、桌布、貼圖、會員與相關產品之退費及退款條款。",
  path: "/refund",
  keywords: ["退費條款", "退款規則", "數位商品", "電子書退款", "付費章節"],
});

export default function RefundPage() {
  return (
    <LegalPage
      eyebrow="Refund"
      title="退費與數位商品退款條款"
      updatedAt="2026-06-21"
      intro="本條款依中華民國消費者保護法、通訊交易解除權合理例外情事及相關強制規定訂定。目的在於讓交易資訊清楚、讓開發者能防止數位內容被取得後任意退費，同時保留消費者依法不得預先拋棄之最低保障。"
      sections={[
        {
          title: "適用範圍",
          body: "本條款適用於本網站販售或提供之電子書、付費章節、小說合集、角色設定集、世界觀設定集、桌布、貼圖、數位下載、線上服務、會員權益、活動票券、預購項目、IP 周邊與其他相關商品或服務。商品頁、結帳頁或活動頁有更具體揭露者，該揭露與本條款合併適用。",
        },
        {
          title: "七日解除權原則",
          body: "依法得適用消費者保護法通訊交易解除權之商品或服務，消費者得於收受商品或接受服務後七日內，以退回商品或書面通知方式解除契約，無須說明理由或負擔費用。但通訊交易有法定合理例外情事、商品頁已事先告知並取得必要同意者，不適用任意七日解除權。",
        },
        {
          title: "數位內容與線上服務例外",
          body: "非以有形媒介提供之數位內容，或一經提供即為完成之線上服務，若消費者於付款、解鎖、下載或開始使用前已受明確告知並同意提供，即屬通訊交易七日解除權之合理例外情事。本網站之電子書、付費章節、數位設定集、桌布、貼圖、數位檔案、線上閱讀權限、會員權限與立即完成之服務，原則上適用本項例外。",
        },
        {
          title: "原則上不退費項目",
          body: (
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>已解鎖、已閱讀、已下載、已取得檔案連結、已產生授權或已開始使用之數位內容。</li>
              <li>依使用者要求製作、綁定、客製化、簽名、限量編號或專屬開通之商品或服務。</li>
              <li>已拆封之影音商品、電腦軟體、個人衛生用品，或依法屬合理例外情事之商品。</li>
              <li>因使用者帳號共用、憑證外流、違反條款、拒付、濫用退款或未授權散布而被撤銷之權益。</li>
              <li>商品頁已清楚標示不可退款、最終銷售、限時活動、會員贈品或折扣組合中已履行之部分。</li>
            </ul>
          ),
        },
        {
          title: "可申請退費情形",
          body: (
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>重複扣款、非本人授權交易且經金流或本網站確認屬實。</li>
              <li>付款成功但本網站未交付商品、未開通權限，且經客服確認無法補正。</li>
              <li>交付內容與商品頁主要描述明顯不符，且非因使用者裝置、網路、第三方閱讀器或操作造成。</li>
              <li>檔案嚴重毀損、無法取得或服務重大瑕疵，經合理期間仍無法修復、補發或替代履行。</li>
              <li>法律明定應退款、主管機關命令、法院判決、金流規則或本網站個案同意之情形。</li>
            </ul>
          ),
        },
        {
          title: "申請期限與審核",
          body: "消費者主張七日解除權者，應於法定期間內提出。其他退費申請應於發現問題後七日內提出，並提供訂單編號、購買 Email、付款證明、問題描述、截圖或錄影。本網站得查驗登入、下載、閱讀、授權、金流與客服紀錄；資料不足、逾期、無法識別訂單或疑似濫用者，得駁回或要求補件。",
        },
        {
          title: "退款方式與權限撤銷",
          body: "退費核准後，原則上依原付款方式退款；實際入帳時間依金流、發卡行或平台規則而定。依法或個案核准退款時，本網站得同時撤銷章節解鎖、下載權限、會員效益、活動資格、收藏版授權、訂單狀態、點數、折價券與相關贈品。若使用者已取得數位內容，應停止使用並不得留存、散布、轉售或再利用。",
        },
        {
          title: "實體商品與周邊",
          body: "實體周邊若未拆封、未使用且不屬法定例外，依消費者保護法與商品頁揭露辦理退貨。客製化、易於毀損、已拆封個人衛生用品、保存期限較短、限量簽名或其他依法得排除七日解除權之商品，將於商品頁或結帳流程明確告知。",
        },
        {
          title: "法源依據",
          body: (
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>
                <a className="text-divine-gold hover:text-platinum" href="https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=J0170001">
                  消費者保護法
                </a>
                ：第 18 條資訊揭露、第 19 條通訊交易七日解除權及合理例外、第 19-2 條退款與取回商品義務。
              </li>
              <li>
                <a className="text-divine-gold hover:text-platinum" href="https://cpc.ey.gov.tw/Page/1D52E592E7C79A99">
                  通訊交易解除權合理例外情事適用準則
                </a>
                ：數位內容、一經提供即為完成之線上服務、客製化給付及其他例外項目。
              </li>
              <li>
                <a className="text-divine-gold hover:text-platinum" href="https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=B0000001">
                  民法
                </a>
                ：契約、解除、損害賠償與回復原狀之一般規定。
              </li>
            </ul>
          ),
        },
        {
          title: "聯絡方式",
          body: `退費、退款、訂單或權限問題，請聯絡：${siteConfig.contactEmail}。`,
        },
      ]}
    />
  );
}
