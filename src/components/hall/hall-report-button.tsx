"use client";

import { useState } from "react";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
import { Flag } from "lucide-react";

import { useAuthModal } from "@/components/auth/auth-modal-provider";
import { getFirebaseApp } from "@/lib/firebase/client";
import { useCurrentUser } from "@/lib/auth/useCurrentUser";

type HallReportButtonProps = {
  targetType: "post" | "comment";
  targetId: string;
  targetPublicUid?: string;
};

export function HallReportButton({ targetType, targetId, targetPublicUid }: HallReportButtonProps) {
  const { user } = useCurrentUser();
  const { openAuthModal } = useAuthModal();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    if (!user) {
      openAuthModal("login");
      return;
    }
    if (!reason.trim()) {
      setError("請填寫檢舉原因。");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await addDoc(collection(getFirestore(getFirebaseApp()), "hallReports"), {
        targetType,
        targetId,
        targetPublicUid: targetPublicUid ?? null,
        reporterUid: user.uid,
        reason: reason.trim(),
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setDone(true);
      setOpen(false);
      setReason("");
    } catch {
      setError("檢舉送出失敗，請稍後再試。");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return <span className="text-xs text-muted-foreground">已檢舉，感謝回報。</span>;
  }

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => (user ? setOpen((value) => !value) : openAuthModal("login"))}
        className="inline-flex items-center gap-1 text-xs text-muted-foreground transition hover:text-destructive"
      >
        <Flag className="size-3.5" aria-hidden="true" /> 檢舉
      </button>
      {open ? (
        <div className="absolute right-0 z-20 mt-2 w-72 rounded-lg border border-divine-gold/30 bg-deep-space/95 p-3 shadow-xl">
          <textarea
            autoFocus
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="請描述不當言論內容"
            className="min-h-20 w-full rounded-md border border-divine-gold/25 bg-deep-space/60 p-2 text-sm text-platinum"
          />
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={submit}
              disabled={busy}
              className="inline-flex h-8 items-center rounded-md bg-divine-gold px-3 text-xs font-medium text-deep-space hover:bg-platinum disabled:opacity-50"
            >
              {busy ? "送出中…" : "送出檢舉"}
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setError("");
              }}
              className="inline-flex h-8 items-center rounded-md border border-platinum/20 px-3 text-xs text-muted-foreground"
            >
              取消
            </button>
          </div>
          {error ? <p className="mt-2 text-xs text-destructive">{error}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
