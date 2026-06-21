"use client";

import { useState } from "react";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { Input } from "@/components/ui/input";

export default function AccountSettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="site-container py-10 sm:py-14">
      <GlassCard className="mx-auto max-w-2xl p-6 sm:p-8">
        <Badge>Settings</Badge>
        <h1 className="mt-4 font-serif text-4xl text-platinum">帳號設定</h1>
        <p className="mt-3 text-sm text-muted-foreground">目前為 mock 設定表單，未來可接 Supabase profiles。</p>
        <form className="mt-6 grid gap-4" onSubmit={(event) => { event.preventDefault(); setSaved(true); }}>
          <Input placeholder="暱稱" defaultValue="天命讀者" className="h-11" />
          <Input type="email" placeholder="Email" defaultValue="reader@godright.example.com" className="h-11" />
          <Input placeholder="顯示名稱" defaultValue="最後天命追隨者" className="h-11" />
          <label className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" defaultChecked /> 接收小說更新</label>
          <label className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" defaultChecked /> 接收商品優惠</label>
          <button className="h-11 rounded-lg bg-divine-gold text-sm font-medium text-deep-space">儲存設定</button>
        </form>
        {saved ? <p className="mt-4 text-sm text-divine-gold">Mock 設定已儲存。</p> : null}
      </GlassCard>
    </div>
  );
}
