"use server";

import type { BlogPost } from "@/types/blog";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

const contentDirectory = path.join(process.cwd(), "content/blog");

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    if (!fs.existsSync(contentDirectory)) {
      // console.log("Content directory not found");
      return null;
    }

    const filePath = path.join(contentDirectory, `${slug}.md`);
    if (!fs.existsSync(filePath)) {
      // console.log(`File ${slug}.md not found`);
      return null;
    }

    // console.log(`Reading markdown file: ${filePath}`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    // Clean content untuk menghindari parsing issues
    const cleanContent = content
      .replace(/\\`\\`\\`/g, "```") // Fix escaped backticks
      .replace(/\\\./g, ".") // Fix escaped dots
      .trim();

    // console.log(`Parsed frontmatter for ${slug}:`, data);

    return {
      id: Number(data.id) || 1,
      slug,
      title: data.title || "Untitled Post",
      excerpt: data.excerpt || "No excerpt available",
      content: cleanContent,
      author: data.author || "Anonymous",
      date: data.date || new Date().toISOString().split("T")[0],
      readTime: data.readTime || "5 min read",
      category: data.category || "General",
      tags: data.tags || [],
      image: data.image || "/placeholder.svg?height=400&width=800",
      featured: data.featured || false,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    if (!fs.existsSync(contentDirectory)) {
      // console.log("Content directory not found");
      return [];
    }

    const files = fs.readdirSync(contentDirectory);
    const mdFiles = files.filter((file) => file.endsWith(".md"));

    if (mdFiles.length === 0) {
      // console.log("No markdown files found");
      return [];
    }

    const slugs = mdFiles.map((file) => {
      const slug = file.replace(/\.md$/, "");
      // console.log(`Found markdown file: ${slug}`);
      return slug;
    });

    return slugs;
  } catch (error) {
    console.error("Error reading blog directory:", error);
    return [];
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const slugs = await getAllBlogSlugs();

    if (slugs.length === 0) {
      // console.log("No blog posts found");
      return [];
    }

    const posts = await Promise.all(
      slugs.map(async (slug) => {
        const post = await getBlogPost(slug);
        return post;
      })
    );

    return posts
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error getting all blog posts:", error);
    return [];
  }
}
