import { AdminShell } from "@/components/admin/admin-shell";
import { AdminTable } from "@/components/admin/admin-table";
import { ContentForm } from "@/components/admin/content-form";
import { artifactService } from "@/services/loreService";

export default async function AdminArtifactsPage() {
  const artifacts = await artifactService.list();

  return (
    <AdminShell
      title="物件管理"
      description="管理神器、封印物、羅盤、契約印與未來可商品化的 IP 物件資料。"
    >
      <AdminTable
        emptyLabel="尚無物件"
        items={artifacts}
        columns={[
          { header: "名稱", render: (item) => item.name },
          { header: "類型", render: (item) => item.category },
          { header: "能力", render: (item) => item.summary },
          { header: "相關角色", render: (item) => item.relatedCharacters.join(", ") || "無" },
          { header: "狀態", render: (item) => item.status },
        ]}
      />
      <ContentForm defaultCategory="神器" label="物件" />
    </AdminShell>
  );
}
