"use client";

import { createContext, useContext, ReactNode } from "react";
import type { SiteSettings } from "@/lib/settings";

const SettingsContext = createContext<SiteSettings | null>(null);

export function SettingsProvider({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: ReactNode;
}) {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SiteSettings {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
