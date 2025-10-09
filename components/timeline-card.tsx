"use client"

import type React from "react"

import Image from "next/image"
import { Heart } from "lucide-react"
import { useEffect, useRef } from "react"
import type { PostView } from "@/lib/types"
import { getCategoryColor } from "@/lib/category-colors"
import { getRelativeTimeFromIso } from "@/lib/date"
import LikeButton from "@/components/LikeButton";

interface TimelineCardProps {
  post: PostView
  onClick: () => void
  onLike: () => void
  likes: number
  isLiked: boolean
  observerRef: React.MutableRefObject<IntersectionObserver | null>
  index: number
}

export function TimelineCard({ post, onClick, onLike, likes, isLiked, observerRef, index }: TimelineCardProps) {
  const cardRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!cardRef.current || !observerRef.current) return
    observerRef.current.observe(cardRef.current)
    return () => {
      if (!cardRef.current || !observerRef.current) return
      observerRef.current.unobserve(cardRef.current)
    }
  }, [observerRef])

  const categoryColor = getCategoryColor(post.category)

  const isCompact = post.whatWeTried.length < 150 // Short posts are more compact

  return (
    <article
      ref={cardRef}
      className="group cursor-pointer rounded-xl border border-border/50 bg-card p-4 shadow-sm transition-all hover:border-accent/30 hover:shadow-md lg:p-5"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent/70 text-sm">
            👨‍💻
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-medium text-foreground">Engineering Manager</span>
            </div>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">{getRelativeTimeFromIso(post.timestamp)}</span>
      </div>

      <div onClick={onClick}>
        <h2
          className={`font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent ${
            isCompact ? "mb-2 text-base" : "mb-2 text-lg"
          }`}
        >
          {post.title}
        </h2>
        <p className={`leading-relaxed text-foreground/90 ${isCompact ? "text-sm" : "text-sm"}`}>
          {post.description}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColor.bg} ${categoryColor.text}`}
          >
            {post.category}
          </span>
          {post.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-full bg-muted/50 px-2.5 py-0.5 text-xs text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>

        {post.image && (
          <div className="mt-3 overflow-hidden rounded-lg border border-border/50">
            <div className="relative aspect-video bg-muted">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center gap-3 border-t border-border/30 pt-3">
        <LikeButton postId={post.id} />
        <span onClick={onClick} className="text-xs text-muted-foreground">Click to read more</span>
      </div>
    </article>
  )
}
