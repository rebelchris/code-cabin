import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Users,
  Target,
  Mail,
  Linkedin,
  Github,
  Coffee,
  Flame,
  Mountain,
  TreePine,
} from "lucide-react"

export default function HomePage() {
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
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <TreePine className="h-8 w-8" />
                <Mountain className="h-6 w-6 opacity-70" />
              </div>
              <div>
                <h1 className="text-3xl font-black font-heading tracking-tight">CodeCabin.dev</h1>
                <p className="text-sm opacity-90 mt-1 font-medium">Where engineering leaders gather</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#stories" className="hover:opacity-80 transition-all duration-200 font-medium hover:scale-105">
                Stories
              </a>
              <a href="#about" className="hover:opacity-80 transition-all duration-200 font-medium hover:scale-105">
                About
              </a>
              <a href="#connect" className="hover:opacity-80 transition-all duration-200 font-medium hover:scale-105">
                Connect
              </a>
            </div>
          </nav>
        </div>
      </header>

      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent"></div>
        <div className="container mx-auto max-w-5xl text-center relative">
          <div className="mb-12">
            <div className="relative inline-block">
              <img
                src="/cozy-cabin-workspace.png"
                alt="Cozy cabin workspace"
                className="w-40 h-40 rounded-2xl mx-auto mb-8 shadow-2xl border-4 border-white warm-glow"
              />
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground p-2 rounded-full shadow-lg">
                <Flame className="h-5 w-5" />
              </div>
            </div>
          </div>
          <h2 className="text-5xl md:text-7xl font-black font-heading text-foreground mb-8 leading-tight">
            Welcome to the <span className="text-primary">cabin</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Pull up a chair by the fire. I'm sharing the stories, lessons, and honest reflections from my journey
            leading engineering teams. <span className="text-primary font-semibold">No corporate speak</span>—just real
            talk about what works and what doesn't.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="text-lg px-10 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <Coffee className="mr-3 h-6 w-6" />
              Start Reading
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 rounded-2xl font-medium border-2 hover:bg-muted transition-all duration-200 bg-transparent"
            >
              <Flame className="mr-2 h-5 w-5" />
              Join the Fire
            </Button>
          </div>
        </div>
      </section>

      <section id="stories" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-black font-heading mb-4">What's in the Cabin</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Four corners of wisdom, each with its own stories to tell
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20 warm-glow group">
              <CardHeader className="pb-4">
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl font-bold">Stories from the Trenches</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Real situations, honest mistakes, and hard-won wisdom from leading engineering teams through complex
                  challenges.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20 warm-glow group">
              <CardHeader className="pb-4">
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl font-bold">Practical Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Frameworks, templates, and processes that actually work in the messy reality of software development.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20 warm-glow group">
              <CardHeader className="pb-4">
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl font-bold">Building Culture</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  How to create teams where people thrive, psychological safety flourishes, and great software gets
                  built.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20 warm-glow group">
              <CardHeader className="pb-4">
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Coffee className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl font-bold">Personal Reflections</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  My journey from code to leadership, industry observations, and the ongoing adventure of growth.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-black font-heading mb-4">Recent Fireside Chats</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stories worth sharing over a warm cup of coffee
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 group border-2 hover:border-primary/20 warm-glow">
              <CardHeader className="pb-4">
                <Badge variant="secondary" className="w-fit mb-3 rounded-full px-3 py-1 font-medium">
                  Stories from the Trenches
                </Badge>
                <CardTitle className="font-heading text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                  The Day I Learned Why 1:1s Aren't Just Status Updates
                </CardTitle>
                <CardDescription className="text-base leading-relaxed mt-3">
                  How a single conversation changed my entire approach to managing people and building trust.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/stories/why-1on1s-matter">
                  <Button
                    variant="ghost"
                    className="p-0 h-auto font-semibold text-primary hover:text-primary/80 text-base"
                  >
                    Read the story <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 group border-2 hover:border-primary/20 warm-glow">
              <CardHeader className="pb-4">
                <Badge variant="secondary" className="w-fit mb-3 rounded-full px-3 py-1 font-medium">
                  Practical Tools
                </Badge>
                <CardTitle className="font-heading text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                  The Art of Saying No: Protecting Your Team's Focus
                </CardTitle>
                <CardDescription className="text-base leading-relaxed mt-3">
                  A framework for filtering requests and maintaining team productivity without burning bridges.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/stories/saying-no-framework">
                  <Button
                    variant="ghost"
                    className="p-0 h-auto font-semibold text-primary hover:text-primary/80 text-base"
                  >
                    Get the framework <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 group border-2 hover:border-primary/20 warm-glow">
              <CardHeader className="pb-4">
                <Badge variant="secondary" className="w-fit mb-3 rounded-full px-3 py-1 font-medium">
                  Building Culture
                </Badge>
                <CardTitle className="font-heading text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                  How I Accidentally Created a Blame Culture (And Fixed It)
                </CardTitle>
                <CardDescription className="text-base leading-relaxed mt-3">
                  The subtle ways good intentions can create toxic environments, and how to course-correct.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/stories/blame-culture-fix">
                  <Button
                    variant="ghost"
                    className="p-0 h-auto font-semibold text-primary hover:text-primary/80 text-base"
                  >
                    Learn from my mistake <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12">
            <Link href="/stories">
              <Button size="lg" variant="outline" className="rounded-xl font-semibold bg-transparent">
                View All Stories <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-gradient-to-br from-muted/30 to-muted/60">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-black font-heading mb-8 text-foreground">About Your Host</h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                I've been building and leading engineering teams for over a decade, from scrappy startups to scaling
                organizations. I've made plenty of mistakes, learned from incredible mentors, and discovered what
                actually works when managing people who build software.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                This cabin is my attempt to share the hard-won lessons, practical frameworks, and honest reflections in
                a space that feels more like a conversation with a friend than a corporate blog post.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="rounded-full px-4 py-2 text-sm font-medium border-2">
                  10+ years leadership
                </Badge>
                <Badge variant="outline" className="rounded-full px-4 py-2 text-sm font-medium border-2">
                  Multiple scale-ups
                </Badge>
                <Badge variant="outline" className="rounded-full px-4 py-2 text-sm font-medium border-2">
                  Team builder
                </Badge>
                <Badge variant="outline" className="rounded-full px-4 py-2 text-sm font-medium border-2">
                  Coffee enthusiast
                </Badge>
              </div>
            </div>
            <div className="text-center">
              <img
                src="/engineering-team-fireside.png"
                alt="Engineering team by the fireside"
                className="rounded-3xl shadow-2xl border-4 border-white warm-glow"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="connect"
        className="py-20 px-4 bg-gradient-to-r from-primary via-primary to-secondary text-primary-foreground relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>
        <div className="container mx-auto max-w-5xl text-center relative">
          <div className="mb-8">
            <Flame className="h-16 w-16 mx-auto mb-6 opacity-90" />
          </div>
          <h3 className="text-4xl md:text-5xl font-black font-heading mb-8">Pull Up a Chair</h3>
          <p className="text-xl md:text-2xl opacity-90 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Want to share your own engineering leadership stories, discuss a challenge you're facing, or just say hello?
            The cabin door is always open.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              variant="secondary"
              size="lg"
              className="text-lg px-10 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <Mail className="mr-3 h-6 w-6" />
              Start a Conversation
            </Button>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="lg"
                className="text-primary-foreground hover:bg-white/10 rounded-2xl p-4 transition-all duration-200 hover:scale-110"
              >
                <Linkedin className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-primary-foreground hover:bg-white/10 rounded-2xl p-4 transition-all duration-200 hover:scale-110"
              >
                <Github className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
