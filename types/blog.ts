export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: unknown;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured?: boolean;
}

export interface Category {
  name: string;
  count: number;
  icon: string;
}

// Add Post type alias for compatibility
export type Post = BlogPost;
