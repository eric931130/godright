"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

import { AuthModal } from "@/components/auth/auth-modal";

type AuthTab = "login" | "register";

type AuthModalContextValue = {
  openAuthModal: (tab?: AuthTab) => void;
  closeAuthModal: () => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal 必須在 AuthModalProvider 內使用。");
  }
  return context;
}

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<AuthTab>("login");

  const openAuthModal = useCallback((nextTab: AuthTab = "login") => {
    setTab(nextTab);
    setOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => setOpen(false), []);

  return (
    <AuthModalContext.Provider value={{ openAuthModal, closeAuthModal }}>
      {children}
      <AuthModal open={open} tab={tab} onTab={setTab} onClose={closeAuthModal} />
    </AuthModalContext.Provider>
  );
}
