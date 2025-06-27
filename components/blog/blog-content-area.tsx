"use client";

import type React from "react";

import { useDarkMode } from "@/context/DarkModeContext";

interface BlogContentAreaProps {
  children: React.ReactNode;
  tags: string[];
}

export default function BlogContentArea({
  children,
  tags,
}: BlogContentAreaProps) {
  const { darkMode } = useDarkMode();

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content with conditional prose classes */}
        <div
          className={`prose prose-lg max-w-none ${
            darkMode ? "prose-invert" : ""
          }`}
        >
          {children}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full text-sm ${
                  darkMode
                    ? "bg-gray-800 text-gray-300"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
