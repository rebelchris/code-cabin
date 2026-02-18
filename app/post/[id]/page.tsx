import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getPostBySlug, getPostSlugs } from "@/lib/markdown"
import type { Metadata } from "next"
import { buildPostViewBySlug } from "@/lib/post-view"
import { PostArticle } from "@/components/post-article"
import {
  DEFAULT_OG_IMAGE,
  SITE_AUTHOR,
  SITE_LOGO,
  SITE_NAME,
  SITE_URL,
  toAbsoluteUrl,
  toJsonLd,
  toValidDate,
} from "@/lib/seo"

export async function generateStaticParams() {
  const slugs = getPostSlugs()

  return slugs.map((slug) => ({
    id: slug.replace(/\.mdx?$/, ""), // Remove .mdx or .md extension
  }))
}

// Define the Props type for both the component and generateMetadata
type PostPageProps = {
  params: Promise<{ id: string }>
}

function getPostBySlugSafe(slug: string) {
  try {
    return getPostBySlug(slug)
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { id } = await params
  const post = getPostBySlugSafe(id)

  if (!post) {
    return {}
  }

  const postTitle = post.title || "Untitled"
  const postDescription = post.description || `Read ${postTitle} on ${SITE_NAME}.`
  const canonicalPath = `/post/${id}`
  const canonicalUrl = toAbsoluteUrl(canonicalPath)
  const imageUrl = toAbsoluteUrl(post.image || DEFAULT_OG_IMAGE)
  const publishedTime = toValidDate(post.date)?.toISOString()
  const tags = Array.isArray(post.tags) ? post.tags : []
  const category = post.category || undefined

  return {
    title: postTitle,
    description: postDescription,
    alternates: {
      canonical: canonicalPath,
    },
    authors: [{ name: SITE_AUTHOR, url: SITE_URL }],
    keywords: tags,
    openGraph: {
      title: postTitle,
      description: postDescription,
      url: canonicalUrl,
      type: "article",
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          alt: postTitle,
        },
      ],
      publishedTime,
      authors: [SITE_AUTHOR],
      section: category,
      tags,
    },
    twitter: {
      card: "summary_large_image",
      title: postTitle,
      description: postDescription,
      images: [imageUrl],
    },
  }
}


export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params
  const post = getPostBySlugSafe(id)
  if (!post) {
    notFound()
  }
  const postData = await buildPostViewBySlug(id)

  const postUrl = toAbsoluteUrl(`/post/${id}`)
  const postDateIso = toValidDate(postData.date)?.toISOString() || new Date(0).toISOString()
  const postImage = toAbsoluteUrl(postData.image || DEFAULT_OG_IMAGE)
  const postTags = Array.isArray(postData.tags) ? postData.tags : []
  const postDescription = postData.description || `Read ${postData.title} on ${SITE_NAME}.`

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    url: postUrl,
    headline: postData.title,
    description: postDescription,
    datePublished: postDateIso,
    dateModified: postDateIso,
    isAccessibleForFree: true,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: SITE_AUTHOR,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: toAbsoluteUrl(SITE_LOGO),
      },
    },
    image: [postImage],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    articleSection: postData.category,
    keywords: postTags.join(", "),
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: postData.title,
        item: postUrl,
      },
    ],
  }

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(blogPostingJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      {/* Back button */}
      <div className="mx-auto max-w-4xl px-6 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all posts
        </Link>
      </div>

      <PostArticle
        postId={id}
        title={postData.title}
        description={postData.description}
        date={postData.date}
        image={postData.image}
        category={postData.category}
        tags={postData.tags}
        contentHtml={postData.contentHtml}
      />
    </div>
  )
}
