import { getAllPosts } from "@/lib/markdown"
import HomeClient, { type Activity } from "@/components/home-client"

export default async function Home() {
  const posts = getAllPosts()

  const activities: Activity[] = posts.map((post: any) => {
    const dateString: string = post.date ?? ""
    const timestamp = dateString ? new Date(dateString).toISOString() : new Date(0).toISOString()
    const allowedTypes = ["leadership", "process", "team-building"] as const
    const type = allowedTypes.includes(post.type) ? (post.type as Activity["type"]) : ("process" as Activity["type"]) 

    return {
      id: post.slug ?? post.title ?? Math.random().toString(36).slice(2),
      title: post.title ?? post.slug ?? "Untitled",
      age: post.age ?? "",
      date: dateString,
      timeInvestment: post.timeInvestment ?? "",
      whatWeTried: post.whatWeTried ?? "",
      whatHappened: post.whatHappened ?? "",
      whyItWorked: post.whyItWorked ?? "",
      theLesson: post.theLesson ?? "",
      image: post.image ?? "",
      tags: Array.isArray(post.tags) ? post.tags : [],
      type,
      ageMonths: typeof post.ageMonths === "number" ? post.ageMonths : 0,
      timestamp: new Date(),
    }
  })

  return <HomeClient initialActivities={activities} />
}
