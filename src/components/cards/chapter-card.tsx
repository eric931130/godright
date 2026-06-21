import Link from "next/link";
import { Clock, LockKeyhole, ScrollText } from "lucide-react";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import type { Chapter } from "@/data/mock/chapters";

type ChapterCardProps = {
  chapter: Chapter;
};

export function ChapterCard({ chapter }: ChapterCardProps) {
  const locked = chapter.status !== "免費";

  return (
    <GlassCard interactive className="h-full p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs text-moon-blue">{chapter.volume}</p>
          <h3 className="mt-2 font-serif text-lg font-semibold text-platinum">
            第 {chapter.number} 章｜{chapter.title}
          </h3>
        </div>
        <Badge tone={locked ? "purple" : "gold"}>{chapter.status}</Badge>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {chapter.excerpt}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Clock className="size-3.5 text-divine-gold" aria-hidden="true" />
          {chapter.readingTime}
        </span>
        <span>{chapter.publishedAt}</span>
      </div>
      <Link
        href="/novel"
        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-divine-gold transition hover:text-platinum"
      >
        {locked ? (
          <LockKeyhole className="size-4" aria-hidden="true" />
        ) : (
          <ScrollText className="size-4" aria-hidden="true" />
        )}
        前往閱讀
      </Link>
    </GlassCard>
  );
}
