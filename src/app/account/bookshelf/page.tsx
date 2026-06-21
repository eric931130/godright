"use client";

import Link from "next/link";

import { EmptyState } from "@/components/common/empty-state";
import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { chapters } from "@/data/novel";
import { useBookshelf, useReadingProgress } from "@/lib/account/storage";

export default function AccountBookshelfPage() {
  const bookshelf = useBookshelf();
  const reading = useReadingProgress();
  const saved = chapters.filter((chapter) => bookshelf.chapterIds.includes(chapter.id));

  return (
    <div className="site-container py-10 sm:py-14">
      <SectionTitle eyebrow="Bookshelf" title="我的書架" description="依卷數顯示收藏章節與閱讀進度，使用 localStorage 模擬保存。" />
      <div className="mt-8 grid gap-4">
        {saved.length ? saved.map((chapter) => {
          const progress = reading.progress.find((item) => item.chapterId === chapter.id)?.progress ?? 0;
          return (
            <GlassCard key={chapter.id} className="p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs text-moon-blue">{chapter.volume}</p>
                  <h2 className="mt-1 font-serif text-xl text-platinum">{chapter.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">閱讀進度 {progress}%</p>
                </div>
                <div className="flex gap-3">
                  <Link className="text-sm text-divine-gold" href={`/novel/${chapter.volumeSlug}/${chapter.slug}`}>繼續閱讀</Link>
                  <button className="text-sm text-muted-foreground" onClick={() => bookshelf.toggleChapter(chapter.id)}>移除收藏</button>
                </div>
              </div>
            </GlassCard>
          );
        }) : <EmptyState title="尚未收藏章節" description="前往小說閱讀頁加入書架。" />}
      </div>
    </div>
  );
}
