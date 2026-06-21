export type ManualUnlockType = "chapter" | "volume" | "ebook" | "product" | "vip";

export type ManualUnlockForm = {
  targetUserInput: string;
  unlockType: ManualUnlockType;
  targetId: string;
  reason: string;
  expiresAt?: string;
};

export type ManualUnlockLog = {
  id: string;
  adminUid: string;
  targetFirebaseUid: string;
  targetPublicUid: string;
  unlockType: ManualUnlockType;
  targetId: string;
  reason: string;
  createdAt: unknown;
  expiresAt?: unknown;
  action: "grant" | "revoke";
};

export type AdminAuditLog = {
  id: string;
  adminUid: string;
  action:
    | "manual_unlock"
    | "manual_revoke"
    | "update_character"
    | "update_chapter"
    | "update_product"
    | "update_site_content"
    | "delete_hall_post"
    | "ban_user"
    | "unban_user";
  targetType: string;
  targetId: string;
  before?: unknown;
  after?: unknown;
  reason?: string;
  createdAt: unknown;
};
