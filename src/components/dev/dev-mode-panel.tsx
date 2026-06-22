"use client";

import Link from "next/link";
import { LayoutGrid, PencilRuler } from "lucide-react";

import { GlassCard } from "@/components/common/glass-card";
import { useDevMode } from "@/components/dev/dev-mode-provider";
import { cn } from "@/lib/utils";

export function DevModePanel() {
  const { isDeveloper, editing, toggleEditing } = useDevMode();

  if (!isDeveloper) return null;

  return (
    <GlassCard className="gold-border p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-divine-gold">
            <PencilRuler className="size-4" aria-hidden="true" /> 開發者控制
          </p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-platinum">編輯模式</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            開啟後可在前台直接編輯內容（站台、角色、小說、電子書），編輯結果將儲存至後端。
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={editing}
          onClick={toggleEditing}
          className={cn(
            "relative inline-flex h-9 w-16 shrink-0 items-center rounded-full border transition",
            editing ? "border-divine-gold/60 bg-divine-gold/30" : "border-platinum/20 bg-deep-space/60",
          )}
        >
          <span
            className={cn(
              "inline-block size-7 rounded-full bg-divine-gold transition",
              editing ? "translate-x-8" : "translate-x-1",
            )}
          />
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <span
          className={cn(
            "inline-flex items-center rounded-md px-3 py-1.5 text-xs",
            editing ? "bg-divine-gold/15 text-divine-gold" : "bg-platinum/5 text-muted-foreground",
          )}
        >
          {editing ? "編輯模式：開啟中" : "編輯模式：關閉"}
        </span>
        <Link
          href="/admin"
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-divine-gold/30 bg-deep-space/45 px-4 text-sm text-platinum transition hover:bg-divine-gold/10"
        >
          <LayoutGrid className="size-4" aria-hidden="true" />
          GM 控制台
        </Link>
      </div>
    </GlassCard>
  );
}
