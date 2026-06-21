import { AdminShell } from "@/components/admin/admin-shell";
import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <AdminShell
      title="新增商品"
      description="建立電子書與數位商品資料；圖片與檔案欄位先保存 placeholder，未來可接 Supabase Storage。"
    >
      <ProductForm />
    </AdminShell>
  );
}
