import { getPostBySlug } from "@/lib/markdown";
import markdownToHtml from "@/lib/markdownToHtml";

export type BuiltPostView = {
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
  tags: string[]
  category: string
  timestamp: string
  contentHtml: string
}

export async function buildPostViewBySlug(slug: string): Promise<BuiltPostView> {
  const post = getPostBySlug(slug) as any
  const contentHtml = await markdownToHtml(post.content || "")

  return {
    id: post.slug || slug,
    title: post.title || "Untitled",
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
    timestamp: post.date ? new Date(post.date).toISOString() : new Date(0).toISOString(),
    contentHtml,
  }
}


