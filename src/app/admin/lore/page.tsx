import { AdminShell } from "@/components/admin/admin-shell";
import { AdminTable } from "@/components/admin/admin-table";
import { ContentForm } from "@/components/admin/content-form";
import { loreService } from "@/services/loreService";

export default async function AdminLorePage() {
  const entries = await loreService.list();

  return (
    <AdminShell
      title="世界觀管理"
      description="以共用 CRUD 欄位管理百科條目，包含名稱、分類、摘要、詳細內容、標籤與關聯資料。"
    >
      <AdminTable
        emptyLabel="尚無百科條目"
        items={entries}
        columns={[
          { header: "名稱", render: (item) => item.name },
          { header: "分類", render: (item) => item.category },
          { header: "摘要", render: (item) => item.summary },
          { header: "標籤", render: (item) => item.tags.join(", ") },
          { header: "狀態", render: (item) => item.status },
        ]}
      />
      <ContentForm defaultCategory="創世神話" label="百科條目" />
    </AdminShell>
  );
}
