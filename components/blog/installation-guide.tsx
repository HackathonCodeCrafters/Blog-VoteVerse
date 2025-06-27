"use client";

import { useDarkMode } from "@/context/DarkModeContext";
import { Package } from "lucide-react";
import CodeBlock from "./code-block";

interface InstallationGuideProps {
  title?: string;
  steps: Array<{
    title: string;
    description?: string;
    code?: string;
    language?: string;
  }>;
}

export default function InstallationGuide({
  title = "Installation Guide",
  steps,
}: InstallationGuideProps) {
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`my-8 p-6 rounded-xl border ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
      }`}
    >
      <div className="flex items-center space-x-2 mb-6">
        <Package size={24} className="text-purple-500" />
        <h3
          className={`text-xl font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h3>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
            </div>
            <div className="flex-1">
              <h4
                className={`font-semibold mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {step.title}
              </h4>
              {step.description && (
                <p
                  className={`mb-3 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {step.description}
                </p>
              )}
              {step.code && (
                <CodeBlock className={`language-${step.language || "bash"}`}>
                  {step.code}
                </CodeBlock>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
