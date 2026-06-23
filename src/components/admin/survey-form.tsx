"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClipboardList, Plus, Trash2 } from "lucide-react";

import { GlassCard } from "@/components/common/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/lib/auth/useCurrentUser";

type Draft = { id: string; text: string; type: "single" | "multiple" | "text"; optionsText: string };

const types = [
  ["single", "單選"],
  ["multiple", "多選"],
  ["text", "文字"],
] as const;

let counter = 0;
const newDraft = (): Draft => ({ id: `q${Date.now()}_${counter++}`, text: "", type: "single", optionsText: "" });

export function SurveyForm() {
  const { user } = useCurrentUser();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Draft[]>([newDraft()]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function update(id: string, patch: Partial<Draft>) {
    setQuestions((current) => current.map((q) => (q.id === id ? { ...q, ...patch } : q)));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) {
      setMessage("請先登入開發者帳號。");
      return;
    }
    const built = questions
      .filter((q) => q.text.trim())
      .map((q) => ({
        id: q.id,
        text: q.text.trim(),
        type: q.type,
        options:
          q.type === "text"
            ? undefined
            : q.optionsText.split(/[\n,]/).map((o) => o.trim()).filter(Boolean),
      }));
    if (built.length === 0) {
      setMessage("至少需要一題。");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const token = await user.getIdToken(true);
      const response = await fetch("/api/admin/surveys", {
        method: "POST",
        headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify({ title: title.trim(), description: description.trim() || undefined, questions: built, isActive: true }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("已建立並發放問卷。");
        setTitle("");
        setDescription("");
        setQuestions([newDraft()]);
        router.refresh();
      } else {
        setMessage(data.error ?? "建立失敗。");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <GlassCard className="p-5">
      <form className="grid gap-5" onSubmit={(event) => void onSubmit(event)}>
        <div className="grid gap-2">
          <Label>問卷標題</Label>
          <Input className="border-divine-gold/25 bg-deep-space/45" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label>說明（可留空）</Label>
          <Textarea className="min-h-16 border-divine-gold/25 bg-deep-space/45" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="grid gap-3">
          <Label>題目</Label>
          {questions.map((q, index) => (
            <div key={q.id} className="rounded-lg border border-divine-gold/20 bg-deep-space/40 p-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-divine-gold">第 {index + 1} 題</span>
                <select
                  className="ml-auto h-8 rounded-md border border-divine-gold/25 bg-deep-space/70 px-2 text-xs"
                  value={q.type}
                  onChange={(e) => update(q.id, { type: e.target.value as Draft["type"] })}
                >
                  {types.map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
                {questions.length > 1 ? (
                  <button type="button" onClick={() => setQuestions((c) => c.filter((x) => x.id !== q.id))} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="size-4" />
                  </button>
                ) : null}
              </div>
              <Input className="mt-3 border-divine-gold/25 bg-deep-space/45" placeholder="題目內容" value={q.text} onChange={(e) => update(q.id, { text: e.target.value })} />
              {q.type !== "text" ? (
                <Input className="mt-2 border-divine-gold/25 bg-deep-space/45" placeholder="選項，以逗號或換行分隔" value={q.optionsText} onChange={(e) => update(q.id, { optionsText: e.target.value })} />
              ) : null}
            </div>
          ))}
          <button type="button" onClick={() => setQuestions((c) => [...c, newDraft()])} className="inline-flex h-9 w-fit items-center gap-1 rounded-lg border border-divine-gold/30 px-3 text-sm text-divine-gold hover:bg-divine-gold/10">
            <Plus className="size-4" /> 新增題目
          </button>
        </div>

        <div>
          <Button className="bg-divine-gold text-deep-space hover:bg-platinum" disabled={loading}>
            <ClipboardList className="size-4" /> 建立並發放
          </Button>
          {message ? <p className="mt-3 text-sm text-moon-blue">{message}</p> : null}
        </div>
      </form>
    </GlassCard>
  );
}
