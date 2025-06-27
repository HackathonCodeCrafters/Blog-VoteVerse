"use client";

import { useDarkMode } from "@/context/DarkModeContext";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className={`fixed top-4 right-4 z-50 p-3 rounded-full transition-all duration-300 ${
        darkMode
          ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
          : "bg-white text-gray-700 hover:bg-gray-100 shadow-lg"
      }`}
      aria-label="Toggle dark mode"
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
