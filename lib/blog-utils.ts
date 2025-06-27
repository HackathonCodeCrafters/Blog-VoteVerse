import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";

const contentDirectory = path.join(process.cwd(), "content/blog");

// Fallback data jika folder content belum ada
const fallbackPosts = [
  {
    id: 1,
    slug: "understanding-internet-computer-protocol-icp",
    title:
      "Understanding Internet Computer Protocol (ICP): The Future of Decentralized Internet",
    excerpt:
      "Explore how ICP is revolutionizing web development by enabling fully on-chain applications without traditional cloud infrastructure.",
    content: `# Understanding ICP\n\nThis is a sample blog post about Internet Computer Protocol.\n\n## What is ICP?\n\nICP is a revolutionary blockchain project...`,
    author: "Alex Rodriguez",
    date: "2025-01-08",
    readTime: "15 min read",
    category: "Technology",
    tags: ["ICP", "Blockchain", "Technology"],
    image: "/placeholder.svg?height=400&width=800",
    featured: true,
  },
  {
    id: 2,
    slug: "how-to-create-your-first-proposal-on-voteverse",
    title: "How to Create Your First Proposal on VoteVerse",
    excerpt:
      "A step-by-step guide to creating effective proposals that engage your community and drive meaningful decisions.",
    content: `# Creating Your First Proposal\n\nThis guide will help you create effective proposals on VoteVerse.\n\n## Getting Started\n\nFollow these steps...`,
    author: "Sarah Chen",
    date: "2025-01-10",
    readTime: "5 min read",
    category: "Tutorial",
    tags: ["Guide", "Proposals", "Getting Started"],
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
  },
];

export async function getBlogPost(slug: string) {
  try {
    if (!fs.existsSync(contentDirectory)) {
      console.log("Content directory not found, using fallback data");
      const fallbackPost = fallbackPosts.find((post) => post.slug === slug);
      if (fallbackPost) {
        const mdxSource = await serialize(fallbackPost.content);
        return { ...fallbackPost, content: mdxSource };
      }
      return null;
    }

    const filePath = path.join(contentDirectory, `${slug}.md`);
    if (!fs.existsSync(filePath)) {
      console.log(`File ${slug}.md not found, using fallback`);
      const fallbackPost = fallbackPosts.find((post) => post.slug === slug);
      if (fallbackPost) {
        const mdxSource = await serialize(fallbackPost.content);
        return { ...fallbackPost, content: mdxSource };
      }
      return null;
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const mdxSource = await serialize(content);

    return {
      id: data.id || 1,
      slug,
      title: data.title,
      excerpt: data.excerpt,
      content: mdxSource,
      author: data.author,
      date: data.date,
      readTime: data.readTime,
      category: data.category,
      tags: data.tags || [],
      image: data.image || "/placeholder.svg?height=400&width=800",
      featured: data.featured || false,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

export async function getAllBlogSlugs() {
  try {
    if (!fs.existsSync(contentDirectory)) {
      return fallbackPosts.map((post) => post.slug);
    }

    const files = fs.readdirSync(contentDirectory);
    const mdFiles = files.filter((file) => file.endsWith(".md"));

    if (mdFiles.length === 0) {
      return fallbackPosts.map((post) => post.slug);
    }

    return mdFiles.map((file) => file.replace(/\.md$/, ""));
  } catch (error) {
    console.error("Error reading blog directory:", error);
    return fallbackPosts.map((post) => post.slug);
  }
}
