import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ChapterReader } from "@/components/novel/chapter-reader";
import { JsonLd } from "@/components/seo/json-ld";
import { chapters, getAdjacentChapters, getChapter } from "@/data/novel";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import { isValidSlug } from "@/lib/validation";

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
  const safeChapter = chapter.isFree ? chapter : { ...chapter, content: [] };

  return (
    <>
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
      <ChapterReader chapter={safeChapter} previous={previous} next={next} />
    </>
  );
}
