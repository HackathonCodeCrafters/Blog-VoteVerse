"use client";

import { useDarkMode } from "@/context/DarkModeContext";
import { Check, Copy } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const { darkMode } = useDarkMode();
  const [copied, setCopied] = useState(false);

  const code = String(children).replace(/\n$/, "");
  const language = className?.replace(/language-/, "") || "text";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="relative group my-6">
      <button
        onClick={copyToClipboard}
        className={`absolute top-4 right-4 p-2 rounded-lg transition-all duration-200 z-10 ${
          darkMode
            ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
            : "bg-gray-200 hover:bg-gray-300 text-gray-600"
        } opacity-0 group-hover:opacity-100`}
        title="Copy code"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>

      {/* Language label */}
      {language !== "text" && (
        <div
          className={`absolute top-4 left-4 px-2 py-1 rounded text-xs font-medium ${
            darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"
          }`}
        >
          {language}
        </div>
      )}

      <pre
        className={`p-4 pt-12 rounded-lg overflow-x-auto text-sm ${
          darkMode
            ? "bg-gray-800 text-gray-300 border border-gray-700"
            : "bg-gray-100 text-gray-800 border border-gray-200"
        }`}
      >
        <code className={className} style={{ color: "inherit" }}>
          {children}
        </code>
      </pre>
    </div>
  );
}
