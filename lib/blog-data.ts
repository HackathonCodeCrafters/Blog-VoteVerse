"use server";

import type { BlogPost } from "@/types/blog";
import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";

// Fallback posts yang akan selalu ada
const fallbackPosts: BlogPost[] = [
  {
    id: 1,
    slug: "understanding-internet-computer-protocol-icp",
    title:
      "🚀 Understanding Internet Computer Protocol (ICP): The Future of Decentralized Internet",
    excerpt:
      "Explore how ICP is revolutionizing web development by enabling fully on-chain applications without traditional cloud infrastructure, complete with technical examples and implementation guides.",
    content: null,
    author: "Alex Rodriguez",
    date: "2025-01-08",
    readTime: "15 min read",
    category: "Technology",
    tags: [
      "ICP",
      "Blockchain",
      "Web3",
      "Motoko",
      "DFINITY",
      "SmartContract",
      "DecentralizedApps",
    ],
    image: "/placeholder.svg?height=400&width=800",
    featured: true,
  },
  {
    id: 2,
    slug: "sample-post",
    title: "Sample Blog Post",
    excerpt: "This is a sample blog post to test the markdown system.",
    content: null,
    author: "Blog Author",
    date: "2025-01-07", // Changed date to be older
    readTime: "5 min read",
    category: "Technology",
    tags: ["Sample", "Test", "Markdown"],
    image: "/placeholder.svg?height=400&width=800",
    featured: false, // Changed to false so ICP is featured
  },
  {
    id: 3,
    slug: "how-to-create-your-first-proposal-on-voteverse",
    title: "How to Create Your First Proposal on VoteVerse",
    excerpt: "A step-by-step guide to creating effective proposals.",
    content: null,
    author: "Sarah Chen",
    date: "2025-01-06", // Changed date to be older
    readTime: "5 min read",
    category: "Tutorial",
    tags: ["Guide", "Proposals", "Getting Started"],
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
  },
];

const contentDirectory = path.join(process.cwd(), "content/blog");

async function serializeFallbackContent(slug: string): Promise<unknown> {
  const contentMap: { [key: string]: string } = {
    "understanding-internet-computer-protocol-icp": `# 🚀 Understanding Internet Computer Protocol (ICP): The Future of Decentralized Internet

## What is ICP?

Internet Computer Protocol (ICP) is a revolutionary blockchain project developed by the DFINITY Foundation. Its main goal is to extend the functionality of the public internet so it can become a global platform where developers can build backend software and applications without requiring traditional servers or centralized cloud services like AWS or Google Cloud.

## 🔍 Key Features of ICP

### Smart Contract Canisters

ICP introduces the concept of **canisters**, which are a form of smart contract capable of running complex logic and storing data directly.

\`\`\`motoko
// Example: Simple blog canister in Motoko
import Time "mo:base/Time";
import Array "mo:base/Array";

actor BlogCanister {
    type Post = {
        id: Nat;
        title: Text;
        content: Text;
        author: Text;
        timestamp: Int;
        likes: Nat;
    };

    private stable var posts : [Post] = [];
    private stable var nextId : Nat = 0;

    public func createPost(title: Text, content: Text, author: Text) : async Nat {
        let post : Post = {
            id = nextId;
            title = title;
            content = content;
            author = author;
            timestamp = Time.now();
            likes = 0;
        };
        
        posts := Array.append(posts, [post]);
        nextId += 1;
        post.id
    };

    public query func getPosts() : async [Post] {
        posts
    };
}
\`\`\`

### Performance Benefits

- **Finality**: 1-2 seconds
- **Throughput**: 11,500+ queries per second  
- **Storage**: Unlimited on-chain storage
- **Cost**: ~$5 per GB per year

## 🛠️ Getting Started with ICP

\`\`\`bash
# Install DFX SDK
sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"

# Create new project
dfx new my_first_dapp
cd my_first_dapp

# Start local development
dfx start --background
dfx deploy
\`\`\`

## 🌍 Future Vision

ICP aims to return the internet to its roots: **free, open, and without centralized intermediaries**. With a more holistic Web3 architecture, ICP drives the transition towards a new generation internet that's 100% managed by the community.

Ready to build the future of the internet? Start with ICP today!`,
    "sample-post": `# Sample Blog Post

This is a sample blog post written in Markdown.

## Features

- **Markdown support**: Write content in simple markdown
- **Frontmatter**: Metadata at the top of each file
- **Code blocks**: Syntax highlighting included

\`\`\`javascript
function hello() {
  console.log("Hello from markdown!");
}
\`\`\`

## Getting Started

1. Create a \`.md\` file in \`content/blog/\`
2. Add frontmatter at the top
3. Write your content in markdown
4. The system will automatically generate the page

That's it! Your blog system is ready to use.`,
    "how-to-create-your-first-proposal-on-voteverse": `# How to Create Your First Proposal on VoteVerse

Creating effective proposals is key to successful governance.

## Steps to Success

1. **Research thoroughly**
2. **Engage with community**
3. **Write clearly**
4. **Provide examples**

## Best Practices

- Be specific about goals
- Include realistic timelines
- Address potential concerns
- Show community benefit

Start small and build your reputation in the community!`,
  };

  const content = contentMap[slug] || `# ${slug}\n\nContent coming soon...`;
  return await serialize(content);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    // Coba baca dari file markdown dulu
    if (fs.existsSync(contentDirectory)) {
      const filePath = path.join(contentDirectory, `${slug}.md`);

      if (fs.existsSync(filePath)) {
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContents);
        const mdxSource = await serialize(content);

        return {
          id: Number(data.id) || 1,
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
      }
    }

    // Fallback ke data default
    const fallbackPost = fallbackPosts.find((post) => post.slug === slug);
    if (fallbackPost) {
      const mdxSource = await serializeFallbackContent(slug);
      return { ...fallbackPost, content: mdxSource };
    }

    return null;
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);

    // Fallback jika ada error
    const fallbackPost = fallbackPosts.find((post) => post.slug === slug);
    if (fallbackPost) {
      const mdxSource = await serializeFallbackContent(slug);
      return { ...fallbackPost, content: mdxSource };
    }

    return null;
  }
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const slugs = new Set<string>();

  // Tambahkan fallback slugs
  fallbackPosts.forEach((post) => slugs.add(post.slug));

  // Coba baca dari file system
  try {
    if (fs.existsSync(contentDirectory)) {
      const files = fs.readdirSync(contentDirectory);
      files
        .filter((file) => file.endsWith(".md"))
        .forEach((file) => slugs.add(file.replace(/\.md$/, "")));
    }
  } catch (error) {
    console.error("Error reading blog directory:", error);
  }

  return Array.from(slugs);
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const slugs = await getAllBlogSlugs();
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

    // Return fallback posts dengan serialized content
    const postsWithContent = await Promise.all(
      fallbackPosts.map(async (post) => {
        const mdxSource = await serializeFallbackContent(post.slug);
        return { ...post, content: mdxSource };
      })
    );

    return postsWithContent;
  }
}
