"use client";

import Link from "next/link";
import { BookmarkIcon, BookOpen, Library, ScrollText } from "lucide-react";

import { Badge } from "@/components/common/badge";
import { DivineButton } from "@/components/common/divine-button";
import { EmptyState } from "@/components/common/empty-state";
import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { chapters } from "@/data/novel";
import { useReadingStorage } from "@/lib/reading/storage";

export default function BookshelfPage() {
  const storage = useReadingStorage();
  const bookshelfChapters = chapters.filter((chapter) =>
    storage.bookshelf.includes(chapter.id),
  );
  const progressItems = storage.progress
    .map((item) => ({
      ...item,
      chapter: chapters.find((chapter) => chapter.id === item.chapterId),
    }))
    .filter((item) => item.chapter);

  return (
    <div className="site-container py-10 sm:py-14">
      <GlassCard className="p-6 sm:p-8">
        <Badge>Bookshelf</Badge>
        <h1 className="mt-4 font-serif text-3xl font-semibold text-platinum sm:text-5xl">
          我的書架
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
          目前以 localStorage 模擬加入書架、書籤與閱讀進度。正式版會同步到會員資料庫。
        </p>
        <div className="mt-7">
          <DivineButton href="/novel">
            <BookOpen className="size-4" aria-hidden="true" />
            回小說總覽
          </DivineButton>
        </div>
      </GlassCard>

      <section className="py-16">
        <SectionTitle eyebrow="Saved" title="已加入書架" />
        <div className="mt-8">
          {bookshelfChapters.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {bookshelfChapters.map((chapter) => (
                <GlassCard key={chapter.id} className="p-5">
                  <Library className="size-5 text-divine-gold" aria-hidden="true" />
                  <h2 className="mt-3 font-serif text-xl font-semibold text-platinum">
                    {chapter.title}
                  </h2>
                  <p className="mt-2 text-sm text-moon-blue">{chapter.volume}</p>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {chapter.excerpt}
                  </p>
                  <div className="mt-5 flex gap-2">
                    <Link
                      href={`/novel/${chapter.volumeSlug}/${chapter.slug}`}
                      className="text-sm font-medium text-divine-gold transition hover:text-platinum"
                    >
                      繼續閱讀
                    </Link>
                    <button
                      type="button"
                      onClick={() => storage.toggleBookshelf(chapter.id)}
                      className="text-sm text-muted-foreground transition hover:text-platinum"
                    >
                      移除
                    </button>
                  </div>
                </GlassCard>
              ))}
            </div>
          ) : (
            <EmptyState title="書架尚未收藏章節" description="前往小說總覽，將想看的章節加入書架。" />
          )}
        </div>
      </section>

      <section className="py-16">
        <SectionTitle eyebrow="Progress" title="閱讀進度" />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {progressItems.length > 0 ? (
            progressItems.map((item) =>
              item.chapter ? (
                <GlassCard key={item.chapterId} className="p-5">
                  <ScrollText className="size-5 text-divine-gold" aria-hidden="true" />
                  <h2 className="mt-3 font-serif text-xl font-semibold text-platinum">
                    {item.chapter.title}
                  </h2>
                  <div className="mt-4 h-2 rounded-full bg-platinum/10">
                    <div
                      className="h-full rounded-full bg-divine-gold"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    已閱讀 {item.progress}% · {new Date(item.updatedAt).toLocaleString("zh-TW")}
                  </p>
                </GlassCard>
              ) : null,
            )
          ) : (
            <EmptyState title="尚無閱讀進度" description="進入任一章節後，系統會自動記錄閱讀進度。" />
          )}
        </div>
      </section>

      <section className="py-16">
        <SectionTitle eyebrow="Bookmarks" title="書籤" />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {storage.bookmarks.length > 0 ? (
            storage.bookmarks.map((bookmark) => (
              <GlassCard key={bookmark.chapterId} className="p-5">
                <BookmarkIcon className="size-5 text-divine-gold" aria-hidden="true" />
                <h2 className="mt-3 font-serif text-xl font-semibold text-platinum">
                  {bookmark.title}
                </h2>
                <p className="mt-2 text-xs text-muted-foreground">
                  {new Date(bookmark.createdAt).toLocaleString("zh-TW")}
                </p>
                <Link
                  href={`/novel/${bookmark.volumeSlug}/${bookmark.chapterSlug}`}
                  className="mt-5 inline-flex text-sm font-medium text-divine-gold transition hover:text-platinum"
                >
                  回到章節
                </Link>
              </GlassCard>
            ))
          ) : (
            <EmptyState title="尚未加入書籤" description="閱讀章節時可使用工具列加入書籤。" />
          )}
        </div>
      </section>
    </div>
  );
}
