"use client";

import { useState } from "react";
import { Gavel } from "lucide-react";

import { GlassCard } from "@/components/common/glass-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUser } from "@/lib/auth/useCurrentUser";
import { cn } from "@/lib/utils";

const muteActions = [
  ["mute_1d", "禁言 1 天"],
  ["mute_3d", "禁言 3 天"],
  ["mute_7d", "禁言 7 天"],
] as const;

const banActions = [
  ["ban_6h", "停權 6 小時"],
  ["ban_12h", "停權 12 小時"],
  ["ban_36h", "停權 36 小時"],
  ["ban_permanent", "永久停權"],
] as const;

const releaseActions = [
  ["unmute", "解除禁言"],
  ["unban", "解除停權"],
] as const;

export function ModerationForm() {
  const { user } = useCurrentUser();
  const [publicUid, setPublicUid] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<"ok" | "error">("ok");

  async function run(action: string) {
    if (!/^\d{10}$/.test(publicUid)) {
      setTone("error");
      setMessage("請輸入 10 位數字 UID。");
      return;
    }
    if (!user) {
      setTone("error");
      setMessage("請先登入開發者帳號。");
      return;
    }
    setBusy(action);
    setMessage("");
    try {
      const token = await user.getIdToken(true);
      const response = await fetch("/api/admin/moderate", {
        method: "POST",
        headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify({ publicUid, action }),
      });
      const data = await response.json();
      setTone(response.ok ? "ok" : "error");
      setMessage(data.message ?? data.error ?? (response.ok ? "已執行。" : "執行失敗。"));
    } catch {
      setTone("error");
      setMessage("執行失敗，請稍後再試。");
    } finally {
      setBusy(null);
    }
  }

  function buttonGroup(items: readonly (readonly [string, string])[], variant: "mute" | "ban" | "release") {
    return items.map(([action, label]) => (
      <button
        key={action}
        type="button"
        onClick={() => run(action)}
        disabled={busy !== null}
        className={cn(
          "inline-flex h-9 items-center rounded-lg border px-3 text-sm transition disabled:opacity-50",
          variant === "ban"
            ? "border-destructive/50 bg-destructive/10 text-destructive hover:bg-destructive/20"
            : variant === "mute"
              ? "border-divine-gold/40 bg-divine-gold/10 text-divine-gold hover:bg-divine-gold/20"
              : "border-platinum/25 bg-deep-space/45 text-platinum hover:bg-platinum/10",
        )}
      >
        {busy === action ? "處理中…" : label}
      </button>
    ));
  }

  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-2 text-divine-gold">
        <Gavel className="size-5" aria-hidden="true" />
        <h2 className="font-serif text-xl font-semibold text-platinum">使用者懲處</h2>
      </div>
      <div className="mt-5 grid max-w-sm gap-2">
        <Label>使用者 10 位 UID（Public UID）</Label>
        <Input
          inputMode="numeric"
          maxLength={10}
          placeholder="例如 1000000001"
          className="h-11 border-divine-gold/25 bg-deep-space/45 tracking-[0.2em]"
          value={publicUid}
          onChange={(event) => setPublicUid(event.target.value.replace(/\D/g, "").slice(0, 10))}
        />
      </div>

      <div className="mt-5 space-y-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">禁言</p>
          <div className="mt-2 flex flex-wrap gap-2">{buttonGroup(muteActions, "mute")}</div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">停權</p>
          <div className="mt-2 flex flex-wrap gap-2">{buttonGroup(banActions, "ban")}</div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">解除</p>
          <div className="mt-2 flex flex-wrap gap-2">{buttonGroup(releaseActions, "release")}</div>
        </div>
      </div>

      {message ? (
        <p className={cn("mt-4 text-sm", tone === "ok" ? "text-moon-blue" : "text-destructive")}>{message}</p>
      ) : null}
    </GlassCard>
  );
}
