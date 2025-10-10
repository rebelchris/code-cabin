"use client"

import { useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import type { PostView } from "@/lib/types"
import { PostArticle } from "@/components/post-article";

interface PostModalProps {
  post: PostView | null
  onClose: () => void
}
export function PostModal({ post, onClose }: PostModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (post) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [post, onClose])

  if (!post) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-gradient-to-br from-accent/20 via-background/40 to-accent/10 p-4 backdrop-blur-xl lg:items-center"
      onClick={onClose}
    >
      <div
        className="relative my-8 w-full max-w-2xl rounded-2xl border border-border/50 bg-card shadow-2xl lg:my-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-background/80 p-2 backdrop-blur-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          aria-label="Close modal"
        >
          <X className="size-5" />
        </button>

        <div className="max-h-[85vh] overflow-y-auto">
          {/* Content */}
          <div className="p-6 lg:p-8">
            <PostArticle
              postId={post.id}
              title={post.title}
              date={post.date}
              image={post.image}
              category={post.category}
              tags={post.tags}
              contentHtml={post.contentHtml || post.description}
            />
            <div className="mt-6 border-t border-border/50 pt-4">
              <Link href={`/post/${post.id}`} className="text-sm text-accent hover:underline">
                View full page →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


