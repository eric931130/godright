"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useCurrentUser } from "@/lib/auth/useCurrentUser";

export function useRequireAdmin() {
  const router = useRouter();
  const state = useCurrentUser();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!state.loading && !state.user) {
      router.replace("/login");
      return;
    }

    if (!state.user) return;

    state.user
      .getIdTokenResult()
      .then((token) => {
        const isAdmin = token.claims.admin === true;
        setVerified(isAdmin);
        if (!isAdmin) router.replace("/account");
      })
      .catch(() => router.replace("/login"));
  }, [router, state.loading, state.user]);

  return { ...state, verified };
}
