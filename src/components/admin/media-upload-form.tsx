"use client";

import { FormEvent, useState } from "react";
import { Upload } from "lucide-react";

import { GlassCard } from "@/components/common/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUser } from "@/lib/auth/useCurrentUser";

const categories = ["homepage", "character", "product", "ebook", "lore", "location", "artifact", "campaign", "general"];

export function MediaUploadForm() {
  const { user } = useCurrentUser();
  const [files, setFiles] = useState<File[]>([]);
  const [category, setCategory] = useState("general");
  const [alt, setAlt] = useState("");
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user || files.length === 0) {
      setMessage("請先登入開發者帳號並選擇至少一張圖片。");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const token = await user.getIdToken(true);
      let success = 0;
      const errors: string[] = [];

      // 批次上傳：逐一送出（每張一個請求）。
      for (const file of files) {
        const body = new FormData();
        body.append("file", file);
        body.append("category", category);
        body.append("alt", alt);
        body.append("tags", tags);

        const response = await fetch("/api/media/upload", {
          method: "POST",
          headers: { authorization: `Bearer ${token}` },
          body,
        });
        if (response.ok) {
          success += 1;
        } else {
          const data = await response.json().catch(() => ({}));
          errors.push(`${file.name}: ${data.error ?? "上傳失敗"}`);
        }
      }

      setMessage(
        errors.length === 0
          ? `已上傳 ${success} 張圖片。`
          : `成功 ${success} 張；失敗：${errors.join("；")}`,
      );
      if (success > 0) {
        setFiles([]);
        window.dispatchEvent(new Event("godright-media-updated"));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <GlassCard className="p-5">
      <form className="grid gap-5" onSubmit={(event) => void onSubmit(event)}>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="grid gap-2">
            <Label>圖片檔案（可多選）</Label>
            <Input
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="border-divine-gold/25 bg-deep-space/45"
              type="file"
              onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
            />
            {files.length > 0 ? <p className="text-xs text-muted-foreground">已選擇 {files.length} 張</p> : null}
          </div>
          <div className="grid gap-2">
            <Label>分類</Label>
            <select
              className="h-9 rounded-lg border border-divine-gold/25 bg-deep-space/70 px-3 text-sm"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label>Alt 文字</Label>
            <Input className="border-divine-gold/25 bg-deep-space/45" placeholder="圖片描述" value={alt} onChange={(event) => setAlt(event.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>標籤，逗號分隔（可留空）</Label>
            <Input className="border-divine-gold/25 bg-deep-space/45" placeholder="天魂, 立繪, 封面" value={tags} onChange={(event) => setTags(event.target.value)} />
          </div>
        </div>
        <Button className="bg-divine-gold text-deep-space hover:bg-platinum" disabled={loading || files.length === 0}>
          <Upload className="size-4" />
          {loading ? "上傳中…" : "建立媒體紀錄"}
        </Button>
        {message ? <p className="text-sm text-moon-blue">{message}</p> : null}
      </form>
    </GlassCard>
  );
}
