import { AdminShell } from "@/components/admin/admin-shell";
import { ModerationForm } from "@/components/admin/moderation-form";
import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { listRecentReports } from "@/lib/admin/moderation";

export const dynamic = "force-dynamic";

export default async function AdminModerationPage() {
  const reports = await listRecentReports();

  return (
    <AdminShell
      title="社群治理"
      description="檢視讀者檢舉，並依使用者 10 位 UID 執行禁言或停權。懲處狀態寫入使用者資料；大廳改接 Firestore 後由安全規則強制執行。"
    >
      <ModerationForm />

      <GlassCard className="overflow-x-auto p-0">
        <table className="w-full min-w-[820px] text-sm">
          <thead>
            <tr className="border-b border-divine-gold/20 text-left text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <th className="px-4 py-3">時間</th>
              <th className="px-4 py-3">類型</th>
              <th className="px-4 py-3">對象</th>
              <th className="px-4 py-3">被檢舉 UID</th>
              <th className="px-4 py-3">原因</th>
              <th className="px-4 py-3">狀態</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">
                  尚無檢舉（或 Firebase 環境未設定）。
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr key={report.id} className="border-b border-platinum/5 align-top last:border-0">
                  <td className="px-4 py-3 text-muted-foreground">
                    {report.createdAt ? new Date(report.createdAt).toLocaleString("zh-TW") : "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{report.targetType === "comment" ? "留言" : "貼文"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{report.targetId}</td>
                  <td className="px-4 py-3 font-medium text-platinum">{report.targetPublicUid ?? "—"}</td>
                  <td className="max-w-sm px-4 py-3 text-muted-foreground"><p className="line-clamp-3">{report.reason}</p></td>
                  <td className="px-4 py-3"><Badge tone={report.status === "pending" ? "gold" : "purple"}>{report.status}</Badge></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </GlassCard>
    </AdminShell>
  );
}
