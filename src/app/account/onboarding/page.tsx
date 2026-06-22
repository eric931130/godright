"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

import { GlassCard } from "@/components/common/glass-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/lib/auth/useCurrentUser";

const genders = [
  ["male", "男"],
  ["female", "女"],
  ["other", "其他"],
  ["undisclosed", "不願透露"],
] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading } = useCurrentUser();
  const [displayName, setDisplayName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("undisclosed");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (user?.displayName) setDisplayName((current) => current || user.displayName || "");
    }, 0);
    return () => window.clearTimeout(timer);
  }, [user]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;
    if (!displayName.trim() || !birthdate) {
      setError("請填寫旅者之名與生辰。");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const token = await user.getIdToken(true);
      const response = await fetch("/api/users/profile", {
        method: "POST",
        headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify({ displayName: displayName.trim(), birthdate, gender, onboarded: true }),
      });
      if (response.ok) {
        router.push("/account/profile");
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.error ?? "儲存失敗，請稍後再試。");
      }
    } catch {
      setError("儲存失敗，請稍後再試。");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="site-container flex min-h-[calc(100svh-4rem)] items-center py-16">
      <GlassCard className="mx-auto w-full max-w-lg p-6 sm:p-8">
        <p className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-divine-gold">
          <Sparkles className="size-4" aria-hidden="true" /> 旅者入會
        </p>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-platinum">完善你的旅者身分</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          這些資訊將用於建立你的會員身分與七界旅誌，協助我們持續優化內容與體驗。
        </p>

        <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
          <div className="grid gap-2">
            <Label>旅者之名（暱稱）</Label>
            <Input
              className="h-11 border-divine-gold/25 bg-deep-space/45"
              placeholder="你在七界的稱呼"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>旅者生辰</Label>
            <Input
              type="date"
              className="h-11 border-divine-gold/25 bg-deep-space/45"
              value={birthdate}
              onChange={(event) => setBirthdate(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>旅者性別</Label>
            <select
              className="h-11 rounded-lg border border-divine-gold/25 bg-deep-space/70 px-3 text-sm"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
            >
              {genders.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <Button
            className="mt-2 h-11 bg-divine-gold text-deep-space hover:bg-platinum"
            disabled={submitting || loading}
            type="submit"
          >
            完成入會，進入七界
          </Button>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </form>
      </GlassCard>
    </div>
  );
}
