import type { Metadata } from "next";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { JsonLd } from "@/components/seo/json-ld";
import { newsItems } from "@/data/mock/news";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "最新消息｜神權崩壞官方公告",
  description: "追蹤章節更新、電子書預購、角色活動、貼圖開賣與會員內容公告。",
  path: "/news",
  keywords: ["最新消息", "官方公告", "章節更新", "電子書預購", "角色活動"],
  type: "website",
});

export default function NewsPage() {
  return (
    <div className="site-container py-10 sm:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "最新消息",
          description: "神權崩壞官方公告與更新。",
          url: absoluteUrl("/news"),
          hasPart: newsItems.map((item) => ({
            "@type": "NewsArticle",
            headline: item.title,
            datePublished: item.date,
            articleSection: item.category,
            description: item.summary,
          })),
        }}
      />
      <SectionTitle
        eyebrow="News"
        title="最新消息"
        description="集中公告章節更新、電子書預購、角色活動、貼圖開賣與會員內容。"
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {newsItems.map((item) => (
          <GlassCard key={item.id} id={item.id} className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Badge tone={item.category === "公告" ? "gold" : item.category === "活動" ? "purple" : "blue"}>
                {item.category}
              </Badge>
              <time className="text-xs text-muted-foreground" dateTime={item.date}>
                {item.date}
              </time>
            </div>
            <h2 className="mt-4 font-serif text-2xl font-semibold text-platinum">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.summary}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
