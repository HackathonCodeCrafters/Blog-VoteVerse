import BlogPostContent from "@/components/blog/blog-post-content";
import { getAllBlogSlugs, getBlogPost } from "@/lib/blog-data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found | VoteVerse Blog",
    };
  }

  const baseUrl = "https://blog-voteverse.netlify.app/blog"; // Ganti dengan domain kamu
  const fullUrl = `${baseUrl}/blog/${params.slug}`;
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

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);

  if (!post) notFound();

  return <BlogPostContent post={post} />;
}
