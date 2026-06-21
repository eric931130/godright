import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  DollarSign,
  Eye,
  Mail,
  ShoppingCart,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";

import { AdminShell } from "@/components/admin/admin-shell";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { GlassCard } from "@/components/common/glass-card";
import { getDashboardData, type TopItem } from "@/lib/analytics/analytics-service";

export const dynamic = "force-dynamic";

function formatTwd(value: number) {
  return `NT$ ${value.toLocaleString("zh-TW")}`;
}

function TopList({ title, items, emptyHint }: { title: string; items: TopItem[]; emptyHint: string }) {
  return (
    <GlassCard className="p-5">
      <h2 className="text-lg font-semibold text-platinum">{title}</h2>
      <div className="mt-4 grid gap-2">
        {items.length === 0 ? (
          <p className="rounded-lg border border-divine-gold/15 bg-platinum/5 px-4 py-3 text-sm text-muted-foreground">
            {emptyHint}
          </p>
        ) : (
          items.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-divine-gold/15 bg-platinum/5 px-4 py-2.5 text-sm"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="text-xs font-semibold text-divine-gold">#{index + 1}</span>
                <span className="truncate text-muted-foreground">{item.label}</span>
              </span>
              <span className="shrink-0 font-semibold text-platinum">{item.count.toLocaleString("zh-TW")}</span>
            </div>
          ))
        )}
      </div>
    </GlassCard>
  );
}

export default async function AdminAnalyticsPage() {
  const data = await getDashboardData();

  return (
    <AdminShell
      title="數據分析"
      description="即時統計站內事件與訂單，掌握流量、閱讀、轉換與營收。事件由前台節流上報至 Firestore。"
    >
      {!data.configured ? (
        <GlassCard className="border-divine-gold/30 p-5">
          <p className="text-sm leading-7 text-muted-foreground">
            <span className="font-semibold text-divine-gold">尚未連接事件資料庫。</span>
            目前顯示的訂單為 mock 統計；流量與轉換事件需設定 Firebase Admin 環境變數
            （<code className="text-platinum">FIREBASE_CLIENT_EMAIL</code> /{" "}
            <code className="text-platinum">FIREBASE_PRIVATE_KEY</code>）並部署 Firestore 規則後才會累積。
          </p>
        </GlassCard>
      ) : null}

      <section className="space-y-3">
        <p className="text-xs uppercase tracking-[0.24em] text-divine-gold">今日</p>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <AdminStatCard icon={<Users className="size-5" />} label="今日訪客" value={data.today.uniqueVisitors} detail="不重複訪客（含匿名）" />
          <AdminStatCard icon={<Eye className="size-5" />} label="今日頁面瀏覽" value={data.today.pageViews} detail="page_view 事件" />
          <AdminStatCard icon={<UserPlus className="size-5" />} label="今日註冊" value={data.signupsToday} detail="users 建立數" />
          <AdminStatCard icon={<BookOpen className="size-5" />} label="今日章節閱讀" value={data.today.chapterViews} detail="chapter_view 事件" />
        </div>
      </section>

      <section className="space-y-3">
        <p className="text-xs uppercase tracking-[0.24em] text-divine-gold">本週（近 7 天）</p>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <AdminStatCard icon={<Users className="size-5" />} label="本週訪客" value={data.week.uniqueVisitors} detail="不重複訪客" />
          <AdminStatCard icon={<UserPlus className="size-5" />} label="本週註冊" value={data.signupsWeek} detail="新會員" />
          <AdminStatCard icon={<BookOpen className="size-5" />} label="章節閱讀" value={data.week.chapterViews} detail="chapter_view" />
          <AdminStatCard icon={<CheckCircle2 className="size-5" />} label="章節完成率" value={`${data.week.completionRate}%`} detail="完成 / 開始閱讀" />
          <AdminStatCard icon={<Eye className="size-5" />} label="商品瀏覽" value={data.week.productViews} detail="product_view" />
          <AdminStatCard icon={<ShoppingCart className="size-5" />} label="加入購物車" value={data.week.addToCart} detail="add_to_cart" />
          <AdminStatCard icon={<ShoppingCart className="size-5" />} label="結帳開始" value={data.week.checkoutStarts} detail="checkout_start" />
          <AdminStatCard icon={<Mail className="size-5" />} label="電子報訂閱" value={data.week.newsletterSignups} detail="newsletter_signup" />
        </div>
      </section>

      <section className="space-y-3">
        <p className="text-xs uppercase tracking-[0.24em] text-divine-gold">營收與轉換</p>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <AdminStatCard icon={<DollarSign className="size-5" />} label="購買成功數" value={data.purchases} detail="已付款訂單" />
          <AdminStatCard icon={<DollarSign className="size-5" />} label="營收統計" value={formatTwd(data.revenue)} detail="已付款訂單總額" />
          <AdminStatCard icon={<TrendingUp className="size-5" />} label="付費轉換率" value={`${data.conversionRate}%`} detail="購買 / 本週訪客" />
          <AdminStatCard icon={<BarChart3 className="size-5" />} label="訂單總數" value={data.orders} detail="含未付款" />
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <TopList title="最熱門章節" items={data.topChapters} emptyHint="尚無章節閱讀事件。" />
        <TopList title="最熱門角色" items={data.topCharacters} emptyHint="尚無角色瀏覽事件。" />
        <TopList title="最熱門商品" items={data.topProducts} emptyHint="尚無商品瀏覽事件。" />
        <TopList title="最常點擊名詞註解" items={data.topGlossary} emptyHint="尚無名詞註解點擊事件。" />
      </div>
    </AdminShell>
  );
}
