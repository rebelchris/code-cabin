import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, TreePine, Mountain } from "lucide-react"
import Link from "next/link"
import { getAllStories, getCategories } from "@/lib/markdown"

export default function StoriesPage() {
  const stories = getAllStories()
  const categories = getCategories()

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
            <Link href="/">
              <Button variant="ghost" className="text-primary-foreground hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Cabin
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black font-heading mb-6">All Stories</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Every story from the cabin, organized for your reading pleasure. Grab your favorite beverage and settle
              in.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <Badge
                key={category.name}
                variant="outline"
                className="rounded-full px-4 py-2 text-sm font-medium border-2 hover:bg-primary hover:text-primary-foreground cursor-pointer transition-all"
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>

          {/* Stories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <Card
                key={story.slug}
                className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 group border-2 hover:border-primary/20 warm-glow"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="rounded-full px-3 py-1 font-medium text-xs">
                      {story.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{story.date}</span>
                  </div>
                  <Link href={`/stories/${story.slug}`}>
                    <CardTitle className="font-heading text-xl font-bold group-hover:text-primary transition-colors leading-tight hover:underline cursor-pointer">
                      {story.title}
                    </CardTitle>
                  </Link>
                  <CardDescription className="text-base leading-relaxed mt-3">{story.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{story.readTime}</span>
                    <Link href={`/stories/${story.slug}`}>
                      <Button className="btn-primary">
                        Read story <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
