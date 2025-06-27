"use client";

import { useDarkMode } from "@/context/DarkModeContext";
import { FileX, Search } from "lucide-react";

interface NoResultsProps {
  searchQuery?: string;
  selectedCategory?: string;
  onClearFilters?: () => void;
}

export default function NoResults({
  searchQuery,
  selectedCategory,
  onClearFilters,
}: NoResultsProps) {
  const { darkMode } = useDarkMode();

  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FileX
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
          No Articles Found
        </h3>
        <p
          className={`text-lg mb-8 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {searchQuery && selectedCategory !== "All"
            ? `No articles found for "${searchQuery}" in ${selectedCategory} category.`
            : searchQuery
            ? `No articles found for "${searchQuery}".`
            : selectedCategory !== "All"
            ? `No articles found in ${selectedCategory} category.`
            : "No articles found."}
        </p>
        <button
          onClick={onClearFilters}
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
        >
          <Search size={20} />
          <span>Clear Filters</span>
        </button>
      </div>
    </div>
  );
}
