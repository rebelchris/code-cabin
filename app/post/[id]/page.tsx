import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import {getPostBySlug, getPostSlugs} from "@/lib/markdown";
import markdownToHtml from "@/lib/markdownToHtml";
import { getCategoryColor } from "@/lib/category-colors";
import LikeButton from "@/components/LikeButton";
import {Metadata} from "next";

export async function generateStaticParams() {
  const slugs = getPostSlugs()

  return slugs.map((slug) => ({
    id: slug.replace(/\.mdx?$/, ""), // Remove .mdx or .md extension
  }))
}

// Define the Props type for both the component and generateMetadata
type PostPageProps = {
  params: { id: string }
};

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const slug = params.id;
  const post = getPostBySlug(slug) as any;

  if (!post) {
    return {};
  }

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.codecabin.dev';
  const canonicalUrl = `${BASE_URL}/post/${slug}`;
  const description = post.description || `Read the latest post from Code Cabin: ${post.title}.`;
  const imageUrl = post.image || `${BASE_URL}/opengraph-image.png`;

  return {
    // Essential Metadata
    title: `${post.title} | Code Cabin`,
    description: description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: post.title,
      description: description,
      url: canonicalUrl,
      type: 'article',
      siteName: 'Code Cabin',
      images: [{
        url: imageUrl,
        alt: post.title,
      }],
      publishedTime: post.date ? new Date(post.date).toISOString() : undefined,
    },

    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: [imageUrl],
    },
  };
}


export default async function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(`${params.id}`) as any
  const content = await markdownToHtml(post.content || "");

  if (!post) {
    notFound()
  }

  // Transform post data to match postData interface
  const postData = {
    id: post.slug || post.title || Math.random().toString(36).slice(2),
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
    contentHtml: content,
  }

  return (
    <div className="min-h-screen">
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

      {/* Image */}
      {postData.image && (
      <div className="relative mx-auto aspect-[16/9] max-w-4xl overflow-hidden rounded-2xl bg-muted px-6">
        <Image src={postData.image || "/placeholder.svg"} alt={postData.title} fill className="object-cover" />
      </div>
      )}

      {/* Content */}
      <article className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>{postData.date}</span>
        </div>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl text-balance">
          {postData.title}
        </h1>

        {/* Category and Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          <LikeButton postId={params.id} />
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${getCategoryColor(postData.category).bg} ${getCategoryColor(postData.category).text}`}
          >
            {postData.category}
          </span>
          {postData.tags && postData.tags.length > 0 && postData.tags.map((tag: string) => (
            <span key={tag} className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
              {tag}
            </span>
          ))}
        </div>

        {/* Sections */}
        <div className="mt-6 space-y-5">
          <div
              className='prose'
              dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </article>
    </div>
  )
}
