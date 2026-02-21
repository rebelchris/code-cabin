import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import {getPostBySlug, getPostSlugs} from "@/lib/markdown";
import {Metadata} from "next";
import { buildPostViewBySlug } from "@/lib/post-view";
import { PostArticle } from "@/components/post-article";
import { 
  StructuredData, 
  generateArticleSchema, 
  generatePostBreadcrumbs,
  authorSchema,
  publisherSchema,
} from "@/components/structured-data";

export async function generateStaticParams() {
  const slugs = getPostSlugs()

  return slugs.map((slug) => ({
    id: slug.replace(/\.mdx?$/, ""), // Remove .mdx or .md extension
  }))
}

// Define the Props type for both the component and generateMetadata
type PostPageProps = {
  params: Promise<{ id: string }>
};

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  const slug = id;
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
  const { id } = await params;
  const post = getPostBySlug(id) as any
  if (!post) {
    notFound()
  }
  const postData = await buildPostViewBySlug(id)

  // Calculate approximate word count for schema
  const wordCount = postData.contentHtml
    ? postData.contentHtml.replace(/<[^>]*>/g, '').split(/\s+/).length
    : undefined;

  // Generate Article structured data using the component
  const articleSchema = generateArticleSchema({
    title: postData.title,
    description: post.description || `Read the latest post from Code Cabin: ${postData.title}.`,
    slug: id,
    datePublished: post.date,
    dateModified: post.date, // Could be different if tracking modifications
    image: post.image,
    category: postData.category,
    tags: postData.tags,
    wordCount,
  });

  // Generate Breadcrumb structured data
  const breadcrumbSchema = generatePostBreadcrumbs(
    postData.title,
    id,
    postData.category
  );

  return (
    <div className="min-h-screen">
      {/* Structured Data: Article + Breadcrumbs + Author + Publisher */}
      <StructuredData 
        data={[
          articleSchema, 
          breadcrumbSchema, 
          { "@context": "https://schema.org", ...authorSchema },
          { "@context": "https://schema.org", ...publisherSchema },
        ]} 
      />
      
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
        date={postData.date}
        image={postData.image}
        category={postData.category}
        tags={postData.tags}
        contentHtml={postData.contentHtml}
      />
    </div>
  )
}
