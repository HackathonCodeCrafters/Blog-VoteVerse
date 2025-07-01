"use client";

import BlogGrid from "@/components/blog/blog-grid";
import BlogHero from "@/components/blog/blog-hero";
import CategoryFilter from "@/components/blog/category-filter";
import DarkModeToggle from "@/components/blog/dark-mode-toggle";
import EmptyState from "@/components/blog/empty-state";
import FeaturedPost from "@/components/blog/featured-post";
import NewsletterSignup from "@/components/blog/newsletter-signup";
import NoResults from "@/components/blog/no-result";
import { useDarkMode } from "@/context/DarkModeContext";
import { getAllBlogPosts } from "@/lib/blog-data";
import type { BlogPost } from "@/types/blog";
import { useEffect, useState } from "react";

const BlogPage = () => {
  const { darkMode } = useDarkMode();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([
    { name: "All", count: 0, icon: "BookOpen" },
    { name: "Technology", count: 0, icon: "Zap" },
    { name: "Tutorial", count: 0, icon: "BookOpen" },
    { name: "Community", count: 0, icon: "MessageCircle" },
    { name: "Security", count: 0, icon: "Shield" },
    { name: "Vision", count: 0, icon: "Globe" },
  ]);

  useEffect(() => {
    async function loadPosts() {
      try {
        // console.log("Loading blog posts...");
        const allPosts = await getAllBlogPosts();
        // console.log("Loaded posts:", allPosts);
        setPosts(allPosts);
        setFilteredPosts(allPosts);
      } catch (err) {
        console.error("Error loading posts:", err);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  // Filter posts based on search and category
  useEffect(() => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          post.author.toLowerCase().includes(query)
      );
    }

    setFilteredPosts(filtered);
  }, [posts, searchQuery, selectedCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Update category counts
  useEffect(() => {
    if (posts.length > 0) {
      const categoryCounts = posts.reduce((acc, post) => {
        acc[post.category] = (acc[post.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const updatedCategories = [
        { name: "All", count: posts.length, icon: "BookOpen" },
        {
          name: "Technology",
          count: categoryCounts.Technology || 0,
          icon: "Zap",
        },
        {
          name: "Tutorial",
          count: categoryCounts.Tutorial || 0,
          icon: "BookOpen",
        },
        {
          name: "Community",
          count: categoryCounts.Community || 0,
          icon: "MessageCircle",
        },
        {
          name: "Security",
          count: categoryCounts.Security || 0,
          icon: "Shield",
        },
        { name: "Vision", count: categoryCounts.Vision || 0, icon: "Globe" },
      ];

      setCategories(updatedCategories);
    }
  }, [posts]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <DarkModeToggle />
        <BlogHero onSearch={handleSearch} />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <DarkModeToggle />
        <BlogHero onSearch={handleSearch} />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-red-500 mb-4">
              Error loading blog posts: {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-purple-500 text-white rounded"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If no posts at all, show empty state
  if (posts.length === 0) {
    return (
      <div
        className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <DarkModeToggle />
        <BlogHero onSearch={handleSearch} />
        <EmptyState />
        <NewsletterSignup />
      </div>
    );
  }

  const featuredPost =
    filteredPosts.find((post) => post.featured) || filteredPosts[0];
  const regularPosts = filteredPosts
    .filter((post) => !post.featured)
    .slice(0, 6);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <DarkModeToggle />
      <BlogHero onSearch={handleSearch} />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      {featuredPost && <FeaturedPost post={featuredPost} />}
      {regularPosts.length > 0 ? (
        <BlogGrid posts={regularPosts} />
      ) : filteredPosts.length === 0 &&
        (searchQuery || selectedCategory !== "All") ? (
        <NoResults
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onClearFilters={handleClearFilters}
        />
      ) : null}
      <NewsletterSignup />
    </div>
  );
};

export default BlogPage;
