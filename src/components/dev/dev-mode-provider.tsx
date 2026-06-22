"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type DevModeContextValue = {
  /** 目前帳號是否為「已通過三次 PIN 驗證」的唯一開發者。 */
  isDeveloper: boolean;
  /** 編輯模式是否開啟（僅開發者有意義）。 */
  editing: boolean;
  setEditing: (on: boolean) => void;
  toggleEditing: () => void;
};

const DevModeContext = createContext<DevModeContextValue | null>(null);

export function useDevMode() {
  const context = useContext(DevModeContext);
  if (!context) {
    throw new Error("useDevMode 必須在 DevModeProvider 內使用。");
  }
  return context;
}

const EDIT_KEY = "godright.devEditing";

export function DevModeProvider({ children }: { children: ReactNode }) {
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [editing, setEditingState] = useState(false);

  // 透過 /api/admin/session 判斷是否為已驗證開發者（讀已簽章的驗證 cookie）。
  useEffect(() => {
    let active = true;
    fetch("/api/admin/session")
      .then((response) => (response.ok ? response.json() : { verified: false }))
      .then((data: { verified?: boolean }) => {
        if (active) setIsDeveloper(Boolean(data.verified));
      })
      .catch(() => {
        if (active) setIsDeveloper(false);
      });
    return () => {
      active = false;
    };
  }, []);

  // 還原編輯模式偏好（setTimeout 0 以符合本專案禁止 effect 內同步 setState 的規則）。
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setEditingState(window.sessionStorage.getItem(EDIT_KEY) === "1");
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const setEditing = useCallback((on: boolean) => {
    setEditingState(on);
    try {
      window.sessionStorage.setItem(EDIT_KEY, on ? "1" : "0");
    } catch {
      // sessionStorage 不可用時略過。
    }
  }, []);

  const toggleEditing = useCallback(() => {
    setEditingState((prev) => {
      const next = !prev;
      try {
        window.sessionStorage.setItem(EDIT_KEY, next ? "1" : "0");
      } catch {
        // 略過
      }
      return next;
    });
  }, []);

  return (
    <DevModeContext.Provider value={{ isDeveloper, editing, setEditing, toggleEditing }}>
      {children}
    </DevModeContext.Provider>
  );
}
