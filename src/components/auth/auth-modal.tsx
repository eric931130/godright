"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { KeyRound, UserPlus, X } from "lucide-react";

import { GlassCard } from "@/components/common/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { cn } from "@/lib/utils";

type AuthTab = "login" | "register";

type AuthModalProps = {
  open: boolean;
  tab: AuthTab;
  onTab: (tab: AuthTab) => void;
  onClose: () => void;
};

async function syncProfile(payload: { displayName?: string; subscribe?: boolean }) {
  const token = await getFirebaseAuth().currentUser?.getIdToken();
  if (!token) return;
  await fetch("/api/users/profile", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

async function getLoginTarget() {
  const token = await getFirebaseAuth().currentUser?.getIdToken(true);
  if (!token) return "/account";
  const response = await fetch("/api/auth/login-target", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json().catch(() => null);
  return typeof data?.target === "string" ? data.target : "/account";
}

async function isOnboarded() {
  try {
    const token = await getFirebaseAuth().currentUser?.getIdToken();
    if (!token) return false;
    const response = await fetch("/api/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json().catch(() => null);
    return Boolean(data?.profile?.onboarded);
  } catch {
    return false;
  }
}

export function AuthModal({ open, tab, onTab, onClose }: AuthModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [subscribe, setSubscribe] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!open) return null;

  function reset() {
    setError("");
    setPassword("");
    setConfirmPassword("");
  }

  function finish(target: string) {
    reset();
    onClose();
    router.push(target);
  }

  // 開發者 → 二次驗證；尚未入會 → onboarding；其餘 → 既有去向。
  async function routeAfterLogin() {
    const target = await getLoginTarget();
    if (target === "/admin-verify") {
      finish(target);
      return;
    }
    finish((await isOnboarded()) ? target : "/account/onboarding");
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
      await syncProfile({});
      await routeAfterLogin();
    } catch {
      setError("登入失敗，請確認 Email 與密碼是否正確。");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleProvider(provider: GoogleAuthProvider | OAuthProvider) {
    setError("");
    setIsSubmitting(true);
    try {
      const result = await signInWithPopup(getFirebaseAuth(), provider);
      await syncProfile({ displayName: result.user.displayName ?? undefined });
      await routeAfterLogin();
    } catch (cause) {
      const code = (cause as { code?: string })?.code;
      setError(code ? `第三方登入失敗：${code}` : "第三方登入失敗，請稍後再試。");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("兩次輸入的密碼不一致。");
      return;
    }
    if (!acceptTerms) {
      setError("請先同意服務條款與隱私權政策。");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await createUserWithEmailAndPassword(getFirebaseAuth(), email, password);
      await updateProfile(result.user, { displayName });
      await syncProfile({ displayName, subscribe });
      finish("/account/onboarding");
    } catch {
      setError("註冊失敗，請確認 Email 格式或密碼強度。");
    } finally {
      setIsSubmitting(false);
    }
  }

  const tabClass = (value: AuthTab) =>
    cn(
      "flex-1 rounded-lg px-4 py-2 text-sm font-medium transition",
      tab === value ? "bg-divine-gold text-deep-space" : "text-muted-foreground hover:text-platinum",
    );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-deep-space/75 p-4 backdrop-blur-sm">
      <button type="button" aria-label="關閉" className="absolute inset-0" onClick={onClose} />
      <GlassCard className="relative w-full max-w-md p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="關閉"
          className="absolute right-4 top-4 rounded-lg bg-deep-space/60 p-1.5 text-muted-foreground transition hover:text-platinum"
        >
          <X className="size-4" />
        </button>

        <div className="flex gap-1 rounded-xl border border-divine-gold/25 bg-deep-space/45 p-1">
          <button type="button" className={tabClass("login")} onClick={() => { onTab("login"); reset(); }}>登入</button>
          <button type="button" className={tabClass("register")} onClick={() => { onTab("register"); reset(); }}>註冊</button>
        </div>

        {tab === "login" ? (
          <form className="mt-6 grid gap-4" onSubmit={handleLogin}>
            <Input required autoComplete="email" className="h-11" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input required autoComplete="current-password" className="h-11" placeholder="密碼" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button className="h-11 bg-divine-gold text-deep-space hover:bg-platinum" disabled={isSubmitting} type="submit">
              <KeyRound className="size-4" />
              登入
            </Button>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button type="button" disabled={isSubmitting} className="border-divine-gold/30 bg-transparent text-platinum hover:bg-divine-gold/10" onClick={() => handleProvider(new GoogleAuthProvider())}>
                Google 登入
              </Button>
              <Button type="button" disabled={isSubmitting} className="border-divine-gold/30 bg-transparent text-platinum hover:bg-divine-gold/10" onClick={() => handleProvider(new OAuthProvider("apple.com"))}>
                Apple 登入
              </Button>
            </div>
          </form>
        ) : (
          <form className="mt-6 grid gap-4" onSubmit={handleRegister}>
            <Input required autoComplete="nickname" className="h-11" placeholder="暱稱" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            <Input required autoComplete="email" className="h-11" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input required autoComplete="new-password" className="h-11" placeholder="密碼" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Input required autoComplete="new-password" className="h-11" placeholder="確認密碼" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <label className="flex items-start gap-2 text-xs leading-6 text-muted-foreground">
              <input required checked={acceptTerms} className="mt-1" type="checkbox" onChange={(e) => setAcceptTerms(e.target.checked)} />
              <span>我已閱讀並同意服務條款與隱私權政策</span>
            </label>
            <label className="flex items-start gap-2 text-xs leading-6 text-muted-foreground">
              <input checked={subscribe} className="mt-1" type="checkbox" onChange={(e) => setSubscribe(e.target.checked)} />
              訂閱小說更新、角色公開、電子書上架與活動通知
            </label>
            <Button className="h-11 bg-divine-gold text-deep-space hover:bg-platinum" disabled={isSubmitting} type="submit">
              <UserPlus className="size-4" />
              建立帳號
            </Button>
          </form>
        )}

        {error ? <p className="mt-4 text-center text-sm text-destructive">{error}</p> : null}
      </GlassCard>
    </div>
  );
}
