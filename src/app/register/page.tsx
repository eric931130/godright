"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getFirebaseAuth } from "@/lib/firebase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [subscribe, setSubscribe] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("兩次輸入的密碼不一致。");
      return;
    }

    if (!acceptTerms) {
      setError("請先同意服務條款。");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createUserWithEmailAndPassword(getFirebaseAuth(), email, password);
      await updateProfile(result.user, { displayName });
      const token = await result.user.getIdToken();

      await fetch("/api/users/profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ displayName, subscribe }),
      });

      router.push("/account/profile");
    } catch {
      setError("註冊失敗，請確認 Email 格式或密碼強度。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="site-container flex min-h-[calc(100svh-4rem)] items-center py-16">
      <GlassCard className="mx-auto w-full max-w-xl p-6 sm:p-8">
        <Badge>Join</Badge>
        <h1 className="mt-4 font-serif text-4xl text-platinum">註冊讀者帳號</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          建立帳號後會自動產生 10 位 Public UID，可用於後台客服查詢與個人資訊展示。
        </p>
        <form className="mt-6 grid gap-4" onSubmit={handleRegister}>
          <Input
            required
            autoComplete="nickname"
            className="h-11"
            placeholder="暱稱"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
          />
          <Input
            required
            autoComplete="email"
            className="h-11"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            required
            autoComplete="new-password"
            className="h-11"
            placeholder="密碼"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Input
            required
            autoComplete="new-password"
            className="h-11"
            placeholder="確認密碼"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <label className="flex items-start gap-2 text-sm text-muted-foreground">
            <input
              required
              checked={acceptTerms}
              className="mt-1"
              type="checkbox"
              onChange={(event) => setAcceptTerms(event.target.checked)}
            />
            我已閱讀並同意服務條款與隱私權政策
          </label>
          <label className="flex items-start gap-2 text-sm text-muted-foreground">
            <input
              checked={subscribe}
              className="mt-1"
              type="checkbox"
              onChange={(event) => setSubscribe(event.target.checked)}
            />
            訂閱小說更新、角色公開與周邊消息
          </label>
          <Button className="h-11 bg-divine-gold text-deep-space hover:bg-platinum" disabled={isSubmitting} type="submit">
            註冊
          </Button>
        </form>
        {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
        <p className="mt-5 text-sm text-muted-foreground">
          已經有帳號？ <Link className="text-divine-gold" href="/login">登入</Link>
        </p>
      </GlassCard>
    </div>
  );
}
