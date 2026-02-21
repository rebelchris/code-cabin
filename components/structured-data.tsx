/**
 * Structured Data (JSON-LD) Components for SEO
 * Provides Article, BreadcrumbList, and Person schema.org markup
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.codecabin.dev';

// Author schema - Chris Bongers
export const authorSchema = {
  "@type": "Person",
  "@id": `${BASE_URL}/#author`,
  name: "Chris Bongers",
  url: "https://www.linkedin.com/in/chrisbongers/",
  jobTitle: "Engineering Manager",
  description: "Engineering Manager at daily.dev sharing lessons from the trenches - real experiments, honest outcomes.",
  image: `${BASE_URL}/chris-bongers.jpg`,
  sameAs: [
    "https://www.linkedin.com/in/chrisbongers/",
    "https://twitter.com/AiChrisB",
    "https://github.com/chrisbongers",
    "https://daily.dev/@chrisbongers",
  ],
  worksFor: {
    "@type": "Organization",
    name: "daily.dev",
    url: "https://daily.dev",
  },
  knowsAbout: [
    "Engineering Management",
    "Leadership",
    "Software Development",
    "Team Building",
    "Agile Methodologies",
  ],
};

// Publisher schema for the blog
export const publisherSchema = {
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "Code Cabin",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo.png`,
  },
};

type ArticleSchemaProps = {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  category?: string;
  tags?: string[];
  wordCount?: number;
};

/**
 * Generate Article structured data for blog posts
 */
export function generateArticleSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  image,
  category,
  tags = [],
  wordCount,
}: ArticleSchemaProps) {
  const articleUrl = `${BASE_URL}/post/${slug}`;
  const imageUrl = image || `${BASE_URL}/opengraph-image.png`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${articleUrl}#article`,
    headline: title,
    description: description,
    url: articleUrl,
    datePublished: datePublished ? new Date(datePublished).toISOString() : undefined,
    dateModified: dateModified 
      ? new Date(dateModified).toISOString() 
      : datePublished 
        ? new Date(datePublished).toISOString() 
        : undefined,
    author: {
      "@id": `${BASE_URL}/#author`,
    },
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    image: {
      "@type": "ImageObject",
      url: imageUrl,
    },
    articleSection: category || "Engineering Management",
    keywords: tags.length > 0 ? tags.join(", ") : undefined,
    wordCount: wordCount,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "Blog",
      "@id": `${BASE_URL}/#blog`,
      name: "Code Cabin",
      url: BASE_URL,
    },
  };
}

type BreadcrumbItem = {
  name: string;
  url: string;
};

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate breadcrumbs for a blog post
 */
export function generatePostBreadcrumbs(postTitle: string, postSlug: string, category?: string) {
  const items: BreadcrumbItem[] = [
    { name: "Home", url: BASE_URL },
  ];

  if (category) {
    items.push({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      url: `${BASE_URL}/?category=${encodeURIComponent(category)}`,
    });
  }

  items.push({
    name: postTitle,
    url: `${BASE_URL}/post/${postSlug}`,
  });

  return generateBreadcrumbSchema(items);
}

/**
 * Component to render structured data as JSON-LD script tag
 */
type StructuredDataProps = {
  data: object | object[];
};

export function StructuredData({ data }: StructuredDataProps) {
  // If array, combine into a graph
  const jsonLd = Array.isArray(data) 
    ? { "@context": "https://schema.org", "@graph": data.map(d => {
        const { "@context": _, ...rest } = d as any;
        return rest;
      })}
    : data;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * Generate enhanced Blog schema with WebSite
 */
export function generateBlogSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Code Cabin",
        description: "Lessons from the engineering management trenches - real experiments, honest outcomes",
        publisher: { "@id": `${BASE_URL}/#organization` },
        inLanguage: "en-US",
      },
      {
        "@type": "Blog",
        "@id": `${BASE_URL}/#blog`,
        url: BASE_URL,
        name: "Code Cabin",
        description: "Lessons from the engineering management trenches - real experiments, honest outcomes",
        author: { "@id": `${BASE_URL}/#author` },
        publisher: { "@id": `${BASE_URL}/#organization` },
        inLanguage: "en-US",
        blogPost: [], // Will be populated dynamically if needed
      },
      publisherSchema,
      authorSchema,
    ],
  };
}
