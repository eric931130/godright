import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { JsonLd } from "@/components/seo/json-ld";
import { loreEntries } from "@/data/lore";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

const LoreBrowser = dynamic(() =>
  import("@/components/lore/lore-browsers").then((module) => module.LoreBrowser),
);

export const metadata: Metadata = createPageMetadata({
  title: "世界觀百科｜神權崩壞七界宇宙資料庫",
  description: "查詢創世神話、三殿九尊、七界秩序、上古封印、天命之子與禁忌力量。",
  path: "/lore",
  keywords: ["世界觀百科", "七界秩序", "上古封印", "三殿九尊", "天命之子"],
});

export default function LorePage() {
  return (
    <div className="site-container py-10 sm:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "世界觀百科",
          description: "神權崩壞七界宇宙資料庫。",
          url: absoluteUrl("/lore"),
          inLanguage: "zh-Hant",
        }}
      />
      <GlassCard className="p-6 sm:p-8">
        <Badge>World Codex</Badge>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-platinum sm:text-6xl">
          世界觀百科
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
          像查遊戲資料庫一樣查詢創世神話、三殿九尊、七界秩序、上古封印與天命之子設定。
        </p>
        <p className="mt-4 text-sm text-divine-gold">目前收錄 {loreEntries.length} 個百科條目</p>
      </GlassCard>
      <section className="py-16">
        <SectionTitle eyebrow="Search" title="百科搜尋與篩選" />
        <LoreBrowser />
      </section>
    </div>
  );
}
