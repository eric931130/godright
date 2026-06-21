import { AdminShell } from "@/components/admin/admin-shell";
import { ManualUnlockForm } from "@/components/admin/manual-unlock-form";

export default function AdminManualUnlockPage() {
  return (
    <AdminShell
      title="手動解鎖付費權限"
      description="用於付款 webhook 異常、客服補救或 VIP 臨時授權。所有 grant/revoke 都會寫入 manualUnlockLogs 與 adminAuditLogs。"
    >
      <ManualUnlockForm />
    </AdminShell>
  );
}
