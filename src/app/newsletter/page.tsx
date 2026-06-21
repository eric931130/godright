"use client";

import { useState } from "react";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { Input } from "@/components/ui/input";

const topics = ["小說更新", "電子書上架", "貼圖與周邊", "活動通知", "新角色公開", "優惠通知"];

export default function NewsletterPage() {
  const [success, setSuccess] = useState(false);

  return (
    <div className="site-container flex min-h-[calc(100svh-4rem)] items-center py-16">
      <GlassCard className="mx-auto w-full max-w-2xl p-6 sm:p-8">
        <Badge>Newsletter</Badge>
        <h1 className="mt-4 font-serif text-4xl text-platinum">訂閱消息</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          提交後先顯示 mock success。未來可寫入 Supabase `newsletter_subscriptions` 或串接 Email service。
        </p>
        <form className="mt-6 grid gap-4" onSubmit={(event) => { event.preventDefault(); setSuccess(true); }}>
          <Input required type="email" placeholder="Email" className="h-11" />
          <Input required placeholder="暱稱" className="h-11" />
          <div className="grid gap-3 sm:grid-cols-2">
            {topics.map((topic) => (
              <label key={topic} className="flex items-center gap-2 rounded-lg border border-platinum/10 bg-deep-space/45 p-3 text-sm text-muted-foreground">
                <input type="checkbox" defaultChecked={topic === "小說更新"} />
                {topic}
              </label>
            ))}
          </div>
          <button className="h-11 rounded-lg bg-divine-gold text-sm font-medium text-deep-space">送出訂閱</button>
        </form>
        {success ? <p className="mt-4 text-sm text-divine-gold">訂閱成功，神諭更新會送往你的信箱。</p> : null}
      </GlassCard>
    </div>
  );
}
