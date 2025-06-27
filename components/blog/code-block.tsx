import type React from "react";
import CopyButton from "./copy-button";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const code = String(children).replace(/\n$/, "");
  const language = className?.replace(/language-/, "") || "text";

  return (
    <div className="relative group my-6">
      <CopyButton code={code} />

      {/* Language label */}
      {language !== "text" && (
        <div className="absolute top-4 left-4 px-2 py-1 rounded text-xs font-medium bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
          {language}
        </div>
      )}

      <pre className="p-4 pt-12 rounded-lg overflow-x-auto text-sm bg-gray-100 text-gray-800 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700">
        <code className={className} style={{ color: "inherit" }}>
          {children}
        </code>
      </pre>
    </div>
  );
}
