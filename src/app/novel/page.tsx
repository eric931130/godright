import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, PenLine, ScrollText } from "lucide-react";

import { Badge } from "@/components/common/badge";
import { DivineButton } from "@/components/common/divine-button";
import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { NovelChapterCard } from "@/components/novel/novel-chapter-card";
import { JsonLd } from "@/components/seo/json-ld";
import { novelCatalog, freeChapters, paidChapters } from "@/data/novel";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "小說閱讀｜神權崩壞",
  description: novelCatalog.description,
  path: "/novel",
  keywords: ["小說閱讀", "免費章節", "付費章節", "天位神榜", "天魂", "天芸"],
  type: "book",
});

export default function NovelPage() {
  const latestChapter = novelCatalog.chapters.at(-1);
  const firstChapter = novelCatalog.chapters[0];

  return (
    <div className="site-container py-10 sm:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Book",
          name: novelCatalog.title,
          description: novelCatalog.description,
          author: {
            "@type": "Organization",
            name: novelCatalog.author,
          },
          inLanguage: "zh-Hant",
          url: absoluteUrl("/novel"),
          numberOfPages: novelCatalog.chapters.length,
          genre: novelCatalog.categories,
        }}
      />
      <section className="grid gap-8 lg:grid-cols-[22rem_1fr] lg:items-start">
        <GlassCard className="overflow-hidden p-0">
          <div className="image-placeholder relative aspect-[3/4]">
            <div className="seal-ring animate-orbit absolute inset-8 opacity-60" />
            <span className="sr-only">{novelCatalog.coverAlt}</span>
          </div>
          <div className="p-5">
            <Badge>{novelCatalog.status}</Badge>
            <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight text-platinum">
              {novelCatalog.title}
            </h1>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {novelCatalog.subtitle}
            </p>
          </div>
        </GlassCard>

        <div>
          <div className="flex flex-wrap gap-2">
            {novelCatalog.categories.map((category) => (
              <Badge key={category} tone="purple">
                {category}
              </Badge>
            ))}
          </div>
          <p className="mt-6 text-base leading-8 text-muted-foreground">
            {novelCatalog.description}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <GlassCard className="p-4">
              <p className="text-xs text-muted-foreground">作者</p>
              <p className="mt-2 flex items-center gap-2 font-medium text-platinum">
                <PenLine className="size-4 text-divine-gold" aria-hidden="true" />
                {novelCatalog.author}
              </p>
            </GlassCard>
            <GlassCard className="p-4">
              <p className="text-xs text-muted-foreground">字數</p>
              <p className="mt-2 font-medium text-platinum">{novelCatalog.wordCount}</p>
            </GlassCard>
            <GlassCard className="p-4">
              <p className="text-xs text-muted-foreground">章節</p>
              <p className="mt-2 font-medium text-platinum">
                {novelCatalog.chapters.length} 章
              </p>
            </GlassCard>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <DivineButton href={`/novel/${firstChapter.volumeSlug}/${firstChapter.slug}`}>
              <BookOpen className="size-5" aria-hidden="true" />
              開始閱讀
            </DivineButton>
            <DivineButton href="/novel/paid" variant="outline">
              付費章節說明
            </DivineButton>
            <DivineButton href="/bookshelf" variant="outline">
              我的書架
            </DivineButton>
          </div>

          {latestChapter ? (
            <GlassCard className="mt-8 p-5">
              <p className="text-sm text-divine-gold">最新章節</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-platinum">
                {latestChapter.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {latestChapter.excerpt}
              </p>
              <Link
                href={`/novel/${latestChapter.volumeSlug}/${latestChapter.slug}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-divine-gold transition hover:text-platinum"
              >
                <ScrollText className="size-4" aria-hidden="true" />
                查看最新
              </Link>
            </GlassCard>
          ) : null}
        </div>
      </section>

      <section className="py-16">
        <SectionTitle
          eyebrow="Volumes"
          title="篇章分類"
          description="目前建立三卷目錄，後續可接 Supabase volumes table 管理排序與上架狀態。"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {novelCatalog.volumes.map((volume) => (
            <Link key={volume.id} href={`/novel/${volume.slug}`}>
              <GlassCard interactive className="h-full p-5">
                <p className="text-sm text-divine-gold">第 {volume.order} 卷</p>
                <h3 className="mt-3 font-serif text-xl font-semibold text-platinum">
                  {volume.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {volume.description}
                </p>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16">
        <SectionTitle eyebrow="Free" title="免費章節列表" />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {freeChapters.map((chapter) => (
            <NovelChapterCard key={chapter.id} chapter={chapter} />
          ))}
        </div>
      </section>

      <section className="py-16">
        <SectionTitle
          eyebrow="Premium"
          title="付費章節列表"
          description="付費章節會顯示鎖定狀態，進入閱讀頁也只會看到封印鎖定畫面。"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {paidChapters.map((chapter) => (
            <NovelChapterCard key={chapter.id} chapter={chapter} />
          ))}
        </div>
      </section>
    </div>
  );
}
