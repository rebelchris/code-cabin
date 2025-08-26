import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Calendar, TreePine, Mountain, Coffee } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getStoryBySlug, getAllStories } from "@/lib/markdown"
import { remark } from "remark"
import html from "remark-html"

export async function generateStaticParams() {
  const stories = getAllStories()
  return stories.map((story) => ({
    slug: story.slug,
  }))
}

export default async function StoryPage({ params }: { params: { slug: string } }) {
  const story = getStoryBySlug(params.slug)

  if (!story) {
    notFound()
  }

  // Convert markdown to HTML
  const processedContent = await remark().use(html).process(story.content)
  const contentHtml = processedContent.toString()

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-r from-primary via-primary to-secondary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 py-8 relative">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <TreePine className="h-8 w-8" />
                <Mountain className="h-6 w-6 opacity-70" />
              </div>
              <div>
                <h1 className="text-3xl font-black font-heading tracking-tight">CodeCabin.dev</h1>
                <p className="text-sm opacity-90 mt-1 font-medium">Where engineering leaders gather</p>
              </div>
            </Link>
            <Link href="/stories">
              <Button variant="ghost" className="text-primary-foreground hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Stories
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <article className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Article Header */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="rounded-full px-4 py-2 font-medium mb-6">
              {story.category}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black font-heading mb-8 leading-tight">{story.title}</h1>
            <div className="flex items-center justify-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{story.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{story.readTime}</span>
              </div>
            </div>
            <div className="flex justify-center mb-12">
              <Coffee className="h-12 w-12 text-primary opacity-60" />
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </div>

          {/* Article Footer */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="text-center">
              <div className="bg-muted/50 rounded-2xl p-8 mb-8">
                <Coffee className="h-8 w-8 text-primary mx-auto mb-4" />
                <p className="text-lg text-muted-foreground mb-4">
                  Enjoyed this story? There's more where that came from.
                </p>
                <Link href="/stories">
                  <Button size="lg" className="rounded-xl">
                    Read More Stories
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
