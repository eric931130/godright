import { AdminShell } from "@/components/admin/admin-shell";
import { AdminTable } from "@/components/admin/admin-table";
import { hallPosts } from "@/lib/hall/mock-data";

export default function AdminHallPage() {
  return (
    <AdminShell
      title="閱讀大廳管理"
      description="管理讀者貼文、留言、置頂、鎖文、隱藏、檢舉與停權。第一版先以 mock data 呈現。"
    >
      <AdminTable
        emptyLabel="尚無貼文"
        items={hallPosts}
        columns={[
          { header: "標題", render: (item) => item.title },
          { header: "作者", render: (item) => item.authorDisplayName },
          { header: "分類", render: (item) => item.category },
          { header: "留言", render: (item) => item.commentCount },
          { header: "狀態", render: (item) => (item.isHidden ? "隱藏" : item.isLocked ? "鎖定" : "公開") },
        ]}
      />
    </AdminShell>
  );
}
