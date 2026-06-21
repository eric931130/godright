import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { AdminShell } from "@/components/admin/admin-shell";

type AdminUserDetailPageProps = {
  params: Promise<{ uid: string }>;
};

export default async function AdminUserDetailPage({ params }: AdminUserDetailPageProps) {
  const { uid } = await params;

  return (
    <AdminShell
      title="使用者詳情"
      description="此頁保留給正式 Firestore 詳情視圖，後續會顯示購買紀錄、閱讀進度、收藏與手動解鎖紀錄。"
    >
      <GlassCard className="p-6">
        <Badge>Lookup</Badge>
        <h2 className="mt-4 text-2xl font-semibold text-platinum">查詢目標：{uid}</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          目前可先在使用者管理頁直接搜尋。正式串接後，此頁會從
          <code className="mx-1 rounded bg-deep-space/70 px-1.5 py-0.5 text-divine-gold">
            /api/admin/users/[uid]
          </code>
          讀取完整 profile，並顯示付費章節、VIP、訂單、停權與 audit log。
        </p>
      </GlassCard>
    </AdminShell>
  );
}
