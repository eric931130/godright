"use client";

import Link from "next/link";
import { BookOpen, Clock, Library, LockKeyhole, UnlockKeyhole } from "lucide-react";

import { Badge } from "@/components/common/badge";
import { DivineButton } from "@/components/common/divine-button";
import { GlassCard } from "@/components/common/glass-card";
import type { Chapter } from "@/data/novel";
import { useReadingStorage } from "@/lib/reading/storage";
import { cn } from "@/lib/utils";

type NovelChapterCardProps = {
  chapter: Chapter;
};

export function NovelChapterCard({ chapter }: NovelChapterCardProps) {
  const storage = useReadingStorage();
  const unlocked = chapter.isFree || storage.isUnlocked(chapter.id);
  const inBookshelf = storage.isInBookshelf(chapter.id);
  const href = `/novel/${chapter.volumeSlug}/${chapter.slug}`;

  return (
    <GlassCard interactive className="h-full p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={chapter.isFree ? "gold" : "purple"}>
              {chapter.isFree ? "免費" : "付費"}
            </Badge>
            <Badge tone={unlocked ? "blue" : "purple"}>
              {unlocked ? "已解鎖" : `未解鎖 NT$ ${chapter.price}`}
            </Badge>
          </div>
          <Link href={href}>
            <h3 className="mt-3 font-serif text-xl font-semibold text-platinum transition hover:text-divine-gold">
              {chapter.title}
            </h3>
          </Link>
          <p className="mt-2 text-xs text-moon-blue">{chapter.volume}</p>
        </div>
        {unlocked ? (
          <UnlockKeyhole className="size-5 shrink-0 text-divine-gold" aria-hidden="true" />
        ) : (
          <LockKeyhole className="size-5 shrink-0 text-dream-violet" aria-hidden="true" />
        )}
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
        {chapter.excerpt}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {chapter.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-platinum/10 bg-deep-space/40 px-2 py-1 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Clock className="size-3.5 text-divine-gold" aria-hidden="true" />
          {chapter.readingTime}
        </span>
        <span>{chapter.publishedAt}</span>
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => storage.toggleBookshelf(chapter.id)}
          className={cn(
            "inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-3 text-sm transition",
            inBookshelf
              ? "border-divine-gold/45 bg-divine-gold/10 text-divine-gold"
              : "border-divine-gold/25 bg-deep-space/40 text-platinum hover:bg-divine-gold/10",
          )}
        >
          <Library className="size-4" aria-hidden="true" />
          {inBookshelf ? "已加入書架" : "加入書架"}
        </button>
        <DivineButton href={href} variant={unlocked ? "gold" : "outline"} className="h-10">
          <BookOpen className="size-4" aria-hidden="true" />
          {unlocked ? "繼續閱讀" : "查看鎖定"}
        </DivineButton>
      </div>
    </GlassCard>
  );
}
