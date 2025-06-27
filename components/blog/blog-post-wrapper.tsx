"use client";

import type React from "react";

import { useDarkMode } from "@/context/DarkModeContext";
import DarkModeToggle from "./dark-mode-toggle";

interface BlogPostWrapperProps {
  children: React.ReactNode;
}

export default function BlogPostWrapper({ children }: BlogPostWrapperProps) {
  const { darkMode } = useDarkMode();

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <DarkModeToggle />
      {children}
    </div>
  );
}
