import { Mail } from "lucide-react";

import { AdminShell } from "@/components/admin/admin-shell";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { AdminTable } from "@/components/admin/admin-table";

const subscribers = [
  { id: "sub-001", email: "reader01@example.com", nickname: "星命讀者", topics: "小說更新, 新角色公開", createdAt: "2026-06-20", status: "active" },
  { id: "sub-002", email: "collector@example.com", nickname: "神權收藏者", topics: "電子書上架, 優惠通知", createdAt: "2026-06-19", status: "active" },
  { id: "sub-003", email: "dream@example.com", nickname: "夢印觀測者", topics: "貼圖與周邊, 活動通知", createdAt: "2026-06-18", status: "active" },
];

export default function AdminNewsletterPage() {
  return (
    <AdminShell
      title="訂閱名單管理"
      description="查看訂閱者、偏好內容與訂閱狀態；未來可接 Supabase table 與 Email service。"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <AdminStatCard icon={<Mail className="size-5" />} label="訂閱者" value={subscribers.length} detail="頁面顯示 mock list" />
        <AdminStatCard label="主要偏好" value="小說更新" detail="可用於分眾寄送" />
        <AdminStatCard label="退訂率" value="0.8%" detail="mock analytics" />
      </div>
      <AdminTable
        emptyLabel="尚無訂閱者"
        items={subscribers}
        columns={[
          { header: "Email", render: (item) => item.email },
          { header: "暱稱", render: (item) => item.nickname },
          { header: "偏好", render: (item) => item.topics },
          { header: "訂閱日期", render: (item) => item.createdAt },
          { header: "狀態", render: (item) => item.status },
        ]}
      />
    </AdminShell>
  );
}
