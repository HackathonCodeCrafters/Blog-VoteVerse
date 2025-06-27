import { MDXRemote } from "next-mdx-remote/rsc";
import BlogContentArea from "./blog-content-area";
import BlogPostHeader from "./blog-post-header";
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

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const postUrl = `/blog/${post.slug}`;

  return (
    <BlogPostWrapper>
      {/* Header - Client Component */}
      <BlogPostHeader post={post} postUrl={postUrl} />

      {/* Content Area - Mixed Server/Client */}
      <BlogContentArea tags={post.tags}>
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
      </BlogContentArea>
    </BlogPostWrapper>
  );
}
