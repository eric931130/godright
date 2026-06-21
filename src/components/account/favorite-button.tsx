"use client";

import { Heart } from "lucide-react";

import { trackEvent } from "@/lib/analytics/event-tracker";
import type { FavoriteItem, FavoriteType } from "@/lib/account/storage";
import { useFavorites } from "@/lib/account/storage";
import { cn } from "@/lib/utils";

type FavoriteButtonProps = {
  id: string;
  type: FavoriteType;
  title: string;
  href: string;
  className?: string;
};

export function FavoriteButton({
  id,
  type,
  title,
  href,
  className,
}: FavoriteButtonProps) {
  const favorites = useFavorites();
  const active = favorites.isFavorite(id, type);
  const item: FavoriteItem = {
    id,
    type,
    title,
    href,
    createdAt: new Date().toISOString(),
  };

  return (
    <button
      type="button"
      onClick={() => {
        // 由未收藏切換為已收藏、且為角色時，記錄人氣事件。
        if (!active && type === "character") {
          trackEvent("character_favorite", { targetType: "character", targetId: id });
        }
        favorites.toggleFavorite(item);
      }}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-divine-gold/30 bg-deep-space/40 px-4 text-sm text-platinum transition hover:bg-divine-gold/10",
        active && "border-divine-gold/60 bg-divine-gold/10 text-divine-gold",
        className,
      )}
    >
      <Heart className="size-4" aria-hidden="true" />
      {active ? "已收藏" : "收藏"}
    </button>
  );
}
