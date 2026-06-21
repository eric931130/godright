import { AdminShell } from "@/components/admin/admin-shell";
import { AdminTable } from "@/components/admin/admin-table";
import { ContentForm } from "@/components/admin/content-form";
import { locationService } from "@/services/loreService";

export default async function AdminLocationsPage() {
  const locations = await locationService.list();

  return (
    <AdminShell
      title="場地管理"
      description="管理神殿、封印之地、上古戰場與七界場景資料，欄位沿用共用 CRUD 模式。"
    >
      <AdminTable
        emptyLabel="尚無場地"
        items={locations}
        columns={[
          { header: "名稱", render: (item) => item.name },
          { header: "界域", render: (item) => item.category },
          { header: "功能", render: (item) => item.summary },
          { header: "相關章節", render: (item) => item.relatedChapters.join(", ") || "無" },
          { header: "狀態", render: (item) => item.status },
        ]}
      />
      <ContentForm defaultCategory="天界" label="場地" />
    </AdminShell>
  );
}
