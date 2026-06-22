"use client";

import { useState, type ElementType } from "react";
import { Check, X } from "lucide-react";

import { useDevMode } from "@/components/dev/dev-mode-provider";
import { useCurrentUser } from "@/lib/auth/useCurrentUser";
import { cn } from "@/lib/utils";

type EditableTextProps = {
  /** 內容 key（= siteContent doc id），例如 "home.hero.title"。 */
  contentKey: string;
  /** server 解析後的目前值（覆蓋值或預設值）。 */
  value: string;
  as?: ElementType;
  className?: string;
  multiline?: boolean;
};

/**
 * 就地編輯文字。非「開發者 + 編輯模式」時，純粹渲染文字（零額外行為）。
 * 開發者開編輯模式後可點擊編輯，存至 /api/admin/site-content。
 */
export function EditableText({ contentKey, value, as, className, multiline = false }: EditableTextProps) {
  const Tag = (as ?? "span") as ElementType;
  const { isDeveloper, editing } = useDevMode();
  const { user } = useCurrentUser();
  const [current, setCurrent] = useState(value);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!(isDeveloper && editing)) {
    return <Tag className={className}>{current}</Tag>;
  }

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
        body: JSON.stringify({ key: contentKey, text: draft }),
      });
      if (response.ok) {
        setCurrent(draft);
        setOpen(false);
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.error ?? "儲存失敗。");
      }
    } finally {
      setSaving(false);
    }
  }

  if (open) {
    return (
      <span className="inline-flex w-full flex-col gap-2 rounded-lg border border-divine-gold/40 bg-deep-space/80 p-3 align-top">
        {multiline ? (
          <textarea
            autoFocus
            className="min-h-24 w-full rounded-md border border-divine-gold/25 bg-deep-space/60 p-2 text-sm text-platinum"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
        ) : (
          <input
            autoFocus
            className="w-full rounded-md border border-divine-gold/25 bg-deep-space/60 p-2 text-sm text-platinum"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
        )}
        <span className="flex items-center gap-2">
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
              setDraft(current);
              setOpen(false);
              setError("");
            }}
            className="inline-flex h-8 items-center gap-1 rounded-md border border-platinum/20 px-3 text-xs text-muted-foreground"
          >
            <X className="size-3.5" /> 取消
          </button>
          {error ? <span className="text-xs text-destructive">{error}</span> : null}
        </span>
      </span>
    );
  }

  return (
    <Tag
      className={cn(
        className,
        "cursor-pointer rounded outline-dashed outline-1 outline-offset-2 outline-divine-gold/40 transition hover:outline-divine-gold",
      )}
      title="點擊編輯（編輯模式）"
      onClick={() => {
        setDraft(current);
        setOpen(true);
      }}
    >
      {current}
    </Tag>
  );
}
