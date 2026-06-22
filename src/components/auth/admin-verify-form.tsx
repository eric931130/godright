"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { DivineButton } from "@/components/common/divine-button";
import { GlassCard } from "@/components/common/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUser } from "@/lib/auth/useCurrentUser";

export function AdminVerifyForm() {
  const { user, loading, error } = useCurrentUser();
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    setMessage("");

    try {
      const token = await user.getIdToken(true);
      const response = await fetch("/api/admin/verify-pin", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ pin }),
      });
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error ?? "驗證失敗。");
        return;
      }

      setPin("");
      setStep(data.step ?? step + 1);
      if (data.verified && data.redirectTo) {
        const sessionResponse = await fetch("/api/admin/session", {
          cache: "no-store",
          credentials: "same-origin",
        });
        const session = await sessionResponse.json().catch(() => null);

        if (session?.verified) {
          window.location.assign(data.redirectTo);
          return;
        }

        setMessage("PIN 已通過，但瀏覽器尚未寫入開發者驗證狀態。請重新按一次驗證，或重新整理後再試。");
        return;
      }
      setMessage(`第 ${data.step} 次驗證完成，請繼續完成下一次封印驗證。`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <GlassCard className="mx-auto max-w-xl p-6 sm:p-8">
      <div className="flex flex-col items-center text-center">
        <ShieldCheck className="mb-4 size-12 text-divine-gold" />
        <p className="text-sm uppercase tracking-[0.28em] text-divine-gold">Admin Seal</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-platinum">神權封印驗證</h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          開發者帳號登入後，必須連續完成三次 PIN 驗證才能進入後台。PIN 只會送到後端比對 hash，不會在前端保存。
        </p>
      </div>

      {loading ? <p className="mt-6 text-center text-sm text-muted-foreground">正在讀取 Firebase 登入狀態...</p> : null}
      {error ? <p className="mt-6 text-center text-sm text-destructive">{error}</p> : null}

      {!loading && !user ? (
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">請先使用唯一開發者帳號登入。</p>
          <DivineButton className="mt-4" href="/login">
            前往登入
          </DivineButton>
        </div>
      ) : null}

      {user ? (
        <form className="mt-7 grid gap-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="admin-pin">二次驗證 PIN</Label>
            <Input
              autoComplete="one-time-code"
              className="border-divine-gold/30 bg-deep-space/45 text-center text-lg tracking-[0.4em]"
              id="admin-pin"
              inputMode="numeric"
              placeholder="******"
              value={pin}
              onChange={(event) => setPin(event.target.value)}
            />
          </div>
          <Button className="bg-divine-gold text-deep-space hover:bg-platinum" disabled={isSubmitting || !pin}>
            驗證第 {Math.min(step + 1, 3)} 次
          </Button>
          {message ? <p className="text-center text-sm text-moon-blue">{message}</p> : null}
          <Link className="text-center text-xs text-muted-foreground hover:text-platinum" href="/account">
            返回會員中心
          </Link>
        </form>
      ) : null}
    </GlassCard>
  );
}
