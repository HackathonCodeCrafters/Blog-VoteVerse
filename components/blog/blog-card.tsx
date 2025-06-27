"use client";

import { useDarkMode } from "@/context/DarkModeContext";
import { Calendar, Clock, Heart, Share2, User } from "lucide-react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  slug: string;
}

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
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
    <Link href={`/blog/${post.slug}`}>
      <article
        className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer ${
          darkMode
            ? "bg-gray-800 border border-gray-700"
            : "bg-white border border-gray-200"
        }`}
      >
        <div className="relative">
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${getCategoryColor(
                post.category
              )}`}
            >
              {post.category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-3 text-sm">
            <div className="flex items-center space-x-1">
              <User
                size={14}
                className={darkMode ? "text-gray-400" : "text-gray-500"}
              />
              <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                {post.author}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar
                size={14}
                className={darkMode ? "text-gray-400" : "text-gray-500"}
              />
              <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                {new Date(post.date).toLocaleDateString()}
              </span>
            </div>
          </div>
          <h3
            className={`text-xl font-bold mb-3 group-hover:text-purple-500 transition-colors ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {post.title}
          </h3>
          <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {post.excerpt}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className={`px-2 py-1 rounded-full text-xs ${
                  darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Clock
                size={14}
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
            <div className="flex items-center space-x-2">
              <button
                className={`p-2 rounded-lg transition-colors ${
                  darkMode
                    ? "hover:bg-gray-700 text-gray-400"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <Heart size={16} />
              </button>
              <button
                className={`p-2 rounded-lg transition-colors ${
                  darkMode
                    ? "hover:bg-gray-700 text-gray-400"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
