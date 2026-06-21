"use client";

import { useEffect } from "react";

export function FirebaseClientBootstrap() {
  useEffect(() => {
    const hasFirebaseConfig =
      Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY) &&
      Boolean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) &&
      Boolean(process.env.NEXT_PUBLIC_FIREBASE_APP_ID);

    if (!hasFirebaseConfig) {
      return;
    }

    let cancelled = false;

    async function bootFirebase() {
      const firebase = await import("@/lib/firebase/client");

      if (cancelled) {
        return;
      }

      firebase.initializeFirebaseAppCheck();
      await firebase.getFirebaseAnalytics();
    }

    bootFirebase().catch(() => {
      // Firebase analytics/app-check should never block the core reading and shop UX.
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
