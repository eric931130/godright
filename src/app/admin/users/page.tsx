import { AdminShell } from "@/components/admin/admin-shell";
import { AdminUserSearch } from "@/components/admin/admin-user-search";

export default function AdminUsersPage() {
  return (
    <AdminShell
      title="使用者管理"
      description="可用 10 位 Public UID、Firebase UID 或 Email 搜尋使用者，協助檢查會員等級、付費狀態與停權狀態。"
    >
      <AdminUserSearch />
    </AdminShell>
  );
}
