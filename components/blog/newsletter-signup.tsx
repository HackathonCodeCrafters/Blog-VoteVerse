"use client";

import { useDarkMode } from "@/context/DarkModeContext";

export default function NewsletterSignup() {
  const { darkMode } = useDarkMode();

  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`p-12 rounded-3xl ${
            darkMode
              ? "bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-800"
              : "bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200"
          }`}
        >
          <h2
            className={`text-4xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Stay Updated
          </h2>
          <p
            className={`text-xl mb-8 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Get the latest insights and updates from VoteVerse delivered to your
            inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className={`flex-1 px-6 py-4 rounded-xl border transition-colors ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
              } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
            />
            <button className="px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
