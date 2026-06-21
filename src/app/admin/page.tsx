import Link from "next/link";
import { BookOpen, DollarSign, Mail, Package, Plus, ScrollText, Users } from "lucide-react";

import { AdminShell } from "@/components/admin/admin-shell";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { DivineButton } from "@/components/common/divine-button";
import { GlassCard } from "@/components/common/glass-card";
import { characters } from "@/data/characters";
import { chapters } from "@/data/novel";
import { shopProducts } from "@/data/shop";
import { recentActivities } from "@/data/account";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { orderService } from "@/services/orderService";

export default async function AdminDashboardPage() {
  const orders = await orderService.list();
  const freeCount = chapters.filter((chapter) => chapter.isFree).length;
  const paidCount = chapters.filter((chapter) => chapter.isPaid).length;

  return (
    <AdminShell
      title="後台總覽"
      description="管理小說章節、商品、角色、百科、訂單與訂閱名單。第一版使用 mock data，服務層已預留 Supabase 切換。"
      actions={
        <div className="flex flex-wrap gap-2">
          <DivineButton href="/admin/chapters/new">
            <Plus className="size-4" />
            新增章節
          </DivineButton>
          <DivineButton href="/admin/products/new" variant="outline">新增商品</DivineButton>
        </div>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard icon={<BookOpen className="size-5" />} label="總章節數" value={chapters.length} detail="含免費與付費章節" />
        <AdminStatCard icon={<ScrollText className="size-5" />} label="免費章節" value={freeCount} detail="公開閱讀內容" />
        <AdminStatCard icon={<DollarSign className="size-5" />} label="付費章節" value={paidCount} detail="等待會員與金流解鎖" />
        <AdminStatCard icon={<Package className="size-5" />} label="商品數" value={shopProducts.length} detail="電子書與數位商品" />
        <AdminStatCard icon={<Users className="size-5" />} label="角色數" value={characters.length} detail="圖鑑核心資料" />
        <AdminStatCard icon={<Mail className="size-5" />} label="訂閱人數" value="1,248" detail="mock newsletter list" />
        <AdminStatCard icon={<Package className="size-5" />} label="訂單數" value={orders.length} detail="mock checkout 訂單" />
        <AdminStatCard icon={<DollarSign className="size-5" />} label="本月銷售額" value="NT$ 48,600" detail="mock revenue" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <GlassCard className="p-5">
          <h2 className="text-lg font-semibold text-platinum">最新活動</h2>
          <div className="mt-4 grid gap-3">
            {recentActivities.map((activity) => (
              <div key={activity} className="rounded-lg border border-divine-gold/15 bg-platinum/5 px-4 py-3 text-sm text-muted-foreground">
                {activity}
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <h2 className="text-lg font-semibold text-platinum">快速新增</h2>
          <div className="mt-4 grid gap-3">
            {[
              ["新增章節", "/admin/chapters/new"],
              ["新增商品", "/admin/products/new"],
              ["新增角色", "/admin/characters/new"],
              ["管理消息", "/admin/news"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={cn(buttonVariants({ variant: "outline" }), "justify-start border-divine-gold/25 bg-deep-space/35")}
              >
                {label}
              </Link>
            ))}
          </div>
        </GlassCard>
      </div>
    </AdminShell>
  );
}
