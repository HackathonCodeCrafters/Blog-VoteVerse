"use client";

import type React from "react";

import { useDarkMode } from "@/context/DarkModeContext";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";

interface TechnicalNoteProps {
  type?: "info" | "warning" | "success" | "error";
  title?: string;
  children: React.ReactNode;
}

export default function TechnicalNote({
  type = "info",
  title,
  children,
}: TechnicalNoteProps) {
  const { darkMode } = useDarkMode();

  const getIcon = () => {
    switch (type) {
      case "warning":
        return <AlertTriangle size={20} />;
      case "success":
        return <CheckCircle size={20} />;
      case "error":
        return <XCircle size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  const getColors = () => {
    const baseColors = {
      info: darkMode
        ? "bg-blue-900/20 border-blue-700 text-blue-300"
        : "bg-blue-50 border-blue-200 text-blue-800",
      warning: darkMode
        ? "bg-yellow-900/20 border-yellow-700 text-yellow-300"
        : "bg-yellow-50 border-yellow-200 text-yellow-800",
      success: darkMode
        ? "bg-green-900/20 border-green-700 text-green-300"
        : "bg-green-50 border-green-200 text-green-800",
      error: darkMode
        ? "bg-red-900/20 border-red-700 text-red-300"
        : "bg-red-50 border-red-200 text-red-800",
    };
    return baseColors[type];
  };

  return (
    <div className={`p-4 rounded-lg border-l-4 my-6 ${getColors()}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
        <div className="flex-1">
          {title && <h4 className="font-semibold mb-2">{title}</h4>}
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
