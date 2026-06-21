import { Plus } from "lucide-react";

import { AdminShell } from "@/components/admin/admin-shell";
import { AdminTable } from "@/components/admin/admin-table";
import { DivineButton } from "@/components/common/divine-button";
import { productService } from "@/services/productService";

export default async function AdminProductsPage() {
  const products = await productService.list();

  return (
    <AdminShell
      title="商品管理"
      description="管理電子書、設定集、桌布、貼圖與未來實體周邊預留商品。"
      actions={
        <DivineButton href="/admin/products/new">
          <Plus className="size-4" />
          新增商品
        </DivineButton>
      }
    >
      <AdminTable
        emptyLabel="尚無商品"
        items={products}
        columns={[
          { header: "商品", render: (item) => item.title },
          { header: "分類", render: (item) => item.category },
          { header: "價格", render: (item) => `NT$ ${item.price}` },
          { header: "格式", render: (item) => item.fileFormat.join(", ") },
          { header: "數位", render: (item) => (item.isDigital ? "是" : "否") },
          { header: "狀態", render: (item) => item.status ?? "published" },
        ]}
        editHref={(item) => `/admin/products/${item.id}`}
      />
    </AdminShell>
  );
}
