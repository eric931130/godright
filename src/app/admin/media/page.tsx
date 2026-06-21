import { AdminShell } from "@/components/admin/admin-shell";
import { MediaUploadForm } from "@/components/admin/media-upload-form";

export default function AdminMediaPage() {
  return (
    <AdminShell
      title="媒體庫"
      description="管理首頁、角色、商品、世界觀、場地與物件圖片。正式上傳需經 admin API 驗證並寫入 mediaAssets。"
    >
      <MediaUploadForm />
    </AdminShell>
  );
}
