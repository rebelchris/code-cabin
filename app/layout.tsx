import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import { generateBlogSchema } from "@/components/structured-data"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.codecabin.dev"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Code Cabin - Engineering Management Lessons",
    template: "%s | Code Cabin",
  },
  description: "Lessons from the engineering management trenches - real experiments, honest outcomes",
  authors: [{ name: "Chris Bongers", url: "https://www.linkedin.com/in/chrisbongers/" }],
  creator: "Chris Bongers",
  keywords: [
    "engineering management",
    "leadership",
    "software development",
    "team management",
    "engineering manager",
    "tech leadership",
    "management lessons",
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Code Cabin",
    title: "Code Cabin - Engineering Management Lessons",
    description: "Lessons from the engineering management trenches - real experiments, honest outcomes",
    images: [
      {
        url: `${BASE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Code Cabin - Engineering Management Lessons",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@AiChrisB",
    site: "@AiChrisB",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

// Enhanced blog schema with full Person, Organization, and WebSite data
const blogSchema = generateBlogSchema()

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />
        <Suspense fallback={null}>{children}</Suspense>
        {modal}
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
