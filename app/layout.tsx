import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Code Cabin - Engineering Management Lessons",
  description: "Lessons from the engineering management trenches - real experiments, honest outcomes",
  authors: [{ name: "Chris Bongers", url: "https://www.linkedin.com/in/chrisbongers/" }],
  creator: "Chris Bongers",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.codecabin.dev",
    siteName: "Code Cabin",
    title: "Code Cabin - Engineering Management Lessons",
    description: "Lessons from the engineering management trenches - real experiments, honest outcomes",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@AiChrisB",
  },
}

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Code Cabin",
  description: "Lessons from the engineering management trenches - real experiments, honest outcomes",
  url: "https://www.codecabin.dev",
  author: {
    "@type": "Person",
    name: "Chris Bongers",
    url: "https://www.linkedin.com/in/chrisbongers/",
    jobTitle: "Engineering Manager",
    worksFor: {
      "@type": "Organization",
      name: "daily.dev",
    },
  },
  publisher: {
    "@type": "Person",
    name: "Chris Bongers",
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
