"use client";

import { useDarkMode } from "@/context/DarkModeContext";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  code: string;
}

export default function CopyButton({ code }: CopyButtonProps) {
  const { darkMode } = useDarkMode();
  const [copied, setCopied] = useState(false);

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
    <button
      onClick={copyToClipboard}
      className={`absolute top-4 right-4 p-2 rounded-lg transition-all duration-200 z-10 opacity-0 group-hover:opacity-100 ${
        darkMode
          ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
          : "bg-gray-200 hover:bg-gray-300 text-gray-600"
      }`}
      title="Copy code"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}
