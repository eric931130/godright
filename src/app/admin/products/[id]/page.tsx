import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { ProductForm } from "@/components/admin/product-form";
import { productService } from "@/services/productService";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await productService.getById(id);

  if (!product) {
    notFound();
  }

  return (
    <AdminShell
      title={`編輯商品：${product.title}`}
      description="目前共用商品表單與 mock submit；未來會將此頁接到 service.update 與 Supabase update mutation。"
    >
      <ProductForm />
    </AdminShell>
  );
}
