"use client";

import type { ReactNode } from "react";
import { LockKeyhole, Loader2 } from "lucide-react";

import { GlassCard } from "@/components/common/glass-card";
import { useAuthModal } from "@/components/auth/auth-modal-provider";
import { useCurrentUser } from "@/lib/auth/useCurrentUser";

export default function AccountLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useCurrentUser();
  const { openAuthModal } = useAuthModal();

  if (loading) {
    return (
      <div className="site-container flex min-h-[calc(100svh-4rem)] items-center justify-center py-16 text-muted-foreground">
        <Loader2 className="mr-2 size-5 animate-spin" /> 讀取登入狀態…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="site-container flex min-h-[calc(100svh-4rem)] items-center py-16">
        <GlassCard className="mx-auto max-w-lg p-8 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-lg border border-divine-gold/35 bg-divine-gold/10 text-divine-gold">
            <LockKeyhole className="size-7" aria-hidden="true" />
          </div>
          <h1 className="mt-5 font-serif text-3xl font-semibold text-platinum">會員專區</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            登入會員後即可查看書架、收藏、閱讀進度、訂單與下載紀錄。
          </p>
          <button
            type="button"
            onClick={() => openAuthModal("login")}
            className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-divine-gold px-6 text-sm font-medium text-deep-space transition hover:bg-platinum"
          >
            登入會員
          </button>
        </GlassCard>
      </div>
    );
  }

  return <>{children}</>;
}
