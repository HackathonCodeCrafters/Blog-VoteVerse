import { existsSync, mkdirSync } from "fs";
import { join } from "path";

// Create content directory
const contentDir = join(process.cwd(), "content", "blog");

if (!existsSync(contentDir)) {
  mkdirSync(contentDir, { recursive: true });
  console.log("Created content/blog directory");
} else {
  console.log("content/blog directory already exists");
}
