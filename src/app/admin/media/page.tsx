import { AdminShell } from "@/components/admin/admin-shell";
import { MediaLibrary } from "@/components/admin/media-library";
import { MediaUploadForm } from "@/components/admin/media-upload-form";

export default function AdminMediaPage() {
  return (
    <AdminShell
      title="媒體庫"
      description="上傳與管理首頁、角色、商品、電子書、世界觀、場地、物件與活動圖片。可搜尋、分類篩選、複製 URL，未使用圖片可二次確認後清理。"
    >
      <MediaUploadForm />
      <MediaLibrary />
    </AdminShell>
  );
}
