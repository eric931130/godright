import { Plus } from "lucide-react";

import { AdminShell } from "@/components/admin/admin-shell";
import { AdminTable } from "@/components/admin/admin-table";
import { DivineButton } from "@/components/common/divine-button";
import { characterService } from "@/services/characterService";

export default async function AdminCharactersPage() {
  const characters = await characterService.list();

  return (
    <AdminShell
      title="角色管理"
      description="管理角色名稱、勢力、屬性、戰力位階、關係與角色視覺資料。"
      actions={
        <DivineButton href="/admin/characters/new">
          <Plus className="size-4" />
          新增角色
        </DivineButton>
      }
    >
      <AdminTable
        emptyLabel="尚無角色"
        items={characters}
        columns={[
          { header: "角色", render: (item) => item.name },
          { header: "稱號", render: (item) => item.title },
          { header: "勢力", render: (item) => item.faction },
          { header: "定位", render: (item) => item.role },
          { header: "位階", render: (item) => item.powerRank },
          { header: "狀態", render: (item) => item.status ?? "published" },
        ]}
        editHref={(item) => `/admin/characters/${item.id}`}
      />
    </AdminShell>
  );
}
