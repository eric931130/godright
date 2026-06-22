"use client";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";

type RegistrationLoadingViewProps = {
  progress: number;
};

export function RegistrationLoadingView({ progress }: RegistrationLoadingViewProps) {
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <main className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-deep-space" />
      <div className="temple-grid absolute inset-0 -z-10 opacity-70" />
      <div className="star-field animate-slow-drift absolute inset-0 -z-10 opacity-45" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_18%,rgba(217,180,95,0.24),transparent_20rem),radial-gradient(circle_at_80%_28%,rgba(109,77,255,0.28),transparent_26rem),linear-gradient(180deg,rgba(8,8,20,0.35),rgba(8,8,20,0.92))]" />
      <div className="site-container flex min-h-[calc(100svh-4rem)] items-center py-16">
        <GlassCard className="mx-auto w-full max-w-2xl p-6 text-center sm:p-8">
          <Badge tone="purple">Traveler Gate</Badge>
          <h1 className="mt-5 font-serif text-3xl font-semibold leading-tight text-platinum sm:text-5xl">
            正在開啟天命旅程
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            七界星門正在確認旅者印記，請稍候片刻。
          </p>

          <div
            aria-label="註冊完成載入進度"
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={safeProgress}
            className="mx-auto mt-8 h-4 w-full max-w-xl overflow-hidden rounded-full border border-divine-gold/35 bg-deep-space/70 shadow-[0_0_34px_rgba(217,180,95,0.18)]"
            role="progressbar"
          >
            <div
              className="relative h-full rounded-full bg-[linear-gradient(90deg,#ffe8a8,#d9b45f,#b98f3e,#f3cf7a,#d9a7ff,#8f73ff,#6d4dff,#4d32c7)] transition-[width] duration-100 ease-out"
              style={{ width: `${safeProgress}%` }}
            >
              <span className="absolute inset-0 animate-[traveler-shimmer_1.45s_linear_infinite] bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.42)_24%,transparent_48%)] bg-[length:220%_100%]" />
            </div>
          </div>

          <p className="mt-4 text-xs font-medium text-divine-gold">
            何謂宿命?何謂天命?開始探險吧!旅者
          </p>
        </GlassCard>
      </div>
    </main>
  );
}
