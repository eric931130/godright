import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Badge } from "@/components/common/badge";
import { DivineButton } from "@/components/common/divine-button";
import { GlassCard } from "@/components/common/glass-card";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { getLoreEntry, loreEntries } from "@/data/lore";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import { isValidSlug } from "@/lib/validation";

type LoreDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return loreEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: LoreDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isValidSlug(slug)) {
    return createPageMetadata({
      title: "百科條目不存在｜神權崩壞",
      description: "找不到指定的世界觀百科條目。",
      path: "/lore",
    });
  }
  const entry = getLoreEntry(slug);

  if (!entry) {
    return createPageMetadata({
      title: "百科條目不存在｜神權崩壞",
      description: "找不到指定的世界觀百科條目。",
      path: `/lore/${slug}`,
    });
  }

  return createPageMetadata({
    title: `${entry.title}｜世界觀百科`,
    description: entry.summary,
    path: `/lore/${entry.slug}`,
    keywords: [entry.category, entry.faction, entry.element, ...entry.tags],
    type: "article",
  });
}

export default async function LoreDetailPage({ params }: LoreDetailPageProps) {
  const { slug } = await params;
  if (!isValidSlug(slug)) {
    notFound();
  }
  const entry = getLoreEntry(slug);

  if (!entry) {
    notFound();
  }

  return (
    <div className="site-container py-10 sm:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: entry.title,
          description: entry.summary,
          articleSection: entry.category,
          keywords: entry.tags.join(", "),
          url: absoluteUrl(`/lore/${entry.slug}`),
          inLanguage: "zh-Hant",
          publisher: {
            "@type": "Organization",
            name: siteConfig.studioName,
          },
        }}
      />
      <GlassCard className="p-6 sm:p-8">
        <Badge>{entry.category}</Badge>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-platinum sm:text-6xl">
          {entry.title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
          {entry.summary}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge tone="purple">{entry.faction}</Badge>
          <Badge tone="blue">{entry.element}</Badge>
          {entry.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
        </div>
      </GlassCard>
      <article className="mx-auto max-w-3xl py-12 text-lg leading-9 text-platinum/90">
        {entry.content.map((paragraph) => (
          <p key={paragraph} className="mb-7">{paragraph}</p>
        ))}
      </article>
      <GlassCard className="p-6">
        <h2 className="font-serif text-2xl text-platinum">關聯資料</h2>
        <div className="mt-4 grid gap-3 text-sm text-muted-foreground md:grid-cols-3">
          <p>角色：{entry.relatedCharacters.join("、")}</p>
          <p>場地：{entry.relatedLocations.join("、")}</p>
          <p>物件：{entry.relatedArtifacts.join("、")}</p>
        </div>
      </GlassCard>
      <DivineButton href="/lore" variant="outline" className="mt-8">返回百科</DivineButton>
    </div>
  );
}
