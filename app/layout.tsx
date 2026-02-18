import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_IMAGE,
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_LOGO,
  SITE_NAME,
  SITE_URL,
  toAbsoluteUrl,
  toJsonLd,
} from "@/lib/seo"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Engineering Management Lessons`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  applicationName: SITE_NAME,
  category: "technology",
  creator: SITE_AUTHOR,
  publisher: SITE_NAME,
  authors: [{ name: SITE_AUTHOR, url: SITE_URL }],
  keywords: [
    "engineering management",
    "leadership",
    "software engineering",
    "career growth",
    "team management",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} | Engineering Management Lessons`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: toAbsoluteUrl(DEFAULT_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} social card`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Engineering Management Lessons`,
    description: SITE_DESCRIPTION,
    images: [toAbsoluteUrl(DEFAULT_TWITTER_IMAGE)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  inLanguage: "en-US",
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: toAbsoluteUrl(SITE_LOGO),
  founder: {
    "@type": "Person",
    name: SITE_AUTHOR,
  },
}

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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(websiteJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(organizationJsonLd) }} />
        <Suspense fallback={null}>{children}</Suspense>
        {modal}
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
