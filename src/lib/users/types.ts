import type { UserRole } from "@/lib/auth/roles";

export type TimestampLike = Date | { seconds: number; nanoseconds: number };

export type Gender = "male" | "female" | "other" | "undisclosed";

export type UserProfile = {
  firebaseUid: string;
  publicUid: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  birthdate?: string;
  gender?: Gender;
  onboarded?: boolean;
  mutedUntil?: string;
  bannedUntil?: string;
  role: Exclude<UserRole, "guest">;
  createdAt: TimestampLike;
  updatedAt: TimestampLike;
  lastLoginAt?: TimestampLike;
  featuredCharacterId?: string;
  bio?: string;
  readingStats: {
    totalReadingMinutes: number;
    totalReadChapters: number;
    lastReadAt?: TimestampLike;
  };
  purchaseStats: {
    totalPaidChapters: number;
    totalSpent: number;
  };
  isBanned: boolean;
};

export type ReadingProgressRecord = {
  id: string;
  userId: string;
  chapterId: string;
  volumeId: string;
  progressPercent: number;
  lastPosition?: number;
  readingMinutes: number;
  lastReadAt: TimestampLike;
};
