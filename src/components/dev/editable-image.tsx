"use client";

import { useState, type ReactNode } from "react";
import { Check, ImagePlus, X } from "lucide-react";

import { useDevMode } from "@/components/dev/dev-mode-provider";
import { useCurrentUser } from "@/lib/auth/useCurrentUser";
import { cn } from "@/lib/utils";

type EditableImageProps = {
  /** 內容 key（= siteContent doc id），例如 "shop.hero.banner"。 */
  contentKey: string;
  /** server 解析後的覆蓋圖片 URL（無則用 placeholder）。 */
  value?: string;
  className?: string;
  alt?: string;
  /** 疊在圖片上的裝飾（例如 seal-ring）。 */
  children?: ReactNode;
};

/**
 * 就地編輯圖片。有覆蓋 URL 時以 background-image 呈現（避開 next/image remotePatterns），
 * 否則維持原本的 .image-placeholder 外觀。僅「開發者 + 編輯模式」可貼上新 URL 存檔。
 */
export function EditableImage({ contentKey, value, className, alt, children }: EditableImageProps) {
  const { isDeveloper, editing } = useDevMode();
  const { user } = useCurrentUser();
  const [current, setCurrent] = useState(value);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const boxClass = cn("relative overflow-hidden", className, !current && "image-placeholder");
  const style = current
    ? { backgroundImage: `url("${current}")`, backgroundSize: "cover", backgroundPosition: "center" }
    : undefined;

  async function save() {
    if (!user) {
      setError("請先登入開發者帳號。");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const token = await user.getIdToken(true);
      const response = await fetch("/api/admin/site-content", {
        method: "POST",
        headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify({ key: contentKey, imageUrl: draft }),
      });
      if (response.ok) {
        setCurrent(draft || undefined);
        setOpen(false);
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.error ?? "儲存失敗。");
      }
    } finally {
      setSaving(false);
    }
  }

  if (!(isDeveloper && editing)) {
    return (
      <div className={boxClass} style={style} role={alt ? "img" : undefined} aria-label={alt}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn(boxClass, "outline-dashed outline-2 outline-divine-gold/50")} style={style} aria-label={alt}>
      {children}
      <button
        type="button"
        onClick={() => {
          setDraft(current ?? "");
          setOpen(true);
        }}
        className="absolute right-2 top-2 z-10 inline-flex h-8 items-center gap-1 rounded-md bg-deep-space/80 px-2 text-xs text-divine-gold ring-1 ring-divine-gold/40 hover:bg-divine-gold/15"
      >
        <ImagePlus className="size-3.5" /> 編輯圖片
      </button>
      {open ? (
        <div className="absolute inset-x-2 bottom-2 z-20 grid gap-2 rounded-lg border border-divine-gold/40 bg-deep-space/90 p-3">
          <input
            autoFocus
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="貼上圖片 URL（可從媒體庫複製）"
            className="w-full rounded-md border border-divine-gold/25 bg-deep-space/60 p-2 text-xs text-platinum"
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="inline-flex h-8 items-center gap-1 rounded-md bg-divine-gold px-3 text-xs font-medium text-deep-space hover:bg-platinum disabled:opacity-50"
            >
              <Check className="size-3.5" /> 儲存
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setError("");
              }}
              className="inline-flex h-8 items-center gap-1 rounded-md border border-platinum/20 px-3 text-xs text-muted-foreground"
            >
              <X className="size-3.5" /> 取消
            </button>
            {error ? <span className="text-xs text-destructive">{error}</span> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
