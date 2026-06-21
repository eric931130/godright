import Link from "next/link";
import type { ReactNode } from "react";
import {
  BarChart3,
  BookOpen,
  Boxes,
  Gem,
  Handshake,
  Home,
  Images,
  Layers,
  LayoutDashboard,
  Mail,
  Megaphone,
  Newspaper,
  Package,
  Settings,
  ShieldAlert,
  Sparkles,
  TicketPercent,
  TrendingUp,
  Users,
} from "lucide-react";

import { DivineButton } from "@/components/common/divine-button";
import { GlassCard } from "@/components/common/glass-card";
import { getAdminSecondFactorSession } from "@/lib/auth/verify-admin-session";
import { cn } from "@/lib/utils";

const adminNav = [
  { title: "儀表板", href: "/admin", icon: LayoutDashboard },
  { title: "數據分析", href: "/admin/analytics", icon: BarChart3 },
  { title: "角色分析", href: "/admin/analytics/characters", icon: TrendingUp },
  { title: "商品分析", href: "/admin/analytics/products", icon: TrendingUp },
  { title: "電子書分析", href: "/admin/analytics/ebooks", icon: TrendingUp },
  { title: "章節", href: "/admin/chapters", icon: BookOpen },
  { title: "商品", href: "/admin/products", icon: Package },
  { title: "組合包", href: "/admin/bundles", icon: Layers },
  { title: "優惠碼", href: "/admin/coupons", icon: TicketPercent },
  { title: "角色", href: "/admin/characters", icon: Users },
  { title: "使用者", href: "/admin/users", icon: Users },
  { title: "手動解鎖", href: "/admin/manual-unlock", icon: ShieldAlert },
  { title: "閱讀大廳", href: "/admin/hall", icon: Newspaper },
  { title: "活動管理", href: "/admin/campaigns", icon: Megaphone },
  { title: "媒體庫", href: "/admin/media", icon: Images },
  { title: "世界觀", href: "/admin/lore", icon: Sparkles },
  { title: "場地", href: "/admin/locations", icon: Home },
  { title: "物件", href: "/admin/artifacts", icon: Gem },
  { title: "最新消息", href: "/admin/news", icon: Newspaper },
  { title: "訂閱名單", href: "/admin/newsletter", icon: Mail },
  { title: "合作邀約", href: "/admin/collaboration-inquiries", icon: Handshake },
  { title: "訂單", href: "/admin/orders", icon: Boxes },
  { title: "設定", href: "/admin/settings", icon: Settings },
];

type AdminShellProps = {
  title: string;
  description: string;
  children: ReactNode;
  actions?: ReactNode;
};

export async function AdminShell({ title, description, children, actions }: AdminShellProps) {
  const session = await getAdminSecondFactorSession();

  if (!session.verified) {
    return (
      <main className="site-container py-16">
        <GlassCard className="mx-auto max-w-2xl p-8 text-center">
          <ShieldAlert className="mx-auto mb-4 size-10 text-divine-gold" />
          <p className="text-sm uppercase tracking-[0.28em] text-divine-gold">Admin Guard</p>
          <h1 className="mt-3 text-3xl font-semibold text-platinum">需要開發者二次驗證</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            請先使用 Firebase 開發者帳號登入，並完成三次神權封印驗證後進入後台。
          </p>
          <DivineButton className="mt-6" href="/admin-verify">
            前往驗證
          </DivineButton>
        </GlassCard>
      </main>
    );
  }

  return (
    <main className="site-container py-8 sm:py-10">
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <GlassCard className="h-fit p-3 lg:sticky lg:top-24">
          <div className="px-3 py-2">
            <p className="text-xs uppercase tracking-[0.24em] text-divine-gold">CMS</p>
            <p className="mt-1 text-sm font-semibold text-platinum">開發者後台</p>
          </div>
          <nav className="mt-2 grid gap-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition",
                    "hover:bg-divine-gold/10 hover:text-platinum",
                  )}
                  href={item.href}
                >
                  <Icon className="size-4 text-divine-gold" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </GlassCard>

        <section className="min-w-0 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-divine-gold">Godright Admin</p>
              <h1 className="mt-2 text-3xl font-semibold text-platinum sm:text-4xl">{title}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{description}</p>
            </div>
            {actions}
          </div>
          {children}
        </section>
      </div>
    </main>
  );
}
