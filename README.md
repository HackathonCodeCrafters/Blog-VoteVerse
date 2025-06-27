# VoteVerse Blog System

A modern, full-stack blog system built with Next.js 15, TypeScript, and Tailwind CSS. Features MDX support for rich content, dark/light mode, social sharing, and interactive components.

## ✨ Features

- 🚀 **Next.js 15** with App Router
- 📝 **MDX Support** for rich content with React components
- 🎨 **Tailwind CSS** for styling
- 🌙 **Dark/Light Mode** toggle with persistent state
- 💻 **Syntax Highlighting** with copy functionality
- 📱 **Responsive Design** for all devices
- 🔍 **Search & Filter** functionality
- 📊 **Social Sharing** (Twitter, Facebook, LinkedIn)
- ❤️ **Interactive Features** (Like, Bookmark, Share)
- 🔍 **SEO Optimized** with metadata generation
- ⚡ **Performance Optimized** with static generation

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX with next-mdx-remote
- **Icons**: Lucide React
- **State Management**: React Context
- **Deployment**: Vercel Ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd voteverse-blog

# Install dependencies
npm install # or yarn install

# Run development server
npm run dev # or yarn dev

# Visit
http://localhost:3000
```

## 📁 Project Structure

```
├── app/
│   ├── blog/
│   │   ├── [slug]/              # Dynamic routes untuk individual blog posts
│   │   │   ├── page.tsx         # Blog post detail page (/blog/my-post-slug)
│   │   │   └── not-found.tsx    # 404 page untuk blog post yang tidak ditemukan
│   │   └── page.tsx             # Blog listing page (/blog)
│   ├── layout.tsx               # Root layout dengan metadata & providers
│   ├── page.tsx                 # Home page (redirect ke /blog)
│   └── globals.css              # Global styles & prose styling untuk MDX
│
├── components/
│   └── blog/
│       ├── layout/                      # Core layout components
│       │   ├── blog-hero.tsx           # Hero section dengan search bar
│       │   ├── blog-grid.tsx           # Grid layout untuk multiple blog cards
│       │   ├── featured-post.tsx       # Large featured post display
│       │   └── newsletter-signup.tsx   # Newsletter subscription section
│       ├── display/                    # Blog post display components
│       │   ├── blog-card.tsx                      # Individual blog post card
│       │   ├── blog-card-with-optimized-image.tsx # Blog card dengan image optimization
│       │   ├── blog-post-content.tsx              # Main blog post content renderer
│       │   ├── blog-post-header.tsx               # Post header (title, meta, social)
│       │   ├── blog-post-wrapper.tsx              # Client wrapper untuk blog posts
│       │   └── blog-content-area.tsx              # Content area dengan prose styling
│       ├── images/                      # Image handling
│       │   ├── blog-image.tsx          # Custom image component untuk blog
│       │   └── optimized-image.tsx     # Next.js Image vs regular img handling
│       ├── filter/                      # Search & filter
│       │   ├── category-filter.tsx     # Category filter buttons
│       │   ├── no-result.tsx           # No search results state
│       │   └── empty-state.tsx         # No blog posts state
│       ├── code/                        # Code & technical
│       │   ├── code-block.tsx          # Syntax highlighted code blocks
│       │   ├── copy-button.tsx         # Copy code functionality
│       │   ├── technical-note.tsx      # Info/warning/success/error notes
│       │   └── installation-guide.tsx  # Step-by-step installation guides
│       ├── ui/                          # UI & interaction
│       │   ├── dark-mode-toggle.tsx    # Dark/light mode toggle button
│       │   └── social-share.tsx        # Like, bookmark, share functionality
│       └── wrapper/
│           └── dark-mode-wrapper.tsx   # Dark mode context wrapper
│
├── context/
│   └── DarkModeContext.tsx             # Global dark mode state dengan localStorage
│
├── lib/
│   ├── blog-data.ts                    # Main blog data functions (clean, no fallbacks)
│   └── blog-utils.ts                   # Utility functions for blog operations
│
├── types/
│   └── blog.ts                         # BlogPost interface & type definitions
│
├── content/
│   └── blog/
│       └── understanding-internet-computer-protocol-icp.md # ICP tutorial
│
├── scripts/
│   └── create-content-dir.js           # Script untuk create content directory
│
└── package.json
```

## 📝 Content Management

### Adding New Blog Posts

#### Markdown (Recommended)

Create a `.md` file in `content/blog/`:

````markdown
id: 3
title: "Your Amazing Blog Post"
excerpt: "A brief description of your post"
author: "Your Name"
date: "2025-01-08"
readTime: "5 min read"
category: "Technology"
tags: ["React", "Next.js", "Tutorial"]
image: "/placeholder.svg?height=400&width=800"
featured: false

---

# Your Amazing Blog Post

Your content goes here with full **Markdown** support!

```javascript
const example = "Code blocks work too!";
console.log(example);
```
````

````

#### Programmatic Fallback

Add to `lib/blog-data.ts` fallbackPosts:

```ts
{
  id: 3,
  slug: "your-post-slug",
  title: "Your Post Title",
  excerpt: "Brief description...",
  content: null,
  author: "Author Name",
  date: "2025-01-08",
  readTime: "10 min read",
  category: "Technology",
  tags: ["tag1", "tag2"],
  image: "/placeholder.svg?height=400&width=800",
  featured: false,
}
````

### Categories

- **Technology**
- **Tutorial**
- **Community**
- **Security**
- **Vision**
- **Economics**

## 🎨 Customization

### Dark Mode

Handled by:

- `DarkModeContext.tsx`
- `globals.css`
- Tailwind `dark:` classes

## 🔧 Key Files

- `layout.tsx` - Root layout
- `blog-data.ts` - Blog post source
- `blog-post-content.tsx` - Full post display
- `category-filter.tsx` - Filtering logic

## 🔍 SEO Features

- Metadata generation
- Open Graph & Twitter Card
- Structured article data

## 🔧 Troubleshooting

- Check MDX syntax
- Ensure `content/blog/` exists
- Wrap app in `DarkModeProvider`
- Use valid placeholder images

## 🤝 Contributing

1. Fork
2. Create branch
3. Commit
4. Push
5. PR

## 📄 License

MIT

## 🆘 Support

- Check README
- Review console logs
- Create GitHub issue

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
