"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  BookmarkIcon,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Copy,
  Library,
  LockKeyhole,
  Minus,
  Plus,
  Share2,
  ShoppingBag,
} from "lucide-react";

import { Badge } from "@/components/common/badge";
import { DivineButton } from "@/components/common/divine-button";
import { GlassCard } from "@/components/common/glass-card";
import type { Chapter } from "@/data/novel";
import { useReadingStorage } from "@/lib/reading/storage";
import { cn } from "@/lib/utils";

type ChapterReaderProps = {
  chapter: Chapter;
  previous?: Chapter;
  next?: Chapter;
};

export function ChapterReader({ chapter, previous, next }: ChapterReaderProps) {
  const storage = useReadingStorage();
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.9);
  const [lightMode, setLightMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [shareMessage, setShareMessage] = useState("");

  const hasReadableContent = chapter.content.length > 0;
  const unlocked = hasReadableContent && (chapter.isFree || storage.isUnlocked(chapter.id));
  const bookmarked = storage.isBookmarked(chapter.id);
  const inBookshelf = storage.isInBookshelf(chapter.id);

  useEffect(() => {
    const updateProgress = () => {
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        documentHeight > 0 ? Math.min(100, (window.scrollY / documentHeight) * 100) : 0;

      setScrollProgress(progress);
      storage.saveProgress({
        chapterId: chapter.id,
        volumeSlug: chapter.volumeSlug,
        chapterSlug: chapter.slug,
        progress: Math.round(progress),
        updatedAt: new Date().toISOString(),
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, [chapter.id, chapter.slug, chapter.volumeSlug, storage]);

  const readerStyle = useMemo(
    () => ({
      fontSize: `${fontSize}px`,
      lineHeight,
    }),
    [fontSize, lineHeight],
  );

  const shareChapter = async () => {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({ title: chapter.title, text: chapter.excerpt, url });
      return;
    }

    await navigator.clipboard.writeText(url);
    setShareMessage("章節連結已複製");
    window.setTimeout(() => setShareMessage(""), 1800);
  };

  const toggleBookmark = () => {
    storage.toggleBookmark({
      chapterId: chapter.id,
      volumeSlug: chapter.volumeSlug,
      chapterSlug: chapter.slug,
      title: chapter.title,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <>
      <div className="fixed inset-x-0 top-16 z-30 h-1 bg-deep-space/80">
        <div
          className="h-full bg-divine-gold transition-[width] duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <section className="site-container py-10 sm:py-14">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Badge tone={chapter.isFree ? "gold" : "purple"}>
              {chapter.isFree ? "免費章節" : "付費章節"}
            </Badge>
            <Badge tone={unlocked ? "blue" : "purple"}>
              {unlocked ? "已解鎖" : "神紋封印"}
            </Badge>
            <span className="text-sm text-muted-foreground">{chapter.volume}</span>
          </div>

          <h1 className="font-serif text-3xl font-semibold leading-tight text-platinum sm:text-5xl">
            {chapter.title}
          </h1>
          <p className="mt-5 text-base leading-8 text-muted-foreground">
            {chapter.excerpt}
          </p>

          <GlassCard className="mt-8 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setFontSize((value) => Math.max(16, value - 1))}
                className="rounded-lg border border-divine-gold/25 bg-deep-space/40 p-2 text-platinum hover:bg-divine-gold/10"
                aria-label="縮小字體"
              >
                <Minus className="size-4" />
              </button>
              <span className="min-w-20 text-center text-sm text-muted-foreground">
                字級 {fontSize}
              </span>
              <button
                type="button"
                onClick={() => setFontSize((value) => Math.min(24, value + 1))}
                className="rounded-lg border border-divine-gold/25 bg-deep-space/40 p-2 text-platinum hover:bg-divine-gold/10"
                aria-label="放大字體"
              >
                <Plus className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setLineHeight((value) => (value >= 2.2 ? 1.6 : value + 0.2))}
                className="rounded-lg border border-divine-gold/25 bg-deep-space/40 px-3 py-2 text-sm text-platinum hover:bg-divine-gold/10"
              >
                行距 {lineHeight.toFixed(1)}
              </button>
              <button
                type="button"
                onClick={() => setLightMode((value) => !value)}
                className="rounded-lg border border-divine-gold/25 bg-deep-space/40 px-3 py-2 text-sm text-platinum hover:bg-divine-gold/10"
              >
                {lightMode ? "深色閱讀" : "淺色閱讀"}
              </button>
              <button
                type="button"
                onClick={() => storage.toggleBookshelf(chapter.id)}
                className="rounded-lg border border-divine-gold/25 bg-deep-space/40 px-3 py-2 text-sm text-platinum hover:bg-divine-gold/10"
              >
                <Library className="mr-1 inline size-4" aria-hidden="true" />
                {inBookshelf ? "已在書架" : "加入書架"}
              </button>
              <button
                type="button"
                onClick={toggleBookmark}
                className="rounded-lg border border-divine-gold/25 bg-deep-space/40 px-3 py-2 text-sm text-platinum hover:bg-divine-gold/10"
              >
                <BookmarkIcon className="mr-1 inline size-4" aria-hidden="true" />
                {bookmarked ? "移除書籤" : "加入書籤"}
              </button>
              <button
                type="button"
                onClick={shareChapter}
                className="rounded-lg border border-divine-gold/25 bg-deep-space/40 px-3 py-2 text-sm text-platinum hover:bg-divine-gold/10"
              >
                {shareMessage ? (
                  <Copy className="mr-1 inline size-4" aria-hidden="true" />
                ) : (
                  <Share2 className="mr-1 inline size-4" aria-hidden="true" />
                )}
                {shareMessage || "分享"}
              </button>
            </div>
          </GlassCard>

          {unlocked ? (
            <article
              className={cn(
                "mt-8 rounded-lg border p-6 shadow-2xl sm:p-10",
                lightMode
                  ? "border-[#d7c39b] bg-[#f7edd7] text-[#24180e]"
                  : "border-divine-gold/18 bg-deep-space/72 text-platinum",
              )}
              style={readerStyle}
            >
              {chapter.content.map((paragraph) => (
                <p key={paragraph} className="mb-7">
                  {paragraph}
                </p>
              ))}
              <footer
                className={cn(
                  "mt-10 rounded-lg border p-4 text-sm",
                  lightMode
                    ? "border-[#c5ad78] bg-[#efe0bf] text-[#4a3920]"
                    : "border-divine-gold/20 bg-divine-gold/8 text-muted-foreground",
                )}
              >
                <strong>作者備註：</strong>
                {chapter.authorNote}
              </footer>
            </article>
          ) : (
            <LockedChapter
              chapter={chapter}
              onUnlock={() => storage.mockUnlockChapter(chapter.id)}
              hasReadableContent={hasReadableContent}
            />
          )}

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <ChapterNavLink label="上一章" chapter={previous} direction="prev" />
            <DivineButton href={`/novel/${chapter.volumeSlug}`} variant="outline">
              <BookOpen className="size-4" aria-hidden="true" />
              目錄
            </DivineButton>
            <ChapterNavLink label="下一章" chapter={next} direction="next" />
          </div>
        </div>
      </section>
    </>
  );
}

function LockedChapter({
  chapter,
  onUnlock,
  hasReadableContent,
}: {
  chapter: Chapter;
  onUnlock: () => void;
  hasReadableContent: boolean;
}) {
  return (
    <GlassCard className="mt-8 overflow-hidden p-0">
      <div className="relative min-h-96 p-6 text-center sm:p-10">
        <div className="seal-ring animate-orbit absolute inset-8 opacity-60" />
        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
          <div className="flex size-16 items-center justify-center rounded-lg border border-divine-gold/35 bg-divine-gold/10 text-divine-gold">
            <LockKeyhole className="size-8" aria-hidden="true" />
          </div>
          <h2 className="mt-6 font-serif text-3xl font-semibold text-platinum">
            神紋封印鎖定
          </h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            {chapter.excerpt}
          </p>
          <p className="mt-4 font-serif text-2xl font-semibold text-divine-gold">
            NT$ {chapter.price}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onUnlock}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-divine-gold px-5 text-sm font-medium text-deep-space transition hover:bg-platinum"
            >
              <LockKeyhole className="size-4" aria-hidden="true" />
              解鎖章節
            </button>
            <Link
              href="/novel/paid"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-divine-gold/35 bg-deep-space/40 px-5 text-sm font-medium text-platinum transition hover:bg-divine-gold/10"
            >
              <ShoppingBag className="size-4" aria-hidden="true" />
              購買整卷
            </Link>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            {hasReadableContent
              ? "目前為 localStorage 模擬解鎖，正式版本會改由會員權限與金流付款紀錄判斷。"
              : "正式安全模式已啟用：付費正文不會預先送到瀏覽器，需由 server 權限檢查後取得。"}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

function ChapterNavLink({
  label,
  chapter,
  direction,
}: {
  label: string;
  chapter?: Chapter;
  direction: "prev" | "next";
}) {
  if (!chapter) {
    return (
      <div className="flex h-11 items-center justify-center rounded-lg border border-platinum/10 text-sm text-muted-foreground">
        無{label}
      </div>
    );
  }

  return (
    <Link
      href={`/novel/${chapter.volumeSlug}/${chapter.slug}`}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-divine-gold/35 bg-deep-space/40 px-4 text-sm font-medium text-platinum transition hover:bg-divine-gold/10",
        direction === "prev" ? "sm:justify-start" : "sm:justify-end",
      )}
    >
      {direction === "prev" ? <ChevronLeft className="size-4" /> : null}
      {label}
      {direction === "next" ? <ChevronRight className="size-4" /> : null}
    </Link>
  );
}
