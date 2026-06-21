import { AdminShell } from "@/components/admin/admin-shell";
import { GlassCard } from "@/components/common/glass-card";

export default function AdminUnlocksPage() {
  return (
    <AdminShell
      title="解鎖紀錄"
      description="集中查看人工解鎖、取消解鎖、VIP 授權與付費權限補救紀錄。"
    >
      <GlassCard className="p-6">
        <p className="text-sm leading-7 text-muted-foreground">
          正式資料來源為 Firestore `manualUnlockLogs` 與 `adminAuditLogs`。API `/api/admin/audit-log`
          已建立，會驗證 Firebase ID token、admin custom claim 與二次驗證 cookie。
        </p>
      </GlassCard>
    </AdminShell>
  );
}
