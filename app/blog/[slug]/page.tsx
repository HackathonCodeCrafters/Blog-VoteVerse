import BlogPostContent from "@/components/blog/blog-post-content";
import { getAllBlogSlugs, getBlogPost } from "@/lib/blog-data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// ✅ Updated type for Next.js 15 - params is now a Promise
type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// ✅ Updated generateStaticParams - no changes needed here
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ✅ Updated generateMetadata - await params
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // Await params since it's now a Promise in Next.js 15
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | VoteVerse Blog",
    };
  }

  const baseUrl = "https://blog-voteverse.netlify.app/blog"; // Domain kamu
  const fullUrl = `${baseUrl}/${slug}`;
  const imageUrl = `${baseUrl}${post.image}`;

  return {
    title: `${post.title} | VoteVerse Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: fullUrl,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: imageUrl,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
}

// ✅ Updated page component - await params
export default async function BlogPostPage({ params }: PageProps) {
  // Await params since it's now a Promise in Next.js 15
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostContent post={post} />;
}
