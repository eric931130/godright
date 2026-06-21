"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Copy, Loader2, Trash2 } from "lucide-react";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/lib/auth/useCurrentUser";
import type { MediaAsset } from "@/lib/media/types";
import { cn } from "@/lib/utils";

const categoryOptions = ["all", "homepage", "character", "product", "ebook", "lore", "location", "artifact", "campaign", "general"];

function formatSize(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function MediaLibrary() {
  const { user } = useCurrentUser();
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [unusedOnly, setUnusedOnly] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      const response = await fetch("/api/admin/media", { headers: { authorization: `Bearer ${token}` } });
      const data = await response.json();
      if (response.ok) setAssets(data.assets ?? []);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const handler = () => void load();
    window.addEventListener("godright-media-updated", handler);
    return () => window.removeEventListener("godright-media-updated", handler);
  }, [load]);

  const copyUrl = async (asset: MediaAsset) => {
    try {
      await navigator.clipboard.writeText(asset.url);
      setCopiedId(asset.id);
      window.setTimeout(() => setCopiedId(null), 1500);
    } catch {
      setMessage("複製失敗，請手動複製。");
    }
  };

  const remove = async (id: string) => {
    if (!user) return;
    const token = await user.getIdToken();
    const response = await fetch(`/api/admin/media?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok) {
      setAssets((current) => current.filter((asset) => asset.id !== id));
      setMessage("已刪除圖片。");
    } else {
      setMessage(data.error ?? "刪除失敗。");
    }
    setConfirmingId(null);
  };

  const filtered = assets.filter((asset) => {
    if (categoryFilter !== "all" && asset.category !== categoryFilter) return false;
    if (unusedOnly && (asset.usedBy?.length ?? 0) > 0) return false;
    if (search.trim()) {
      const query = search.trim().toLowerCase();
      const haystack = `${asset.fileName} ${asset.alt ?? ""} ${(asset.tags ?? []).join(" ")}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });

  return (
    <GlassCard className="p-5">
      <div className="flex flex-wrap items-center gap-3">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="搜尋檔名 / alt / 標籤"
          className="h-9 max-w-xs border-divine-gold/25 bg-deep-space/45"
        />
        <select
          className="h-9 rounded-lg border border-divine-gold/25 bg-deep-space/70 px-3 text-sm"
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
        >
          {categoryOptions.map((category) => (
            <option key={category} value={category}>{category === "all" ? "全部分類" : category}</option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" checked={unusedOnly} onChange={(event) => setUnusedOnly(event.target.checked)} />
          僅顯示未使用
        </label>
        <span className="ml-auto text-sm text-muted-foreground">{filtered.length} / {assets.length} 張</span>
      </div>

      {message ? <p className="mt-3 text-sm text-moon-blue">{message}</p> : null}

      {loading ? (
        <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="size-4 animate-spin" /> 載入中…
        </div>
      ) : filtered.length === 0 ? (
        <p className="mt-8 text-center text-sm text-muted-foreground">
          {assets.length === 0 ? "媒體庫尚無圖片，或 Firebase 環境未設定。" : "沒有符合條件的圖片。"}
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((asset) => {
            const used = (asset.usedBy?.length ?? 0) > 0;
            return (
              <div key={asset.id} className="overflow-hidden rounded-lg border border-divine-gold/15 bg-deep-space/40">
                <div
                  className="aspect-[4/3] bg-deep-space/60 bg-cover bg-center"
                  style={{ backgroundImage: `url("${asset.url}")` }}
                  role="img"
                  aria-label={asset.alt || asset.fileName}
                />
                <div className="p-3">
                  <p className="truncate text-sm text-platinum" title={asset.fileName}>{asset.fileName}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <Badge tone="blue">{asset.category}</Badge>
                    <Badge tone={used ? "gold" : "purple"}>{used ? `使用中 ${asset.usedBy?.length}` : "未使用"}</Badge>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {formatSize(asset.size)}
                    {asset.width && asset.height ? ` · ${asset.width}×${asset.height}` : ""}
                  </p>
                  {asset.tags?.length ? (
                    <p className="mt-1 truncate text-xs text-moon-blue" title={asset.tags.join(", ")}>#{asset.tags.join(" #")}</p>
                  ) : null}
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => copyUrl(asset)}
                      className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md border border-divine-gold/25 bg-deep-space/45 text-xs text-platinum transition hover:bg-divine-gold/10"
                    >
                      {copiedId === asset.id ? <Check className="size-3.5 text-divine-gold" /> : <Copy className="size-3.5" />}
                      {copiedId === asset.id ? "已複製" : "複製 URL"}
                    </button>
                    {confirmingId === asset.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => remove(asset.id)}
                          className="inline-flex h-8 items-center rounded-md bg-destructive px-2 text-xs font-medium text-deep-space"
                        >
                          確認刪除
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmingId(null)}
                          className="inline-flex h-8 items-center rounded-md border border-platinum/20 px-2 text-xs text-muted-foreground"
                        >
                          取消
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmingId(asset.id)}
                        className={cn(
                          "inline-flex size-8 items-center justify-center rounded-md border border-platinum/15 text-muted-foreground transition hover:text-destructive",
                          used && "cursor-not-allowed opacity-40",
                        )}
                        disabled={used}
                        title={used ? "使用中無法刪除" : "刪除"}
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </GlassCard>
  );
}
