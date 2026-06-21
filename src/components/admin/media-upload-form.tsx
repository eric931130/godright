"use client";

import { FormEvent, useState } from "react";
import { Upload } from "lucide-react";

import { GlassCard } from "@/components/common/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUser } from "@/lib/auth/useCurrentUser";

const categories = ["homepage", "character", "product", "lore", "location", "artifact", "general"];

export function MediaUploadForm() {
  const { user } = useCurrentUser();
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("general");
  const [alt, setAlt] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user || !file) {
      setMessage("請先登入開發者帳號並選擇圖片。");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const token = await user.getIdToken(true);
      const body = new FormData();
      body.append("file", file);
      body.append("category", category);
      body.append("alt", alt);

      const response = await fetch("/api/media/upload", {
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body,
      });
      const data = await response.json();
      setMessage(response.ok ? `媒體紀錄已建立：${data.asset.fileName}` : data.error ?? "上傳失敗。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <GlassCard className="p-5">
      <form className="grid gap-5" onSubmit={onSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="grid gap-2">
            <Label>圖片檔案</Label>
            <Input
              accept="image/jpeg,image/png,image/webp"
              className="border-divine-gold/25 bg-deep-space/45"
              type="file"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />
          </div>
          <div className="grid gap-2">
            <Label>分類</Label>
            <select
              className="h-9 rounded-lg border border-divine-gold/25 bg-deep-space/70 px-3 text-sm"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid gap-2">
          <Label>Alt 文字</Label>
          <Input
            className="border-divine-gold/25 bg-deep-space/45"
            placeholder="圖片描述"
            value={alt}
            onChange={(event) => setAlt(event.target.value)}
          />
        </div>
        <Button className="bg-divine-gold text-deep-space hover:bg-platinum" disabled={loading || !file}>
          <Upload className="size-4" />
          建立媒體紀錄
        </Button>
        {message ? <p className="text-sm text-moon-blue">{message}</p> : null}
      </form>
    </GlassCard>
  );
}
