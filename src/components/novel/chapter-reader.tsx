"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  BookmarkIcon,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  Crown,
  Gift,
  Heart,
  Library,
  LockKeyhole,
  Minus,
  Plus,
  Share2,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";

import { Badge } from "@/components/common/badge";
import { DivineButton } from "@/components/common/divine-button";
import { GlassCard } from "@/components/common/glass-card";
import { EditableText } from "@/components/dev/editable-text";
import { EditableParagraphs } from "@/components/dev/editable-paragraphs";
import { siteConfig } from "@/config/site";
import type { Chapter } from "@/data/novel";
import { useFavorites } from "@/lib/account/storage";
import { useReadingStorage } from "@/lib/reading/storage";
import { cn } from "@/lib/utils";

export type ChapterLockInfo = {
  appearingCharacters: { slug: string; name: string }[];
  keyLore: string[];
};

type ChapterReaderProps = {
  chapter: Chapter;
  previous?: Chapter;
  next?: Chapter;
  lockInfo?: ChapterLockInfo;
};

export function ChapterReader({ chapter, previous, next, lockInfo }: ChapterReaderProps) {
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

          <EditableText
            as="h1"
            contentKey={`chapter.${chapter.id}.title`}
            value={chapter.title}
            className="block font-serif text-3xl font-semibold leading-tight text-platinum sm:text-5xl"
          />
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
              <EditableParagraphs
                contentKey={`chapter.${chapter.id}.content`}
                paragraphs={chapter.content}
                editable={chapter.isFree}
                paragraphClassName="mb-7"
              />
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
              lockInfo={lockInfo}
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
  lockInfo,
  onUnlock,
  hasReadableContent,
}: {
  chapter: Chapter;
  lockInfo?: ChapterLockInfo;
  onUnlock: () => void;
  hasReadableContent: boolean;
}) {
  const favorites = useFavorites();
  const wishlisted = favorites.isFavorite(chapter.id, "chapter");
  const teaser = chapter.previewText ?? chapter.excerpt;
  const reportHref = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
    `付費異常回報 - ${chapter.title}`,
  )}`;

  const toggleWishlist = () => {
    favorites.toggleFavorite({
      id: chapter.id,
      type: "chapter",
      title: chapter.title,
      href: `/novel/${chapter.volumeSlug}/${chapter.slug}`,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <GlassCard className="mt-8 overflow-hidden p-0">
      <div className="relative p-6 sm:p-10">
        <div className="seal-ring animate-orbit absolute -right-6 -top-6 size-48 opacity-40" aria-hidden="true" />
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-lg border border-divine-gold/35 bg-divine-gold/10 text-divine-gold">
              <LockKeyhole className="size-6" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-divine-gold">付費章節 · 神紋封印</p>
              <h2 className="font-serif text-2xl font-semibold text-platinum sm:text-3xl">{chapter.title}</h2>
            </div>
          </div>

          {/* 精彩片段預覽（僅短 previewText，不含正文） */}
          <div className="scroll-reading mt-6 rounded-lg border border-divine-gold/20 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-divine-gold">精彩片段</p>
            <p className="mt-3 text-base leading-8 text-platinum/90">{teaser}</p>
          </div>

          {/* 章節資訊 */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-platinum/10 bg-deep-space/45 p-4">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="size-3.5 text-divine-gold" aria-hidden="true" /> 本章出場角色
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {lockInfo?.appearingCharacters.length ? (
                  lockInfo.appearingCharacters.map((character) => (
                    <Link
                      key={character.slug}
                      href={`/characters/${character.slug}`}
                      className="rounded-md border border-divine-gold/25 px-2 py-1 text-xs text-platinum hover:bg-divine-gold/10"
                    >
                      {character.name}
                    </Link>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">敬請期待</span>
                )}
              </div>
            </div>
            <div className="rounded-lg border border-platinum/10 bg-deep-space/45 p-4">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="size-3.5 text-divine-gold" aria-hidden="true" /> 重要世界觀
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {lockInfo?.keyLore.length ? (
                  lockInfo.keyLore.map((lore) => (
                    <span key={lore} className="rounded-md border border-platinum/15 px-2 py-1 text-xs text-muted-foreground">
                      {lore}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </div>
            </div>
            <div className="rounded-lg border border-platinum/10 bg-deep-space/45 p-4">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="size-3.5 text-divine-gold" aria-hidden="true" /> 預估閱讀時間
              </p>
              <p className="mt-2 text-platinum">{chapter.readingTime}</p>
            </div>
          </div>

          {/* 解鎖選項 */}
          <div className="mt-7 grid gap-3 lg:grid-cols-3">
            <div className="flex flex-col rounded-lg border border-divine-gold/30 bg-divine-gold/5 p-5">
              <p className="text-sm text-muted-foreground">單章解鎖</p>
              <p className="mt-1 font-serif text-2xl font-semibold text-divine-gold">NT$ {chapter.price}</p>
              <button
                type="button"
                onClick={onUnlock}
                className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-divine-gold px-5 text-sm font-medium text-deep-space transition hover:bg-platinum"
              >
                <LockKeyhole className="size-4" aria-hidden="true" />
                立即解鎖
              </button>
            </div>
            <Link
              href={`/novel/${chapter.volumeSlug}`}
              className="flex flex-col rounded-lg border border-platinum/15 bg-deep-space/45 p-5 transition hover:border-divine-gold/40"
            >
              <p className="flex items-center gap-2 text-sm text-platinum">
                <ShoppingBag className="size-4 text-divine-gold" aria-hidden="true" /> 購買整卷
              </p>
              <p className="mt-1 text-xs leading-6 text-muted-foreground">一次解鎖整卷章節，閱讀更划算。</p>
              <span className="mt-auto pt-4 text-sm text-divine-gold">查看整卷 →</span>
            </Link>
            <Link
              href="/membership"
              className="flex flex-col rounded-lg border border-platinum/15 bg-deep-space/45 p-5 transition hover:border-divine-gold/40"
            >
              <p className="flex items-center gap-2 text-sm text-platinum">
                <Crown className="size-4 text-divine-gold" aria-hidden="true" /> VIP 方案
              </p>
              <p className="mt-1 text-xs leading-6 text-muted-foreground">加入會員可無限暢讀全部付費章節。</p>
              <span className="mt-auto pt-4 text-sm text-divine-gold">了解 VIP →</span>
            </Link>
          </div>

          {/* 解鎖獎勵 + 次要操作 */}
          <div className="mt-6 flex items-center gap-2 rounded-lg border border-divine-gold/20 bg-divine-gold/5 px-4 py-3 text-sm text-platinum/90">
            <Gift className="size-4 shrink-0 text-divine-gold" aria-hidden="true" />
            解鎖後可獲得閱讀任務進度 +1，並逐步點亮「七界讀者」徽章。
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={toggleWishlist}
              className={cn(
                "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-divine-gold/30 bg-deep-space/40 px-4 text-sm text-platinum transition hover:bg-divine-gold/10",
                wishlisted && "border-divine-gold/60 bg-divine-gold/10 text-divine-gold",
              )}
            >
              <Heart className="size-4" aria-hidden="true" />
              {wishlisted ? "已加入願望清單" : "加入願望清單"}
            </button>
            <a
              href={reportHref}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-sm text-muted-foreground transition hover:text-platinum"
            >
              <AlertCircle className="size-4" aria-hidden="true" />
              付費異常回報
            </a>
          </div>

          <p className="mt-5 text-xs text-muted-foreground">
            {hasReadableContent
              ? "目前為 localStorage 模擬解鎖，正式版本會改由會員權限與金流付款紀錄判斷。"
              : "安全模式：付費正文不會預先送到瀏覽器，需由 server 權限檢查後取得。"}
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
