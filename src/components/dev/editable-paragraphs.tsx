"use client";

import { useState } from "react";
import { Check, Pencil, X } from "lucide-react";

import { useDevMode } from "@/components/dev/dev-mode-provider";
import { useCurrentUser } from "@/lib/auth/useCurrentUser";

type EditableParagraphsProps = {
  contentKey: string;
  paragraphs: string[];
  /** 是否允許編輯（例如僅免費章節為 true）。 */
  editable?: boolean;
  paragraphClassName?: string;
};

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

/**
 * 段落陣列的就地編輯（用於章節內文）。非「開發者 + 編輯模式 + editable」時純渲染段落。
 * 編輯時以多行文字編輯，段落以空白行分隔，存至 /api/admin/site-content。
 */
export function EditableParagraphs({ contentKey, paragraphs, editable = true, paragraphClassName }: EditableParagraphsProps) {
  const { isDeveloper, editing } = useDevMode();
  const { user } = useCurrentUser();
  const [current, setCurrent] = useState(paragraphs);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(paragraphs.join("\n\n"));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const canEdit = editable && isDeveloper && editing;

  async function save() {
    if (!user) {
      setError("請先登入開發者帳號。");
      return;
    }
    const next = splitParagraphs(draft);
    if (next.length === 0) {
      setError("內文不可為空。");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const token = await user.getIdToken(true);
      const response = await fetch("/api/admin/site-content", {
        method: "POST",
        headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify({ key: contentKey, text: next.join("\n\n") }),
      });
      if (response.ok) {
        setCurrent(next);
        setOpen(false);
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.error ?? "儲存失敗。");
      }
    } finally {
      setSaving(false);
    }
  }

  if (!canEdit) {
    return (
      <>
        {current.map((paragraph, index) => (
          <p key={`p-${index}`} className={paragraphClassName}>
            {paragraph}
          </p>
        ))}
      </>
    );
  }

  if (open) {
    return (
      <div className="grid gap-2">
        <textarea
          autoFocus
          className="min-h-96 w-full rounded-md border border-divine-gold/30 bg-deep-space/60 p-3 text-sm leading-7 text-platinum"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <p className="text-xs text-muted-foreground">段落之間以空白行分隔。</p>
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
              setDraft(current.join("\n\n"));
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
    );
  }

  return (
    <div className="relative rounded-lg outline-dashed outline-1 outline-offset-4 outline-divine-gold/40">
      <button
        type="button"
        onClick={() => {
          setDraft(current.join("\n\n"));
          setOpen(true);
        }}
        className="absolute -top-3 right-0 z-10 inline-flex h-7 items-center gap-1 rounded-md bg-deep-space/80 px-2 text-xs text-divine-gold ring-1 ring-divine-gold/40 hover:bg-divine-gold/15"
      >
        <Pencil className="size-3.5" /> 編輯內文
      </button>
      {current.map((paragraph, index) => (
        <p key={`p-${index}`} className={paragraphClassName}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}
