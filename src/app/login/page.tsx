"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getFirebaseAuth } from "@/lib/firebase/client";

async function syncProfile(displayName?: string) {
  const auth = getFirebaseAuth();
  const token = await auth.currentUser?.getIdToken();
  if (!token) return;

  await fetch("/api/users/profile", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ displayName }),
  });
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function finishLogin(displayName?: string) {
    await syncProfile(displayName);
    const tokenResult = await getFirebaseAuth().currentUser?.getIdTokenResult(true);
    router.push(tokenResult?.claims.admin === true ? "/admin-verify" : "/account");
  }

  async function handleEmailLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
      await finishLogin();
    } catch {
      setError("登入失敗，請確認 Email 與密碼。");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleProviderLogin(provider: GoogleAuthProvider | OAuthProvider) {
    setError("");
    setIsSubmitting(true);
    try {
      const result = await signInWithPopup(getFirebaseAuth(), provider);
      await finishLogin(result.user.displayName ?? undefined);
    } catch {
      setError("第三方登入失敗，請稍後再試。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="site-container flex min-h-[calc(100svh-4rem)] items-center py-16">
      <GlassCard className="mx-auto w-full max-w-lg p-6 sm:p-8">
        <Badge>Firebase Auth</Badge>
        <h1 className="mt-4 font-serif text-4xl text-platinum">登入七界</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          一般讀者登入後可管理書架、收藏與閱讀進度；開發者帳號會進入神權封印驗證。
        </p>
        <form className="mt-6 grid gap-4" onSubmit={handleEmailLogin}>
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
            autoComplete="current-password"
            className="h-11"
            placeholder="密碼"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <label className="flex items-center gap-2">
              <input
                checked={rememberMe}
                type="checkbox"
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              記住我
            </label>
            <Link className="text-divine-gold" href="/account/settings">
              忘記密碼
            </Link>
          </div>
          <Button className="h-11 bg-divine-gold text-deep-space hover:bg-platinum" disabled={isSubmitting} type="submit">
            登入
          </Button>
        </form>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Button
            className="border-divine-gold/30 bg-transparent text-platinum hover:bg-divine-gold/10"
            disabled={isSubmitting}
            type="button"
            onClick={() => handleProviderLogin(new GoogleAuthProvider())}
          >
            Google
          </Button>
          <Button
            className="border-divine-gold/30 bg-transparent text-platinum hover:bg-divine-gold/10"
            disabled={isSubmitting}
            type="button"
            onClick={() => handleProviderLogin(new OAuthProvider("apple.com"))}
          >
            Apple
          </Button>
        </div>

        {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
        <p className="mt-5 text-sm text-muted-foreground">
          還沒有帳號？ <Link className="text-divine-gold" href="/register">註冊</Link>
        </p>
      </GlassCard>
    </div>
  );
}
