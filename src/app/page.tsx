import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { HomePage } from "@/components/home/home-page";
import { siteConfig } from "@/config/site";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "神權崩壞官方網站｜七界宇宙小說閱讀與 IP 商城",
  description: siteConfig.description,
  path: "/",
  keywords: ["官方網站", "小說閱讀平台", "電子書商城", "高級動漫 IP 官網"],
});

// ISR：定期重讀站台內容覆蓋（siteContent），讓 GM 編輯結果於 60 秒內生效。
export const revalidate = 60;

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          alternateName: siteConfig.shortName,
          url: absoluteUrl("/"),
          description: siteConfig.description,
          inLanguage: "zh-Hant",
          publisher: {
            "@type": "Organization",
            name: siteConfig.studioName,
          },
        }}
      />
      <HomePage />
    </>
  );
}
