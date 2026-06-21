import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";

export type AdminTableColumn<T> = {
  header: string;
  render: (item: T) => string | number;
};

type AdminTableProps<T extends { id: string }> = {
  items: T[];
  columns: AdminTableColumn<T>[];
  emptyLabel: string;
  editHref?: (item: T) => string;
};

export function AdminTable<T extends { id: string }>({
  items,
  columns,
  emptyLabel,
  editHref,
}: AdminTableProps<T>) {
  return (
    <GlassCard className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-divine-gold/20 bg-platinum/5 text-xs uppercase tracking-[0.18em] text-divine-gold">
            <tr>
              {columns.map((column) => (
                <th key={column.header} className="px-4 py-3 font-medium">
                  {column.header}
                </th>
              ))}
              <th className="px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-divine-gold/10 text-muted-foreground">
                {columns.map((column) => (
                  <td key={column.header} className="px-4 py-3 align-top">
                    {column.render(item)}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {editHref ? (
                      <Link
                        href={editHref(item)}
                        className="inline-flex size-8 items-center justify-center rounded-lg border border-divine-gold/25 text-divine-gold transition hover:bg-divine-gold/10"
                        title="編輯"
                      >
                        <Edit className="size-4" />
                      </Link>
                    ) : null}
                    <button
                      className="inline-flex size-8 items-center justify-center rounded-lg border border-destructive/30 text-destructive transition hover:bg-destructive/10"
                      title="刪除"
                      type="button"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-center text-muted-foreground" colSpan={columns.length + 1}>
                  <Badge>{emptyLabel}</Badge>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
