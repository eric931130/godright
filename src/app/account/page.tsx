import { Badge } from "@/components/common/badge";
import { DivineButton } from "@/components/common/divine-button";
import { GlassCard } from "@/components/common/glass-card";
import { membershipTiers, mockOrders, recentActivities, userBadges } from "@/data/account";

export default function AccountPage() {
  const tier = membershipTiers[1];

  return (
    <div className="site-container py-10 sm:py-14">
      <GlassCard className="p-6 sm:p-8">
        <Badge>Member Center</Badge>
        <h1 className="mt-4 font-serif text-4xl text-platinum sm:text-6xl">會員中心</h1>
        <p className="mt-4 text-muted-foreground">天命讀者 · reader@godright.example.com</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Badge tone="purple">{tier.name}</Badge>
          <Badge>{tier.badge}</Badge>
        </div>
      </GlassCard>

      <section className="grid gap-4 py-10 md:grid-cols-4">
        {["閱讀進度 86%", "已收藏角色 5", "已收藏章節 3", "已購買電子書 2"].map((item) => (
          <GlassCard key={item} className="p-5 font-serif text-xl text-platinum">{item}</GlassCard>
        ))}
      </section>

      <section className="grid gap-6 py-10 lg:grid-cols-2">
        <GlassCard className="p-6">
          <h2 className="font-serif text-2xl text-platinum">會員等級</h2>
          <div className="mt-5 grid gap-4">
            {membershipTiers.map((item) => (
              <div key={item.id} className="rounded-lg border border-platinum/10 bg-deep-space/45 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-serif text-lg text-platinum">{item.name}</span>
                  <span className="size-5 rounded-full" style={{ backgroundColor: item.color }} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{item.benefits.join("、")}</p>
                <button className="mt-3 text-sm text-divine-gold">升級按鈕</button>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-6">
          <h2 className="font-serif text-2xl text-platinum">徽章牆</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {userBadges.map((badge) => (
              <div key={badge.id} className="rounded-lg border border-platinum/10 bg-deep-space/45 p-3">
                <span className="mb-2 block size-4 rounded-full" style={{ backgroundColor: badge.color }} />
                <p className="font-medium text-platinum">{badge.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{badge.description}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="grid gap-6 py-10 lg:grid-cols-2">
        <GlassCard className="p-6">
          <h2 className="font-serif text-2xl text-platinum">最近活動</h2>
          <div className="mt-4 grid gap-2 text-sm text-muted-foreground">{recentActivities.map((item) => <span key={item}>{item}</span>)}</div>
        </GlassCard>
        <GlassCard className="p-6">
          <h2 className="font-serif text-2xl text-platinum">訂閱偏好</h2>
          <p className="mt-4 text-sm text-muted-foreground">小說更新、電子書上架、活動通知、新角色公開。</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <DivineButton href="/account/bookshelf" variant="outline">我的書架</DivineButton>
            <DivineButton href="/account/favorites" variant="outline">我的收藏</DivineButton>
            <DivineButton href="/account/orders" variant="outline">我的訂單 {mockOrders.length}</DivineButton>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
