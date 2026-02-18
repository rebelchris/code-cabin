import { getAllPosts } from "@/lib/markdown"
import { MetadataRoute } from "next"
import { SITE_URL, toValidDate } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const allPosts = getAllPosts()

  const postsRoutes: MetadataRoute.Sitemap = allPosts.map((post) => {
    const lastModified = toValidDate(post.date)

    return {
      url: `${SITE_URL}/post/${post.slug}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: "weekly",
      priority: 0.8,
    }
  })

  const mostRecentPostDate = allPosts
    .map((post) => toValidDate(post.date))
    .filter((date): date is Date => Boolean(date))
    .sort((dateA, dateB) => dateB.getTime() - dateA.getTime())[0]

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: mostRecentPostDate || new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ]

  return [...staticRoutes, ...postsRoutes]
}
