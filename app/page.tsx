import { getAllPosts, getAllCategories } from "@/lib/markdown"
import HomeClient, { type Activity } from "@/components/home-client"
import markdownToHtml from "@/lib/markdownToHtml";

export default async function Home() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  const activities: Activity[] = await Promise.all(posts.map(async (post: any) => {

    const dateString: string = post.date ?? ""
    const timestamp = dateString ? new Date(dateString).toISOString() : new Date(0).toISOString()
    const contentHtml = await markdownToHtml(post.content || "")
    return {
      id: post.slug ?? post.title ?? Math.random().toString(36).slice(2),
      title: post.title ?? post.slug ?? "Untitled",
      description: post.description ?? '',
      age: post.age ?? "",
      date: dateString,
      timeInvestment: post.timeInvestment ?? "",
      whatWeTried: post.whatWeTried ?? "",
      whatHappened: post.whatHappened ?? "",
      whyItWorked: post.whyItWorked ?? "",
      theLesson: post.theLesson ?? "",
      image: post.image ?? "",
      tags: Array.isArray(post.tags) ? post.tags : [],
      category: post.category ?? "uncategorized",
      timestamp: timestamp,
      contentHtml,
    }
  }))

  return <HomeClient initialActivities={activities} categories={categories} />
}
