import { AdminShell } from "@/components/admin/admin-shell";
import { CampaignForm } from "@/components/admin/campaign-form";
import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { listCampaigns } from "@/lib/campaigns/campaigns";

export const dynamic = "force-dynamic";

const typeLabels: Record<string, string> = {
  announcement_bar: "公告列",
  popup: "彈窗",
  hero_banner: "頁面橫幅",
  countdown: "倒數計時",
  shop_banner: "商城橫幅",
};

function formatWindow(startsAt?: string, endsAt?: string) {
  const fmt = (value?: string) => (value ? new Date(value).toLocaleDateString("zh-TW") : "—");
  if (!startsAt && !endsAt) return "長期";
  return `${fmt(startsAt)} ~ ${fmt(endsAt)}`;
}

export default async function AdminCampaignsPage() {
  const campaigns = await listCampaigns();

  return (
    <AdminShell title="活動管理" description="管理全站公告列、彈窗、橫幅與倒數活動。依時間、頁面與優先順序顯示。彈窗以 localStorage 記錄已看過。">
      <CampaignForm />

      <GlassCard className="overflow-x-auto p-0">
        <table className="w-full min-w-[820px] text-sm">
          <thead>
            <tr className="border-b border-divine-gold/20 text-left text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <th className="px-4 py-3">標題</th>
              <th className="px-4 py-3">類型</th>
              <th className="px-4 py-3">頁面</th>
              <th className="px-4 py-3 text-right">優先</th>
              <th className="px-4 py-3">期間</th>
              <th className="px-4 py-3">狀態</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">尚無活動。</td>
              </tr>
            ) : (
              campaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b border-platinum/5 last:border-0">
                  <td className="px-4 py-3 font-medium text-platinum">{campaign.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{typeLabels[campaign.type] ?? campaign.type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{campaign.targetPages?.length ? campaign.targetPages.join(", ") : "全站"}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{campaign.priority}</td>
                  <td className="px-4 py-3 text-muted-foreground">{formatWindow(campaign.startsAt, campaign.endsAt)}</td>
                  <td className="px-4 py-3">
                    <Badge tone={campaign.isActive ? "gold" : "purple"}>{campaign.isActive ? "啟用中" : "停用"}</Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </GlassCard>
    </AdminShell>
  );
}
