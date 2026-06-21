export type UserRole = "guest" | "user" | "paid_user" | "vip" | "admin";

export const roleRank: Record<UserRole, number> = {
  guest: 0,
  user: 1,
  paid_user: 2,
  vip: 3,
  admin: 4,
};

export const rolePermissions: Record<UserRole, string[]> = {
  guest: ["read:public", "read:free_chapters", "view:products"],
  user: [
    "read:public",
    "read:free_chapters",
    "write:own_profile",
    "write:own_bookshelf",
    "write:own_favorites",
    "write:hall_posts",
  ],
  paid_user: [
    "read:public",
    "read:free_chapters",
    "read:unlocked_chapters",
    "download:purchased_products",
    "write:own_profile",
    "write:hall_posts",
  ],
  vip: [
    "read:public",
    "read:free_chapters",
    "read:unlocked_chapters",
    "read:vip_content",
    "download:purchased_products",
    "write:own_profile",
    "write:hall_posts",
  ],
  admin: ["admin:all"],
};

export function roleAtLeast(role: UserRole, minimum: UserRole) {
  return roleRank[role] >= roleRank[minimum];
}

export function hasPermission(role: UserRole, permission: string) {
  return role === "admin" || rolePermissions[role].includes(permission);
}
