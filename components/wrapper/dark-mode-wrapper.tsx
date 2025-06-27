"use client";
import { useDarkMode } from "@/context/DarkModeContext";

export function DarkModeWrapper({ children }: { children: React.ReactNode }) {
  const { darkMode } = useDarkMode();

  return <div className={darkMode ? "dark" : "light"}>{children}</div>;
}
