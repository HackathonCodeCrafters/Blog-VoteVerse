"use client";

import { useDarkMode } from "@/context/DarkModeContext";
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Clock,
  Heart,
  Share2,
  User,
} from "lucide-react";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import CodeBlock from "./code-block";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any; // MDX serialized content
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
}

interface BlogPostContentProps {
  post: BlogPost;
}

const components = {
  pre: CodeBlock,
};

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const { darkMode } = useDarkMode();

  const getCategoryColor = (category: string) => {
    const colors = {
      Technology: "from-blue-500 to-cyan-500",
      Tutorial: "from-green-500 to-emerald-500",
      Community: "from-purple-500 to-pink-500",
      Security: "from-red-500 to-orange-500",
      Vision: "from-yellow-500 to-orange-500",
      Economics: "from-indigo-500 to-purple-500",
    };
    return (
      colors[category as keyof typeof colors] || "from-gray-500 to-gray-600"
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Header */}
      <div className="py-8 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className={`inline-flex items-center space-x-2 text-sm font-medium mb-8 hover:text-purple-500 transition-colors ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
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
            <h1
              className={`text-4xl md:text-5xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {post.title}
            </h1>
            <p
              className={`text-xl mb-8 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {post.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <User
                  size={16}
                  className={darkMode ? "text-gray-400" : "text-gray-500"}
                />
                <span
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {post.author}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar
                  size={16}
                  className={darkMode ? "text-gray-400" : "text-gray-500"}
                />
                <span
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock
                  size={16}
                  className={darkMode ? "text-gray-400" : "text-gray-500"}
                />
                <span
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {post.readTime}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                className={`p-2 rounded-lg transition-colors ${
                  darkMode
                    ? "hover:bg-gray-800 text-gray-400"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <Heart size={18} />
              </button>
              <button
                className={`p-2 rounded-lg transition-colors ${
                  darkMode
                    ? "hover:bg-gray-800 text-gray-400"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <Bookmark size={18} />
              </button>
              <button
                className={`p-2 rounded-lg transition-colors ${
                  darkMode
                    ? "hover:bg-gray-800 text-gray-400"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`prose prose-lg max-w-none ${
              darkMode
                ? "prose-invert prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-code:text-purple-400 prose-a:text-purple-400 prose-blockquote:text-gray-300 prose-li:text-gray-300 prose-ul:text-gray-300 prose-ol:text-gray-300"
                : "prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-code:text-purple-600 prose-a:text-purple-600 prose-blockquote:text-gray-700 prose-li:text-gray-700 prose-ul:text-gray-700 prose-ol:text-gray-700"
            }`}
            style={{
              color: darkMode ? "#d1d5db" : "#374151",
            }}
          >
            <MDXRemote {...post.content} components={components} />
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
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
    </div>
  );
}
