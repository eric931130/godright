"use client";

import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";

import { getFirebaseAuth } from "@/lib/firebase/client";

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      return onAuthStateChanged(getFirebaseAuth(), (nextUser) => {
        setUser(nextUser);
        setLoading(false);
      });
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Firebase Auth is not configured.";
      queueMicrotask(() => {
        setError(message);
        setLoading(false);
      });
      return undefined;
    }
  }, []);

  return { user, loading, error };
}
