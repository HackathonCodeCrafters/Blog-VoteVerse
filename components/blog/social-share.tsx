"use client";

import {
  Bookmark,
  Check,
  Copy,
  Facebook,
  Heart,
  Linkedin,
  Share2,
  Twitter,
} from "lucide-react";
import { useState } from "react";

interface SocialShareProps {
  title: string;
  url: string;
  excerpt: string;
}

export default function SocialShare({ title, url, excerpt }: SocialShareProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : url;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedExcerpt = encodeURIComponent(excerpt);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedExcerpt}`,
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    // Here you can add API call to save like status
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Here you can add API call to save bookmark status
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "width=600,height=400");
    setShowShareMenu(false);
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Like Button */}
      <button
        onClick={handleLike}
        className={`p-2 cursor-pointer rounded-lg transition-all duration-200 ${
          isLiked
            ? "text-red-500 bg-red-50 dark:bg-red-900/20"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
        title="Like this post"
      >
        <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
      </button>

      {/* Bookmark Button */}
      <button
        onClick={handleBookmark}
        className={`p-2 cursor-pointer rounded-lg transition-all duration-200 ${
          isBookmarked
            ? "text-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
        title="Bookmark this post"
      >
        <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
      </button>

      {/* Share Button */}
      <div className="relative">
        <button
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="p-2 rounded-lg cursor-pointer transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          title="Share this post"
        >
          <Share2 size={18} />
        </button>

        {/* Share Menu */}
        {showShareMenu && (
          <div className="absolute right-0 top-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-10 min-w-[200px]">
            <button
              onClick={() => handleShare("twitter")}
              className="flex items-center space-x-3 w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <Twitter size={16} className="text-blue-400" />
              <span>Share on Twitter</span>
            </button>
            <button
              onClick={() => handleShare("facebook")}
              className="flex items-center space-x-3 w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <Facebook size={16} className="text-blue-600" />
              <span>Share on Facebook</span>
            </button>
            <button
              onClick={() => handleShare("linkedin")}
              className="flex items-center space-x-3 w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <Linkedin size={16} className="text-blue-700" />
              <span>Share on LinkedIn</span>
            </button>
            <hr className="my-2 border-gray-200 dark:border-gray-600" />
            <button
              onClick={handleCopyLink}
              className="flex items-center space-x-3 w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {copied ? (
                <Check size={16} className="text-green-500" />
              ) : (
                <Copy size={16} />
              )}
              <span>{copied ? "Link copied!" : "Copy link"}</span>
            </button>
          </div>
        )}
      </div>

      {/* Click outside to close menu */}
      {showShareMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  );
}
