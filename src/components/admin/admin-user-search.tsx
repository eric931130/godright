"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUser } from "@/lib/auth/useCurrentUser";
import type { UserProfile } from "@/lib/users/types";

export function AdminUserSearch() {
  const { user } = useCurrentUser();
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) {
      setMessage("請先登入開發者帳號。");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const token = await user.getIdToken(true);
      const response = await fetch(`/api/admin/users/search?q=${encodeURIComponent(query)}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error ?? "搜尋失敗。");
        return;
      }

      setUsers(data.users ?? []);
      setMessage(data.users?.length ? "" : "沒有找到使用者。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-5">
      <GlassCard className="p-5">
        <form className="grid gap-4 md:grid-cols-[1fr_auto]" onSubmit={onSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="admin-user-query">Public UID / Firebase UID / Email</Label>
            <Input
              className="border-divine-gold/25 bg-deep-space/45"
              id="admin-user-query"
              placeholder="1000000001、Firebase UID 或 email@example.com"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <Button className="self-end bg-divine-gold text-deep-space hover:bg-platinum" disabled={loading || !query}>
            <Search className="size-4" />
            搜尋
          </Button>
        </form>
        {message ? <p className="mt-3 text-sm text-muted-foreground">{message}</p> : null}
      </GlassCard>

      <div className="grid gap-4">
        {users.map((profile) => (
          <GlassCard key={profile.firebaseUid} className="p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-semibold text-platinum">{profile.displayName}</h2>
                  <Badge tone={profile.role === "admin" ? "gold" : profile.role === "vip" ? "purple" : "blue"}>
                    {profile.role}
                  </Badge>
                  {profile.isBanned ? <Badge tone="purple">已停權</Badge> : null}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{profile.email}</p>
                <p className="mt-1 break-all text-xs text-muted-foreground">
                  Firebase UID：{profile.firebaseUid}
                </p>
              </div>
              <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-3 lg:min-w-[28rem]">
                <span>Public UID：{profile.publicUid}</span>
                <span>付費章節：{profile.purchaseStats.totalPaidChapters}</span>
                <span>總消費：NT$ {profile.purchaseStats.totalSpent}</span>
              </div>
              <Link
                className="text-sm font-medium text-divine-gold hover:text-platinum"
                href={`/admin/users/${profile.publicUid}`}
              >
                查看詳情
              </Link>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
