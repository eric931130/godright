import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { mockOrders } from "@/data/account";

export default function AccountOrdersPage() {
  return (
    <div className="site-container py-10 sm:py-14">
      <SectionTitle eyebrow="Orders" title="我的訂單" description="目前為 mock 訂單，未來由 purchases 與 orders tables 提供。" />
      <div className="mt-8 grid gap-4">
        {mockOrders.map((order) => (
          <GlassCard key={order.id} className="p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-serif text-xl text-platinum">{order.id}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{order.date} · {order.items.join("、")}</p>
              </div>
              <div className="text-right">
                <p className="text-divine-gold">NT$ {order.total.toLocaleString("zh-TW")}</p>
                <p className="text-sm text-muted-foreground">{order.status}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
