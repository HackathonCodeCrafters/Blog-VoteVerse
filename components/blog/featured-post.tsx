"use client";

import { useDarkMode } from "@/context/DarkModeContext";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import BlogImage from "./blog-image";

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

interface FeaturedPostProps {
  post: Post;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
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
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Featured Article
          </h2>
        </div>
        <div
          className={`rounded-3xl overflow-hidden shadow-2xl ${
            darkMode
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-auto">
              <BlogImage
                src={post.image || "/placeholder.svg?height=400&width=600"}
                alt={post.title}
                width={600}
                height={400}
                className="w-full h-full"
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
            <div className="p-8 lg:p-12">
              <div className="flex items-center space-x-4 mb-4">
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
                    {new Date(post.date).toLocaleDateString()}
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
              <Link href={`/blog/${post.slug}`}>
                <h3
                  className={`text-2xl lg:text-3xl font-bold mb-4 hover:text-purple-500 transition-colors cursor-pointer ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {post.title}
                </h3>
              </Link>
              <p
                className={`text-lg mb-6 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 rounded-full text-sm ${
                      darkMode
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>Read Full Article</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
