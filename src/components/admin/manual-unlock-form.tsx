"use client";

import { FormEvent, useState } from "react";
import { KeyRound } from "lucide-react";

import { GlassCard } from "@/components/common/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/lib/auth/useCurrentUser";

const unlockTypes = [
  ["chapter", "單一付費章節"],
  ["volume", "整卷章節"],
  ["ebook", "指定電子書"],
  ["product", "指定商品"],
  ["vip", "VIP 權限"],
] as const;

export function ManualUnlockForm() {
  const { user } = useCurrentUser();
  const [form, setForm] = useState({
    targetUserInput: "",
    unlockType: "chapter",
    targetId: "",
    reason: "",
    expiresAt: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(action: "manual-unlock" | "manual-revoke") {
    if (!user) {
      setMessage("請先登入開發者帳號。");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const token = await user.getIdToken(true);
      const response = await fetch(`/api/admin/${action}`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ ...form, expiresAt: form.expiresAt || undefined }),
      });
      const data = await response.json();

      setMessage(response.ok ? "操作成功，audit log 已建立。" : data.error ?? "操作失敗。");
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submit("manual-unlock");
  }

  return (
    <GlassCard className="p-5">
      <form className="grid gap-5" onSubmit={onSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="grid gap-2">
            <Label>目標使用者</Label>
            <Input
              className="border-divine-gold/25 bg-deep-space/45"
              placeholder="Public UID / Firebase UID / Email"
              value={form.targetUserInput}
              onChange={(event) => update("targetUserInput", event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>解鎖類型</Label>
            <select
              className="h-9 rounded-lg border border-divine-gold/25 bg-deep-space/70 px-3 text-sm"
              value={form.unlockType}
              onChange={(event) => update("unlockType", event.target.value)}
            >
              {unlockTypes.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label>目標 ID</Label>
            <Input
              className="border-divine-gold/25 bg-deep-space/45"
              placeholder="ch-009 / volume-1 / product id"
              value={form.targetId}
              onChange={(event) => update("targetId", event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>到期時間，可留空</Label>
            <Input
              className="border-divine-gold/25 bg-deep-space/45"
              type="datetime-local"
              value={form.expiresAt}
              onChange={(event) => update("expiresAt", event.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label>原因</Label>
          <Textarea
            className="min-h-28 border-divine-gold/25 bg-deep-space/45"
            placeholder="例如：付款 webhook 異常、客服補償、活動授權。"
            value={form.reason}
            onChange={(event) => update("reason", event.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <Button className="bg-divine-gold text-deep-space hover:bg-platinum" disabled={loading}>
            <KeyRound className="size-4" />
            建立解鎖
          </Button>
          <Button disabled={loading} type="button" variant="outline" onClick={() => submit("manual-revoke")}>
            取消解鎖
          </Button>
        </div>
        {message ? <p className="text-sm text-moon-blue">{message}</p> : null}
      </form>
    </GlassCard>
  );
}
