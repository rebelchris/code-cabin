"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { TimelineCard } from "@/components/timeline-card"
import { PostModal } from "@/components/post-modal"
import { CategoryFilter, TimeFilter } from "@/components/filter-section"

export interface PostView {
  id: string
  title: string
  description: string
  age: string
  date: string
  timeInvestment: string
  whatWeTried: string
  whatHappened: string
  whyItWorked: string
  theLesson: string
  image: string
  tags?: string[]
  category: string
  timestamp: string
  contentHtml?: string
}

export default function HomeClient({ initialPosts, categories }: { initialPosts: PostView[]; categories: string[] }) {
  const [posts] = useState<PostView[]>(initialPosts)
  const [selectedPost, setSelectedPost] = useState<PostView | null>(null)
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [likes, setLikes] = useState<Record<string, number>>({})
  const [likedByUser, setLikedByUser] = useState<Record<string, boolean>>({})
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const initialLikes: Record<string, number> = {}
    const initialLikedByUser: Record<string, boolean> = {}
    posts.forEach((post) => {
      initialLikes[post.id] = Math.floor(Math.random() * 50) + 15
      initialLikedByUser[post.id] = false
    })
    setLikes(initialLikes)
    setLikedByUser(initialLikedByUser)
  }, [posts])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-on-scroll")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const handleLike = (postId: string) => {
    setLikedByUser((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
    setLikes((prev) => ({
      ...prev,
      [postId]: prev[postId] + (likedByUser[postId] ? -1 : 1),
    }))
  }

  const years = useMemo(() => {
    const yearSet = new Set(posts.map((a) => new Date(a.timestamp).getFullYear()))
    return Array.from(yearSet).sort((a, b) => b - a)
  }, [posts])

  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        if (selectedYear && new Date(post.timestamp).getFullYear() !== Number.parseInt(selectedYear)) {
          return false
        }
        if (selectedCategory && post.category !== selectedCategory) {
          return false
        }
        return true
      })
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [posts, selectedYear, selectedCategory])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: posts.length }
    categories.forEach((category) => {
      counts[category] = posts.filter((a) => a.category === category).length
    })
    return counts
  }, [posts, categories])

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">
        <div className="mx-auto mb-8 max-w-6xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">Code Cabin</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Lessons from the engineering management trenches - real experiments, honest outcomes
          </p>
        </div>

        <div className="mx-auto flex justify-center gap-6 lg:gap-8">
          {/* Sidebar - hidden on mobile, shown on lg+ */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-6 space-y-6 rounded-2xl border border-border/50 bg-background/95 p-4 shadow-lg backdrop-blur-md">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                categoryCounts={categoryCounts}
                variant="desktop"
              />
              <TimeFilter
                years={years}
                selectedYear={selectedYear}
                onYearChange={setSelectedYear}
                variant="desktop"
              />
            </div>
          </aside>

          {/* Main content area */}
          <div className="min-w-0 flex-1 lg:max-w-md">
            <div className="mb-6 rounded-2xl border border-border/50 bg-background/95 p-4 shadow-lg backdrop-blur-md lg:hidden">
              <div className="mb-4">
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  categoryCounts={categoryCounts}
                  variant="mobile"
                />
              </div>
              <div>
                <TimeFilter
                  years={years}
                  selectedYear={selectedYear}
                  onYearChange={setSelectedYear}
                  variant="mobile"
                />
              </div>
            </div>

            <div className="mb-4 text-center">
              <p className="text-sm text-muted-foreground">
                {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
              </p>
            </div>

            <div className="space-y-4">
              {filteredPosts.map((post, index) => (
                <TimelineCard
                  key={post.id}
                  post={post}
                  onClick={() => setSelectedPost(post)}
                  onLike={() => handleLike(post.id)}
                  likes={likes[post.id] || 0}
                  isLiked={likedByUser[post.id] || false}
                  observerRef={observerRef}
                  index={index}
                />
              ))}

              {filteredPosts.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-sm text-muted-foreground">No posts found with the selected filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>


      <PostModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        likes={selectedPost ? likes[selectedPost.id] || 0 : 0}
        isLiked={selectedPost ? likedByUser[selectedPost.id] || false : false}
        onLike={() => selectedPost && handleLike(selectedPost.id)}
      />
    </div>
  )
}
