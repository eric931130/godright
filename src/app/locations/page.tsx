import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { SectionTitle } from "@/components/common/section-title";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

const LocationBrowser = dynamic(() =>
  import("@/components/lore/lore-browsers").then((module) => module.LocationBrowser),
);

export const metadata: Metadata = createPageMetadata({
  title: "場地總覽｜神權崩壞七界地點資料庫",
  description: "查詢天幻神殿、黃金神殿、深淵魔殿、封印之地與神魔交界之域。",
  path: "/locations",
  keywords: ["場地", "天幻神殿", "黃金神殿", "深淵魔殿", "封印之地"],
});

export default function LocationsPage() {
  return (
    <div className="site-container py-10 sm:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "場地總覽",
          description: "神權崩壞七界地點資料庫。",
          url: absoluteUrl("/locations"),
          inLanguage: "zh-Hant",
        }}
      />
      <SectionTitle
        eyebrow="Locations"
        title="場地總覽"
        description="查詢神殿、廣場、封印之地、上古戰場與神魔交界域。"
      />
      <LocationBrowser />
    </div>
  );
}
