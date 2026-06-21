"use client";

import { useEffect, useMemo, useState } from "react";

import type { Bookmark, ReadingProgress } from "@/data/novel";

const bookshelfKey = "godright.bookshelf";
const bookmarksKey = "godright.bookmarks";
const progressKey = "godright.readingProgress";
const unlocksKey = "godright.mockUnlocks";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function useReadingStorage() {
  const [bookshelf, setBookshelf] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [progress, setProgress] = useState<ReadingProgress[]>([]);
  const [unlocks, setUnlocks] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setBookshelf(readJson<string[]>(bookshelfKey, []));
      setBookmarks(readJson<Bookmark[]>(bookmarksKey, []));
      setProgress(readJson<ReadingProgress[]>(progressKey, []));
      setUnlocks(readJson<string[]>(unlocksKey, []));
      setReady(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const api = useMemo(
    () => ({
      ready,
      bookshelf,
      bookmarks,
      progress,
      unlocks,
      isInBookshelf: (chapterId: string) => bookshelf.includes(chapterId),
      isBookmarked: (chapterId: string) =>
        bookmarks.some((bookmark) => bookmark.chapterId === chapterId),
      isUnlocked: (chapterId: string) => unlocks.includes(chapterId),
      toggleBookshelf: (chapterId: string) => {
        setBookshelf((current) => {
          const next = current.includes(chapterId)
            ? current.filter((id) => id !== chapterId)
            : [...current, chapterId];
          writeJson(bookshelfKey, next);
          return next;
        });
      },
      toggleBookmark: (bookmark: Bookmark) => {
        setBookmarks((current) => {
          const exists = current.some((item) => item.chapterId === bookmark.chapterId);
          const next = exists
            ? current.filter((item) => item.chapterId !== bookmark.chapterId)
            : [...current, bookmark];
          writeJson(bookmarksKey, next);
          return next;
        });
      },
      saveProgress: (item: ReadingProgress) => {
        setProgress((current) => {
          const next = [
            ...current.filter((progressItem) => progressItem.chapterId !== item.chapterId),
            item,
          ];
          writeJson(progressKey, next);
          return next;
        });
      },
      mockUnlockChapter: (chapterId: string) => {
        setUnlocks((current) => {
          const next = current.includes(chapterId) ? current : [...current, chapterId];
          writeJson(unlocksKey, next);
          return next;
        });
      },
    }),
    [bookshelf, bookmarks, progress, ready, unlocks],
  );

  return api;
}
