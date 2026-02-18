import { getAllPosts, getAllCategories } from "@/lib/markdown"
import HomeClient, { type PostView } from "@/components/home-client"
import { mapPostToPostView } from "@/lib/content"
import type { Metadata } from "next"
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  toAbsoluteUrl,
  toJsonLd,
} from "@/lib/seo"

export const metadata: Metadata = {
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Engineering Management Lessons`,
    description: SITE_DESCRIPTION,
    images: [toAbsoluteUrl(DEFAULT_OG_IMAGE)],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Engineering Management Lessons`,
    description: SITE_DESCRIPTION,
    images: [toAbsoluteUrl(DEFAULT_TWITTER_IMAGE)],
  },
}

export default async function Home() {
  const posts = getAllPosts()
  const categories = getAllCategories()
  const postViews: PostView[] = await Promise.all(posts.map(mapPostToPostView))

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}#post-list`,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: postViews.length,
    itemListElement: postViews.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: toAbsoluteUrl(`/post/${post.id}`),
      name: post.title,
      description: post.description,
    })),
  }

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    mainEntity: {
      "@id": `${SITE_URL}#post-list`,
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(collectionPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(itemListJsonLd) }} />
      <HomeClient initialPosts={postViews} categories={categories} />
    </>
  )
}
