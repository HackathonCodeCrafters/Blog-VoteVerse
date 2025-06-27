"use client";

import { useDarkMode } from "@/context/DarkModeContext";
import { FileText, Plus } from "lucide-react";

export default function EmptyState() {
  const { darkMode } = useDarkMode();

  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FileText
          size={64}
          className={`mx-auto mb-6 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        />
        <h3
          className={`text-2xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          No Blog Posts Yet
        </h3>
        <p
          className={`text-lg mb-8 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Start creating amazing content by adding your first blog post.
        </p>
        <div
          className={`p-6 rounded-lg border-2 border-dashed ${
            darkMode ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <Plus
            size={32}
            className={`mx-auto mb-4 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          />
          <h4
            className={`text-lg font-semibold mb-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Add Your First Post
          </h4>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Create a new{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
              .md
            </code>{" "}
            file in the{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
              content/blog/
            </code>{" "}
            directory
          </p>
        </div>
      </div>
    </div>
  );
}
