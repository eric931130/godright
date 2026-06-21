import Link from "next/link";
import { BookMarked, PenLine, ScrollText } from "lucide-react";

import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { chapters } from "@/data/novel";
import type { EbookProductExtra } from "@/data/shop";

export function EbookPreview({ ebook }: { ebook: EbookProductExtra }) {
  const previewChapters = (ebook.previewChapterIds ?? [])
    .map((id) => chapters.find((chapter) => chapter.id === id))
    .filter((chapter): chapter is NonNullable<typeof chapter> => Boolean(chapter));

  return (
    <section className="space-y-6 py-16">
      {ebook.authorPreface ? (
        <GlassCard className="p-6">
          <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold text-platinum">
            <PenLine className="size-5 text-divine-gold" aria-hidden="true" />
            作者序
          </h2>
          <p className="mt-4 text-sm leading-8 text-muted-foreground">{ebook.authorPreface}</p>
        </GlassCard>
      ) : null}

      {ebook.introduction ? (
        <GlassCard className="p-6">
          <h2 className="font-serif text-2xl font-semibold text-platinum">內容介紹</h2>
          <p className="mt-4 text-sm leading-8 text-muted-foreground">{ebook.introduction}</p>
        </GlassCard>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        {ebook.includedChapters?.length ? (
          <GlassCard className="p-6">
            <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold text-platinum">
              <ScrollText className="size-5 text-divine-gold" aria-hidden="true" />
              收錄章節
            </h2>
            <ol className="mt-4 grid gap-2 text-sm text-muted-foreground">
              {ebook.includedChapters.map((title, index) => (
                <li key={title} className="flex gap-3 rounded-lg border border-platinum/10 bg-deep-space/45 px-4 py-2.5">
                  <span className="text-divine-gold">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-platinum/90">{title}</span>
                </li>
              ))}
            </ol>
          </GlassCard>
        ) : null}

        {previewChapters.length ? (
          <GlassCard className="p-6">
            <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold text-platinum">
              <BookMarked className="size-5 text-divine-gold" aria-hidden="true" />
              免費試讀
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">購買前可先閱讀以下免費章節，感受七界的文字氛圍。</p>
            <div className="mt-4 grid gap-2">
              {previewChapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  href={`/novel/${chapter.volumeSlug}/${chapter.slug}`}
                  className="flex items-center justify-between gap-3 rounded-lg border border-divine-gold/25 bg-deep-space/45 px-4 py-3 text-sm text-platinum transition hover:bg-divine-gold/10"
                >
                  <span>{chapter.title}</span>
                  <span className="text-xs text-divine-gold">試讀 →</span>
                </Link>
              ))}
            </div>
          </GlassCard>
        ) : null}
      </div>

      {ebook.previewImages?.length ? (
        <div>
          <SectionTitle eyebrow="Preview" title="角色插圖與內頁預覽" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ebook.previewImages.map((image) => (
              <GlassCard key={image} className="overflow-hidden p-0">
                <div className="image-placeholder aspect-[3/4]">
                  <span className="sr-only">{image}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
