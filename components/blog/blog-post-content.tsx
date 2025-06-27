import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Clock,
  Heart,
  Share2,
  User,
} from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import BlogPostWrapper from "./blog-post-wrapper";
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

export default function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <BlogPostWrapper>
      {/* Header */}
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              {post.title}
            </h1>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
              {post.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <User size={16} className="text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {post.author}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar
                  size={16}
                  className="text-gray-500 dark:text-gray-400"
                />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {post.readTime}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                <Heart size={18} />
              </button>
              <button className="p-2 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                <Bookmark size={18} />
              </button>
              <button className="p-2 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-code:text-purple-600 prose-a:text-purple-600 prose-blockquote:text-gray-700 prose-li:text-gray-700 prose-ul:text-gray-700 prose-ol:text-gray-700 dark:prose-invert dark:prose-headings:text-white dark:prose-p:text-gray-300 dark:prose-strong:text-white dark:prose-code:text-purple-400 dark:prose-a:text-purple-400 dark:prose-blockquote:text-gray-300 dark:prose-li:text-gray-300 dark:prose-ul:text-gray-300 dark:prose-ol:text-gray-300">
            {post.content && (
              <MDXRemote
                source={post.content}
                components={components}
                options={{
                  parseFrontmatter: false,
                  mdxOptions: {
                    remarkPlugins: [],
                    rehypePlugins: [],
                  },
                }}
              />
            )}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BlogPostWrapper>
  );
}
