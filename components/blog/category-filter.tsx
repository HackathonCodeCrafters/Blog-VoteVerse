"use client";

import { useDarkMode } from "@/context/DarkModeContext";
import { BookOpen, Globe, MessageCircle, Shield, Zap } from "lucide-react";

interface Category {
  name: string;
  count: number;
  icon: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const iconMap = {
  BookOpen,
  Zap,
  MessageCircle,
  Shield,
  Globe,
};

export default function CategoryFilter({
  categories,
  selectedCategory = "All",
  onCategoryChange,
}: CategoryFilterProps) {
  const { darkMode } = useDarkMode();

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || BookOpen;
    return <IconComponent size={16} />;
  };

  return (
    <div className="py-8 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onCategoryChange?.(category.name)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                category.name === selectedCategory
                  ? darkMode
                    ? "bg-purple-600 text-white"
                    : "bg-purple-600 text-white"
                  : darkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700"
                  : "bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 border border-gray-300"
              } shadow-lg hover:shadow-xl`}
            >
              {getIcon(category.icon)}
              <span>{category.name}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  category.name === selectedCategory
                    ? "bg-white/20 text-white"
                    : darkMode
                    ? "bg-gray-700 text-gray-400"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
