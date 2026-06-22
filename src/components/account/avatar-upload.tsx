"use client";

import { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Camera, Loader2 } from "lucide-react";

import { getFirebaseStorage } from "@/lib/firebase/client";
import { useCurrentUser } from "@/lib/auth/useCurrentUser";
import { cn } from "@/lib/utils";

const MAX_BYTES = 30 * 1024 * 1024;
const ACCEPT = /^image\/(jpeg|jpg|png|webp)$/;

export function AvatarUpload() {
  const { user } = useCurrentUser();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) return;
    const timer = window.setTimeout(async () => {
      try {
        const token = await user.getIdToken();
        const response = await fetch("/api/users/profile", { headers: { Authorization: `Bearer ${token}` } });
        const data = await response.json().catch(() => null);
        if (data?.profile?.avatarUrl) setAvatarUrl(data.profile.avatarUrl);
      } catch {
        // 忽略：未設定 Firebase 時無頭像。
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [user]);

  async function onFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !user) return;
    if (!ACCEPT.test(file.type)) {
      setMessage("僅支援 JPG / PNG / WEBP。");
      return;
    }
    if (file.size > MAX_BYTES) {
      setMessage("檔案需小於 30MB。");
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const storageRef = ref(getFirebaseStorage(), `avatars/${user.uid}/avatar.${ext}`);
      await uploadBytes(storageRef, file, { contentType: file.type });
      const url = await getDownloadURL(storageRef);

      const token = await user.getIdToken(true);
      const response = await fetch("/api/users/profile", {
        method: "POST",
        headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify({ avatarUrl: url }),
      });
      if (response.ok) {
        setAvatarUrl(url);
        setMessage("頭像已更新。");
      } else {
        setMessage("已上傳，但寫入個人資料失敗。");
      }
    } catch {
      setMessage("上傳失敗，請確認已登入並再試一次。");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className={cn(
          "group relative mx-auto aspect-square w-40 overflow-hidden rounded-lg border border-divine-gold/30 bg-cover bg-center",
          !avatarUrl && "image-placeholder",
        )}
        style={avatarUrl ? { backgroundImage: `url("${avatarUrl}")` } : undefined}
        aria-label="上傳頭像"
      >
        <span className="absolute inset-0 flex items-center justify-center bg-deep-space/55 text-divine-gold opacity-0 transition group-hover:opacity-100">
          {busy ? <Loader2 className="size-6 animate-spin" /> : <Camera className="size-6" />}
        </span>
      </button>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="inline-flex h-9 items-center gap-2 rounded-lg border border-divine-gold/30 bg-deep-space/45 px-4 text-sm text-platinum transition hover:bg-divine-gold/10 disabled:opacity-50"
      >
        <Camera className="size-4" aria-hidden="true" />
        {busy ? "上傳中…" : "上傳頭像"}
      </button>
      <p className="text-center text-xs text-muted-foreground">支援 JPG / PNG / WEBP，最大 30MB。</p>
      {message ? <p className="text-center text-xs text-moon-blue">{message}</p> : null}
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={onFile} />
    </div>
  );
}
