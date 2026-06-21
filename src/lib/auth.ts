export type AuthRole = "guest" | "user" | "paid_user" | "vip" | "admin";

export type AuthUser = {
  id: string;
  email: string;
  role: AuthRole;
  displayName: string;
};

export function getAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isMockAdminEnabled() {
  return process.env.NEXT_PUBLIC_MOCK_ADMIN !== "false";
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  if (isMockAdminEnabled()) {
    return {
      id: "mock-admin",
      email: "admin@godright.local",
      role: "admin",
      displayName: "神權管理者",
    };
  }

  return null;
}

export async function getCurrentUserRole(): Promise<AuthRole> {
  const user = await getCurrentUser();
  return user?.role ?? "guest";
}

export function roleAtLeast(role: AuthRole, minimum: AuthRole) {
  const rank: Record<AuthRole, number> = {
    guest: 0,
    user: 1,
    paid_user: 2,
    vip: 3,
    admin: 4,
  };

  return rank[role] >= rank[minimum];
}
