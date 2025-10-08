import { getAllPosts, getAllCategories } from "@/lib/markdown"
import HomeClient, { type PostView } from "@/components/home-client"
import { mapPostToPostView } from "@/lib/content";

export default async function Home() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  const postViews: PostView[] = await Promise.all(posts.map(mapPostToPostView))

  return <HomeClient initialPosts={postViews} categories={categories} />
}
