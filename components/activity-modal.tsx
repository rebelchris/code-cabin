"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Heart } from "lucide-react"
import type { Activity } from "@/components/home-client"
import { getCategoryColor } from "@/lib/category-colors"

interface ActivityModalProps {
  activity: Activity | null
  onClose: () => void
  likes: number
  isLiked: boolean
  onLike: () => void
}

export function ActivityModal({ activity, onClose, likes, isLiked, onLike }: ActivityModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (activity) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [activity, onClose])

  if (!activity) return null

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
          {activity.image && (
            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
              <Image src={activity.image || "/placeholder.svg"} alt={activity.title} fill className="object-cover" />
            </div>
          )}

          {/* Content */}
          <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>{activity.date}</span>
            </div>

            <h1 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
              {activity.title}
            </h1>

            {/* Category and Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${getCategoryColor(activity.category).bg} ${getCategoryColor(activity.category).text}`}
              >
                {activity.category}
              </span>
              {activity.tags && activity.tags.length > 0 && activity.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gradient-to-r from-accent/10 to-accent/5 px-3 py-1 text-sm font-medium text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={onLike}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isLiked
                    ? "bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-600 dark:text-red-400"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                <span>{likes}</span>
              </button>
            </div>

            {/* Sections */}
            <div className="mt-6 space-y-5">
              {activity.contentHtml ? (
                <div className="prose" dangerouslySetInnerHTML={{ __html: activity.contentHtml }} />
              ) : (
                <section>
                  {activity.description}
                </section>
              )}
            </div>

            {/* Link to full page for SEO */}
            <div className="mt-6 border-t border-border/50 pt-4">
              <Link href={`/post/${activity.id}`} className="text-sm text-accent hover:underline">
                View full page →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
