import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TrackEvent } from "@/components/analytics/track-event";
import { ChapterReader } from "@/components/novel/chapter-reader";
import { JsonLd } from "@/components/seo/json-ld";
import { getCharacter } from "@/data/characters";
import { chapters, getAdjacentChapters, getChapter } from "@/data/novel";
import { getContentOverrides, resolveText } from "@/lib/site-content/content-overrides";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import { isValidSlug } from "@/lib/validation";

export const revalidate = 60;

type ChapterPageProps = {
  params: Promise<{
    volumeSlug: string;
    chapterSlug: string;
  }>;
};

export function generateStaticParams() {
  return chapters.map((chapter) => ({
    volumeSlug: chapter.volumeSlug,
    chapterSlug: chapter.slug,
  }));
}

export async function generateMetadata({ params }: ChapterPageProps): Promise<Metadata> {
  const { volumeSlug, chapterSlug } = await params;
  if (!isValidSlug(volumeSlug) || !isValidSlug(chapterSlug)) {
    return createPageMetadata({
      title: "章節不存在｜神權崩壞",
      description: "找不到指定的神權崩壞小說章節。",
      path: "/novel",
    });
  }
  const chapter = getChapter(volumeSlug, chapterSlug);

  if (!chapter) {
    return createPageMetadata({
      title: "章節不存在｜神權崩壞",
      description: "找不到指定的神權崩壞小說章節。",
      path: `/novel/${volumeSlug}/${chapterSlug}`,
    });
  }

  return createPageMetadata({
    title: `${chapter.title}｜${chapter.volume}`,
    description: chapter.excerpt,
    path: `/novel/${chapter.volumeSlug}/${chapter.slug}`,
    keywords: [chapter.title, chapter.volume, ...chapter.tags],
    type: "article",
    publishedTime: chapter.publishedAt,
  });
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { volumeSlug, chapterSlug } = await params;
  if (!isValidSlug(volumeSlug) || !isValidSlug(chapterSlug)) {
    notFound();
  }
  const chapter = getChapter(volumeSlug, chapterSlug);

  if (!chapter) {
    notFound();
  }

  const { previous, next } = getAdjacentChapters(chapter.id);

  // 套用站台內容覆蓋：標題（不敏感）對所有章節生效；內文僅免費章節可覆蓋。
  const overrides = await getContentOverrides();
  const mergedTitle = resolveText(overrides, `chapter.${chapter.id}.title`, chapter.title);
  const contentOverride = overrides[`chapter.${chapter.id}.content`]?.text;
  const parsedContent = contentOverride
    ? contentOverride.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean)
    : [];
  const mergedContent = chapter.isFree && parsedContent.length ? parsedContent : chapter.content;
  const baseChapter = { ...chapter, title: mergedTitle, content: mergedContent };

  // 付費章節在 server 端清空正文，僅保留 excerpt/previewText 等安全短欄位。
  const safeChapter = chapter.isFree ? baseChapter : { ...baseChapter, content: [] };
  const lockInfo = chapter.isFree
    ? undefined
    : {
        appearingCharacters: (chapter.appearingCharacterSlugs ?? [])
          .map((slug) => {
            const character = getCharacter(slug);
            return character ? { slug: character.slug, name: character.name } : null;
          })
          .filter((entry): entry is { slug: string; name: string } => Boolean(entry)),
        keyLore: chapter.keyLore ?? [],
      };

  return (
    <>
      <TrackEvent event="chapter_view" targetType="chapter" targetId={chapter.id} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Chapter",
          name: chapter.title,
          description: chapter.excerpt,
          isPartOf: {
            "@type": "Book",
            name: "神權崩壞：誰是最後的天命之子",
          },
          datePublished: chapter.publishedAt,
          url: absoluteUrl(`/novel/${chapter.volumeSlug}/${chapter.slug}`),
          inLanguage: "zh-Hant",
          isAccessibleForFree: chapter.isFree,
        }}
      />
      <ChapterReader chapter={safeChapter} previous={previous} next={next} lockInfo={lockInfo} />
    </>
  );
}
