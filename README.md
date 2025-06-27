# VoteVerse Blog System

A modern, full-stack blog system built with Next.js 14, TypeScript, and Tailwind CSS. Features MDX support for rich content, syntax highlighting, and interactive components.

## Features

- 🚀 **Next.js 14** with App Router
- 📝 **MDX Support** for rich content with React components
- 🎨 **Tailwind CSS** for styling
- 🌙 **Dark Mode** support
- 💻 **Syntax Highlighting** with copy functionality
- 📱 **Responsive Design**
- 🔍 **SEO Optimized** with metadata generation
- ⚡ **Performance Optimized** with static generation

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX with next-mdx-remote
- **Icons**: Lucide React
- **Syntax Highlighting**: react-syntax-highlighter

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone <repository-url>
   cd voteverse-blog
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install

# or

yarn install
\`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev

# or

yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/
│ ├── blog/
│ │ ├── [slug]/
│ │ │ └── page.tsx # Dynamic blog post pages
│ │ └── page.tsx # Blog listing page
│ ├── layout.tsx # Root layout
│ └── page.tsx # Home page (redirects to blog)
├── components/
│ └── blog/
│ ├── blog-card.tsx # Individual blog post card
│ ├── blog-grid.tsx # Blog posts grid
│ ├── blog-hero.tsx # Hero section
│ ├── blog-post-content.tsx # Blog post detail page
│ ├── category-filter.tsx # Category filtering
│ ├── code-block.tsx # Syntax highlighted code blocks
│ ├── featured-post.tsx # Featured post component
│ ├── installation-guide.tsx # Installation guide component
│ ├── newsletter-signup.tsx # Newsletter signup
│ └── technical-note.tsx # Technical note component
├── context/
│ └── DarkModeContext.tsx # Dark mode context
├── lib/
│ └── blog-data.ts # Blog data management
├── types/
│ └── blog.ts # TypeScript interfaces
└── README.md
\`\`\`

## Content Management

### Adding New Blog Posts

1. Add your blog post data to \`lib/blog-data.ts\`:

\`\`\`typescript
const newPost: BlogPost = {
id: 2,
slug: "your-post-slug",
title: "Your Post Title",
excerpt: "Brief description...",
content: \`# Your MDX Content Here

  <TechnicalNote type="info">
  This is a technical note component.
  </TechnicalNote>
  
  \\\`\\\`\\\`javascript
  console.log("Code with syntax highlighting");
  \\\`\\\`\\\`
  \`,
  author: "Author Name",
  date: "2025-01-08",
  readTime: "10 min read",
  category: "Technology",
  tags: ["tag1", "tag2"],
  image: "/path/to/image.jpg",
}
\`\`\`

### MDX Components

The blog supports several custom MDX components:

#### TechnicalNote

\`\`\`mdx
<TechnicalNote type="info|warning|success|error" title="Optional Title">
Your note content here
</TechnicalNote>
\`\`\`

#### InstallationGuide

\`\`\`mdx
<InstallationGuide
title="Setup Guide"
steps={[
{
title: "Step 1",
description: "Description",
code: "npm install",
language: "bash"
}
]}
/>
\`\`\`

#### Code Blocks

\`\`\`mdx
\\\`\\\`\\\`javascript
const example = "Syntax highlighted code";
console.log(example);
\\\`\\\`\\\`
\`\`\`

## Customization

### Styling

- Modify \`tailwind.config.ts\` for theme customization
- Update component styles in individual component files
- Dark mode styles are handled automatically

### Adding New Components

1. Create component in \`components/blog/\`
2. Add to MDX components in \`blog-post-content.tsx\`
3. Use in your MDX content

### Categories and Tags

- Update category colors in \`getCategoryColor\` functions
- Add new categories to the categories array
- Tags are automatically generated from post data

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Other Platforms

\`\`\`bash
npm run build
npm start
\`\`\`

## Performance

- Static generation for blog posts
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Optimized bundle size

## SEO

- Automatic metadata generation
- Open Graph tags
- Twitter Card support
- Structured data for articles

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.

