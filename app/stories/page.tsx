import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, TreePine, Mountain } from "lucide-react"
import Link from "next/link"

export default function StoriesPage() {
  const stories = [
    {
      id: "why-1on1s-matter",
      category: "Stories from the Trenches",
      title: "The Day I Learned Why 1:1s Aren't Just Status Updates",
      description: "How a single conversation changed my entire approach to managing people and building trust.",
      readTime: "8 min read",
      date: "Dec 15, 2024",
    },
    {
      id: "saying-no-framework",
      category: "Practical Tools",
      title: "The Art of Saying No: Protecting Your Team's Focus",
      description: "A framework for filtering requests and maintaining team productivity without burning bridges.",
      readTime: "12 min read",
      date: "Dec 8, 2024",
    },
    {
      id: "blame-culture-fix",
      category: "Building Culture",
      title: "How I Accidentally Created a Blame Culture (And Fixed It)",
      description: "The subtle ways good intentions can create toxic environments, and how to course-correct.",
      readTime: "10 min read",
      date: "Nov 28, 2024",
    },
    {
      id: "sprint-planning-revolution",
      category: "Stories from the Trenches",
      title: "The Sprint Planning Meeting That Changed Everything",
      description:
        "When our team was drowning in scope creep, one simple change transformed our entire delivery process.",
      readTime: "7 min read",
      date: "Nov 20, 2024",
    },
    {
      id: "smartest-person-trap",
      category: "Personal Reflections",
      title: "Why I Stopped Trying to Be the Smartest Person in the Room",
      description:
        "The ego trap that nearly derailed my leadership journey and how letting go made me a better manager.",
      readTime: "9 min read",
      date: "Nov 12, 2024",
    },
    {
      id: "incident-response-playbook",
      category: "Practical Tools",
      title: "Building an Incident Response Culture That Actually Works",
      description: "Beyond the runbooks: creating a team culture that thrives under pressure and learns from failure.",
      readTime: "15 min read",
      date: "Oct 30, 2024",
    },
  ]

  const categories = [
    { name: "All Stories", count: stories.length },
    {
      name: "Stories from the Trenches",
      count: stories.filter((s) => s.category === "Stories from the Trenches").length,
    },
    { name: "Practical Tools", count: stories.filter((s) => s.category === "Practical Tools").length },
    { name: "Building Culture", count: stories.filter((s) => s.category === "Building Culture").length },
    { name: "Personal Reflections", count: stories.filter((s) => s.category === "Personal Reflections").length },
  ]

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
                key={story.id}
                className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 group border-2 hover:border-primary/20 warm-glow"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="rounded-full px-3 py-1 font-medium text-xs">
                      {story.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{story.date}</span>
                  </div>
                  <CardTitle className="font-heading text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                    {story.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed mt-3">{story.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{story.readTime}</span>
                    <Link href={`/stories/${story.id}`}>
                      <Button
                        variant="ghost"
                        className="p-0 h-auto font-semibold text-primary hover:text-primary/80 text-base"
                      >
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
