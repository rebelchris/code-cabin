"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Heart } from "lucide-react"
import type { PostView } from "@/lib/types"
import LikeButton from "@/components/LikeButton";
import {getCategoryColor} from "@/lib/category-colors";

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
          {/* Image - optional */}
          {post.image && (
            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
          )}

          {/* Content */}
          <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>{post.date}</span>
            </div>

            <h1 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
              {post.title}
            </h1>

            {/* Category and Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              <LikeButton postId={post.id} />
              <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${getCategoryColor(post.category).bg} ${getCategoryColor(post.category).text}`}
              >
            {post.category}
          </span>
              {post.tags && post.tags.length > 0 && post.tags.map((tag: string) => (
                  <span key={tag} className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
              {tag}
            </span>
              ))}
            </div>

            {/* Sections */}
            <div className="mt-6 space-y-5">
              {post.contentHtml ? (
                <div className="prose" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
              ) : (
                <section>
                  {post.description}
                </section>
              )}
            </div>

            {/* Link to full page for SEO */}
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


