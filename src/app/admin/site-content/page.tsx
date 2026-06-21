import { AdminShell } from "@/components/admin/admin-shell";
import { ContentForm } from "@/components/admin/content-form";

export default function AdminSiteContentPage() {
  return (
    <AdminShell
      title="網站內容管理"
      description="管理首頁 Hero、Banner、Footer、訂閱區、活動文案與主視覺圖片設定。"
    >
      <ContentForm label="網站內容" defaultCategory="homepage" />
    </AdminShell>
  );
}
