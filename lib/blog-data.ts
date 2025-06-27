"use server";

import type { BlogPost } from "@/types/blog";
import fs from "fs";
import matter from "gray-matter";
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
    slug: "how-to-create-your-first-proposal-on-voteverse",
    title: "How to Create Your First Proposal on VoteVerse",
    excerpt: "A step-by-step guide to creating effective proposals.",
    content: null,
    author: "Sarah Chen",
    date: "2025-01-06",
    readTime: "5 min read",
    category: "Tutorial",
    tags: ["Guide", "Proposals", "Getting Started"],
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
  },
];

const contentDirectory = path.join(process.cwd(), "content/blog");

function getFallbackContent(slug: string): string {
  const contentMap: { [key: string]: string } = {
    "understanding-internet-computer-protocol-icp": `# Understanding Internet Computer Protocol (ICP)

## What is ICP?

Internet Computer Protocol (ICP) is a revolutionary blockchain project developed by the DFINITY Foundation. Its main goal is to extend the functionality of the public internet so it can become a global platform where developers can build backend software and applications without requiring traditional servers.

## Key Features of ICP

### Smart Contract Canisters

ICP introduces the concept of **canisters**, which are a form of smart contract capable of running complex logic and storing data directly.

Here is a simple example of a Motoko canister:

\`\`\`motoko
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
- **Cost**: Around 5 dollars per GB per year

## Getting Started with ICP

To get started with ICP development, follow these steps:

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

## Future Vision

ICP aims to return the internet to its roots: **free, open, and without centralized intermediaries**. With a more holistic Web3 architecture, ICP drives the transition towards a new generation internet that is 100% managed by the community.

Ready to build the future of the internet? Start with ICP today!`,

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

  return contentMap[slug] || `# ${slug}\n\nContent coming soon...`;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    // Coba baca dari file markdown dulu
    if (fs.existsSync(contentDirectory)) {
      const filePath = path.join(contentDirectory, `${slug}.md`);

      if (fs.existsSync(filePath)) {
        console.log(`Reading markdown file: ${filePath}`);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContents);

        // Clean content untuk menghindari parsing issues
        const cleanContent = content
          .replace(/\\`\\`\\`/g, "```") // Fix escaped backticks
          .replace(/\\\./g, ".") // Fix escaped dots
          .trim();

        console.log(`Parsed frontmatter for ${slug}:`, data);
        console.log(`Content preview:`, cleanContent.substring(0, 200));

        return {
          id: Number(data.id) || 1,
          slug,
          title: data.title,
          excerpt: data.excerpt,
          content: cleanContent, // Use cleaned content
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
      const content = getFallbackContent(slug);
      console.log(`Using fallback content for: ${slug}`);
      return { ...fallbackPost, content };
    }

    return null;
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);

    // Fallback jika ada error
    const fallbackPost = fallbackPosts.find((post) => post.slug === slug);
    if (fallbackPost) {
      const content = getFallbackContent(slug);
      return { ...fallbackPost, content };
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
        .forEach((file) => {
          const slug = file.replace(/\.md$/, "");
          slugs.add(slug);
          console.log(`Found markdown file: ${slug}`);
        });
    }
  } catch (error) {
    console.error("Error reading blog directory:", error);
  }

  const slugArray = Array.from(slugs);
  console.log("All blog slugs:", slugArray);
  return slugArray;
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

    // Return fallback posts dengan content
    return fallbackPosts.map((post) => ({
      ...post,
      content: getFallbackContent(post.slug),
    }));
  }
}
