"use client";

import { useDarkMode } from "@/context/DarkModeContext";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import SocialShare from "./social-share";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}

interface BlogPostHeaderProps {
  post: BlogPost;
  postUrl: string;
}

function getCategoryColor(category: string) {
  const colors = {
    Technology: "from-blue-500 to-cyan-500",
    Tutorial: "from-green-500 to-emerald-500",
    Community: "from-purple-500 to-pink-500",
    Security: "from-red-500 to-orange-500",
    Vision: "from-yellow-500 to-orange-500",
    Economics: "from-indigo-500 to-purple-500",
  };
  return colors[category as keyof typeof colors] || "from-gray-500 to-gray-600";
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // If invalid date, use current date
      return new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    // Fallback to current date
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}

export default function BlogPostHeader({ post, postUrl }: BlogPostHeaderProps) {
  const { darkMode } = useDarkMode();

  return (
    <div className="py-8 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 text-sm font-medium mb-8 text-gray-600 dark:text-gray-400 hover:text-purple-500 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Blog</span>
        </Link>

        <div className="mb-6">
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${getCategoryColor(
              post.category
            )} mb-4`}
          >
            {post.category}
          </span>
          {/* Use conditional styling based on darkMode state */}
          <h1
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {post.title}
          </h1>
          <p
            className={`text-xl mb-8 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {post.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <User size={16} className="text-gray-500 dark:text-gray-400" />
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {post.author}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar
                size={16}
                className="text-gray-500 dark:text-gray-400"
              />
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {formatDate(post.date)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-gray-500 dark:text-gray-400" />
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {post.readTime}
              </span>
            </div>
          </div>

          <SocialShare
            title={post.title}
            url={postUrl}
            excerpt={post.excerpt}
          />
        </div>
      </div>
    </div>
  );
}
