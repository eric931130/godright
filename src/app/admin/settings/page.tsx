import { AdminShell } from "@/components/admin/admin-shell";
import { GlassCard } from "@/components/common/glass-card";

const settings = [
  ["資料來源", process.env.NEXT_PUBLIC_DATA_SOURCE ?? "mock"],
  ["Mock Admin", process.env.NEXT_PUBLIC_MOCK_ADMIN ?? "true"],
  ["付款 Provider", process.env.PAYMENT_PROVIDER ?? "mock"],
  ["網站 URL", process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"],
];

export default function AdminSettingsPage() {
  return (
    <AdminShell
      title="網站設定"
      description="集中顯示目前環境與後續 Supabase、金流、Storage 串接設定。敏感金鑰不會顯示在前端。"
    >
      <GlassCard className="p-5">
        <div className="grid gap-3">
          {settings.map(([label, value]) => (
            <div key={label} className="grid gap-2 rounded-lg border border-divine-gold/15 bg-platinum/5 p-4 sm:grid-cols-[180px_1fr]">
              <p className="text-sm font-medium text-divine-gold">{label}</p>
              <p className="break-all text-sm text-muted-foreground">{value}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </AdminShell>
  );
}
