import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { SectionTitle } from "@/components/common/section-title";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

const ArtifactBrowser = dynamic(() =>
  import("@/components/lore/lore-browsers").then((module) => module.ArtifactBrowser),
);

export const metadata: Metadata = createPageMetadata({
  title: "物件總覽｜神器與封印物資料庫",
  description: "查詢神魔雙刃、月夢法杖、天位神榜、化生封印卷軸與七界封印鑰。",
  path: "/artifacts",
  keywords: ["神器", "物件", "神魔雙刃", "月夢法杖", "天位神榜", "封印卷軸"],
});

export default function ArtifactsPage() {
  return (
    <div className="site-container py-10 sm:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "物件總覽",
          description: "神權崩壞神器與封印物資料庫。",
          url: absoluteUrl("/artifacts"),
          inLanguage: "zh-Hant",
        }}
      />
      <SectionTitle
        eyebrow="Artifacts"
        title="物件總覽"
        description="查詢武器、神器、封印卷軸、魔核、契約印與可商品化設定物。"
      />
      <ArtifactBrowser />
    </div>
  );
}
