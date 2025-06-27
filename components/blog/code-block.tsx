"use client";

import { useDarkMode } from "@/context/DarkModeContext";
import type React from "react";
import CopyButton from "./copy-button";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const { darkMode } = useDarkMode();
  const code = String(children).replace(/\n$/, "");
  const language = className?.replace(/language-/, "") || "text";

  return (
    <div className="relative group my-6">
      <CopyButton code={code} />

      {/* Language label */}
      {language !== "text" && (
        <div
          className={`absolute top-3 left-4 px-2 py-1 rounded text-xs font-medium z-10 ${
            darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
          }`}
        >
          {language}
        </div>
      )}

      <pre
        className={`p-4 pt-10 rounded-lg overflow-x-auto text-sm border ${
          darkMode
            ? "bg-gray-900 text-gray-100 border-gray-700"
            : "bg-gray-50 text-gray-800 border-gray-200"
        }`}
      >
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}
