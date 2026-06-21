import { AdminShell } from "@/components/admin/admin-shell";
import { ContentForm } from "@/components/admin/content-form";

export default function AdminHomepagePage() {
  return (
    <AdminShell
      title="首頁管理"
      description="調整首頁 Hero 背景、主視覺角色、Banner 文案、活動 Banner 與 CTA。"
    >
      <ContentForm label="首頁區塊" defaultCategory="homepage" />
    </AdminShell>
  );
}
