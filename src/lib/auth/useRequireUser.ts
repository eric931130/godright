"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useCurrentUser } from "@/lib/auth/useCurrentUser";

export function useRequireUser(redirectTo = "/login") {
  const router = useRouter();
  const state = useCurrentUser();

  useEffect(() => {
    if (!state.loading && !state.user) {
      router.replace(redirectTo);
    }
  }, [redirectTo, router, state.loading, state.user]);

  return state;
}
