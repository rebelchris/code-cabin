import type { PostView, Post } from "@/lib/types"
import markdownToHtml from "@/lib/markdownToHtml"
import { toIsoStringOrEpoch } from "@/lib/date"

export async function mapPostToPostView(post: Post): Promise<PostView> {
  const contentHtml = await markdownToHtml(post.content || "")
  const timestamp = toIsoStringOrEpoch(post.date)

  return {
    id: post.slug || post.title || Math.random().toString(36).slice(2),
    title: post.title || post.slug || "Untitled",
    description: post.description || "",
    age: post.age || "",
    date: post.date || "",
    timeInvestment: post.timeInvestment || "",
    whatWeTried: post.whatWeTried || "",
    whatHappened: post.whatHappened || "",
    whyItWorked: post.whyItWorked || "",
    theLesson: post.theLesson || "",
    image: post.image || "",
    tags: Array.isArray(post.tags) ? post.tags : [],
    category: post.category || "uncategorized",
    timestamp,
    contentHtml,
  }
}

