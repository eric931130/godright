"use client";

import { useEffect, useMemo, useState } from "react";

import { useReadingStorage } from "@/lib/reading/storage";

export type FavoriteType = "chapter" | "character" | "product" | "lore" | "location" | "artifact";

export type FavoriteItem = {
  id: string;
  type: FavoriteType;
  title: string;
  href: string;
  createdAt: string;
};

const favoritesKey = "godright.favorites";

function readFavorites(): FavoriteItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(favoritesKey);
    return raw ? (JSON.parse(raw) as FavoriteItem[]) : [];
  } catch {
    return [];
  }
}

function writeFavorites(items: FavoriteItem[]) {
  window.localStorage.setItem(favoritesKey, JSON.stringify(items));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setFavorites(readFavorites());
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  return useMemo(
    () => ({
      ready,
      favorites,
      isFavorite: (id: string, type: FavoriteType) =>
        favorites.some((item) => item.id === id && item.type === type),
      toggleFavorite: (item: FavoriteItem) => {
        setFavorites((current) => {
          const exists = current.some(
            (favorite) => favorite.id === item.id && favorite.type === item.type,
          );
          const next = exists
            ? current.filter(
                (favorite) => !(favorite.id === item.id && favorite.type === item.type),
              )
            : [...current, item];
          writeFavorites(next);
          return next;
        });
      },
      removeFavorite: (id: string, type: FavoriteType) => {
        setFavorites((current) => {
          const next = current.filter((item) => !(item.id === id && item.type === type));
          writeFavorites(next);
          return next;
        });
      },
    }),
    [favorites, ready],
  );
}

export function useBookshelf() {
  const reading = useReadingStorage();
  return {
    chapterIds: reading.bookshelf,
    toggleChapter: reading.toggleBookshelf,
    isSaved: reading.isInBookshelf,
    ready: reading.ready,
  };
}

export function useReadingProgress() {
  const reading = useReadingStorage();
  return {
    progress: reading.progress,
    saveProgress: reading.saveProgress,
    ready: reading.ready,
  };
}
