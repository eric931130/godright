import { AdminShell } from "@/components/admin/admin-shell";
import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { listInquiries } from "@/lib/collaboration/inquiries";
import { inquiryTypeLabels } from "@/lib/collaboration/inquiry-types";

export const dynamic = "force-dynamic";

const statusLabels: Record<string, string> = {
  new: "新進",
  reviewing: "處理中",
  replied: "已回覆",
  closed: "已結案",
};

export default async function AdminInquiriesPage() {
  const inquiries = await listInquiries();

  return (
    <AdminShell title="合作邀約收件匣" description="檢視透過合作邀約頁送出的洽詢。資料僅 admin 可讀。">
      <GlassCard className="overflow-x-auto p-0">
        <table className="w-full min-w-[860px] text-sm">
          <thead>
            <tr className="border-b border-divine-gold/20 text-left text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <th className="px-4 py-3">時間</th>
              <th className="px-4 py-3">姓名 / 單位</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">類型</th>
              <th className="px-4 py-3">內容</th>
              <th className="px-4 py-3">狀態</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">
                  尚無合作邀約（或 Firebase 環境未設定）。
                </td>
              </tr>
            ) : (
              inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="border-b border-platinum/5 align-top last:border-0">
                  <td className="px-4 py-3 text-muted-foreground">
                    {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleDateString("zh-TW") : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-platinum">{inquiry.name}</p>
                    {inquiry.organization ? <p className="text-xs text-muted-foreground">{inquiry.organization}</p> : null}
                  </td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${inquiry.email}`} className="text-moon-blue hover:text-platinum">{inquiry.email}</a>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{inquiryTypeLabels[inquiry.inquiryType]}</td>
                  <td className="max-w-sm px-4 py-3 text-muted-foreground">
                    <p className="line-clamp-3">{inquiry.message}</p>
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={inquiry.status === "new" ? "gold" : "purple"}>{statusLabels[inquiry.status] ?? inquiry.status}</Badge>
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
