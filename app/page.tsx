"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { TimelineCard } from "@/components/timeline-card"
import { ActivityModal } from "@/components/activity-modal"

export interface Activity {
  id: string
  title: string
  age: string
  date: string
  timeInvestment: string
  whatWeTried: string
  whatHappened: string
  whyItWorked: string
  theLesson: string
  image: string
  tags?: string[]
  type: "leadership" | "process" | "team-building"
  ageMonths: number // for filtering (repurposed as experience level)
  timestamp: Date
}

const activities: Activity[] = [
  {
    id: "one-on-ones-framework",
    title: "Building a Consistent 1:1 Framework",
    age: "3 years experience",
    date: "October 2025",
    timeInvestment: "2 weeks to establish",
    whatWeTried:
      'Instead of ad-hoc check-ins, we implemented a structured 1:1 framework with consistent questions: "What\'s energizing you?", "What\'s draining you?", and "How can I help?" We kept a shared doc for each team member.',
    whatHappened:
      "The shift was immediate. Team members came prepared with topics. Conversations became deeper and more productive. What used to be status updates became genuine coaching sessions. Retention improved and people felt truly heard.",
    whyItWorked:
      "Structure creates safety. When people know what to expect, they can prepare meaningful topics. The shared doc created continuity between sessions and showed we actually remembered and cared about their concerns.",
    theLesson: "Consistency in 1:1s isn't about rigidity - it's about creating a reliable space for growth.",
    image: "/one-on-ones.jpg",
    tags: ["leadership", "coaching"],
    type: "leadership",
    ageMonths: 36,
    timestamp: new Date("2025-10-15"),
  },
  {
    id: "incident-postmortem-culture",
    title: "Creating Blameless Postmortem Culture",
    age: "5 years experience",
    date: "March 2024",
    timeInvestment: "3 months to establish",
    whatWeTried:
      "After a major outage, we shifted from 'who broke it' to 'what broke and how do we prevent it'. We created a template focusing on timeline, impact, root cause, and action items - with zero mention of individual names.",
    whatHappened:
      "The first few postmortems were awkward. People expected blame. But after three incidents handled this way, engineers started volunteering to lead postmortems. Psychological safety increased. We caught systemic issues we'd been missing.",
    whyItWorked:
      "Blame shuts down learning. When people feel safe admitting mistakes, they share the full story. That's where the real insights live. Systems fail, not people.",
    theLesson: "The best postmortems focus on what we learned, not who we blame.",
    image: "/postmortem-meeting.jpg",
    tags: ["process", "culture"],
    type: "process",
    ageMonths: 60,
    timestamp: new Date("2024-03-20"),
  },
  {
    id: "engineering-offsite",
    title: "Planning an Effective Engineering Offsite",
    age: "4 years experience",
    date: "March 2024",
    timeInvestment: "2 days planning, 2 days offsite",
    whatWeTried:
      "Organized a two-day offsite focused on team bonding and strategic planning. Mixed structured sessions (roadmap planning, architecture discussions) with unstructured time (team dinner, games, walks).",
    whatHappened:
      "The unstructured time created the most value. Engineers who rarely talked started collaborating. Cross-team relationships formed. The strategic discussions were productive because people felt connected first.",
    whyItWorked:
      "You can't force team bonding, but you can create conditions for it. The mix of structure and freedom let people connect authentically while still accomplishing business goals.",
    theLesson: "The best offsites balance intentional structure with space for organic connection.",
    image: "/team-offsite.jpg",
    tags: ["team-building", "culture"],
    type: "team-building",
    ageMonths: 48,
    timestamp: new Date("2024-03-15"),
  },
  {
    id: "sprint-retrospective-format",
    title: "Revamping Sprint Retrospectives",
    age: "3.5 years experience",
    date: "March 2024",
    timeInvestment: "30 minutes per sprint",
    whatWeTried:
      "Replaced the tired 'start/stop/continue' format with rotating themes: 'What energized us?', 'What slowed us down?', 'What surprised us?'. Each sprint, a different team member facilitated.",
    whatHappened:
      "Participation skyrocketed. People who never spoke up started sharing. The rotating facilitator meant everyone felt ownership. We uncovered blockers we'd been ignoring for months.",
    whyItWorked:
      "Fresh formats prevent retrospective fatigue. When everyone facilitates, everyone pays attention. The questions focused on feelings and surprises, not just process, which surfaced deeper insights.",
    theLesson: "Retrospectives die when they become routine. Keep them fresh, keep them human.",
    image: "/retrospective-board.jpg",
    tags: ["process", "agile"],
    type: "process",
    ageMonths: 42,
    timestamp: new Date("2024-03-10"),
  },
  {
    id: "career-ladder-framework",
    title: "Implementing a Clear Career Ladder",
    age: "4.5 years experience",
    date: "February 2024",
    timeInvestment: "1 month to design, ongoing to maintain",
    whatWeTried:
      "Created a transparent career ladder with clear expectations for each level. Included technical skills, leadership behaviors, and impact scope. Made it public and discussed it in team meetings.",
    whatHappened:
      "Engineers finally understood what 'senior' meant. Promotion conversations became objective, not political. People started self-identifying growth areas. The ambiguity that caused frustration disappeared.",
    whyItWorked:
      "Transparency removes mystery. When expectations are clear, people can chart their own path. It shifted promotion conversations from 'why not me?' to 'here's what I'm working on'.",
    theLesson: "Career growth shouldn't be a guessing game. Make the path visible.",
    image: "/career-ladder.jpg",
    tags: ["leadership", "growth"],
    type: "leadership",
    ageMonths: 54,
    timestamp: new Date("2024-02-20"),
  },
  {
    id: "technical-debt-prioritization",
    title: "Making Technical Debt Visible",
    age: "5 years experience",
    date: "January 2024",
    timeInvestment: "Ongoing practice",
    whatWeTried:
      "Started tracking technical debt in the same backlog as features. Each debt item got a 'pain score' (how much it hurts) and 'effort score'. We committed to spending 20% of each sprint on the highest pain-to-effort ratio items.",
    whatHappened:
      "Product managers finally understood why 'simple' features took forever. Engineers felt heard. The codebase started improving incrementally. Velocity actually increased as we paid down the worst debt.",
    whyItWorked:
      "Technical debt is invisible until you make it visible. Treating it like features gave it legitimacy. The pain-to-effort ratio made prioritization objective, not emotional.",
    theLesson: "Technical debt isn't a separate backlog - it's part of the work.",
    image: "/technical-debt.jpg",
    tags: ["process", "technical"],
    type: "process",
    ageMonths: 60,
    timestamp: new Date("2024-01-15"),
  },
]

export default function Home() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedAge, setSelectedAge] = useState<string | null>(null)
  const [likes, setLikes] = useState<Record<string, number>>({})
  const [likedByUser, setLikedByUser] = useState<Record<string, boolean>>({})
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const initialLikes: Record<string, number> = {}
    const initialLikedByUser: Record<string, boolean> = {}
    activities.forEach((activity) => {
      initialLikes[activity.id] = Math.floor(Math.random() * 50) + 15
      initialLikedByUser[activity.id] = false
    })
    setLikes(initialLikes)
    setLikedByUser(initialLikedByUser)
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-on-scroll")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const handleLike = (activityId: string) => {
    setLikedByUser((prev) => ({
      ...prev,
      [activityId]: !prev[activityId],
    }))
    setLikes((prev) => ({
      ...prev,
      [activityId]: prev[activityId] + (likedByUser[activityId] ? -1 : 1),
    }))
  }

  const years = useMemo(() => {
    const yearSet = new Set(activities.map((a) => new Date(a.timestamp).getFullYear()))
    return Array.from(yearSet).sort((a, b) => b - a)
  }, [])

  const filteredActivities = useMemo(() => {
    return activities
      .filter((activity) => {
        if (selectedYear && new Date(activity.timestamp).getFullYear() !== Number.parseInt(selectedYear)) {
          return false
        }
        if (selectedType && activity.type !== selectedType) {
          return false
        }
        if (selectedAge) {
          const [min, max] = selectedAge.split("-").map(Number)
          if (activity.ageMonths < min || activity.ageMonths > max) {
            return false
          }
        }
        return true
      })
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }, [selectedYear, selectedType, selectedAge])

  const typeCounts = useMemo(() => {
    const counts = { all: activities.length, leadership: 0, process: 0, "team-building": 0 }
    activities.forEach((a) => {
      counts[a.type]++
    })
    return counts
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">
        <div className="mx-auto mb-8 max-w-6xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">codecabin.dev</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Lessons from the engineering management trenches - real experiments, honest outcomes
          </p>
        </div>

        <div className="mx-auto flex justify-center gap-6 lg:gap-8">
          {/* Sidebar - hidden on mobile, shown on lg+ */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-6 space-y-6 rounded-2xl border border-border/50 bg-background/95 p-4 shadow-lg backdrop-blur-md">
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedType(null)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                      selectedType === null
                        ? "bg-gradient-to-r from-accent to-accent/80 text-accent-foreground shadow-md"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span>all</span>
                    <span className="text-xs opacity-70">{typeCounts.all}</span>
                  </button>
                  <button
                    onClick={() => setSelectedType("leadership")}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                      selectedType === "leadership"
                        ? "bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-md"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span>leadership</span>
                    <span className="text-xs opacity-70">{typeCounts.leadership}</span>
                  </button>
                  <button
                    onClick={() => setSelectedType("process")}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                      selectedType === "process"
                        ? "bg-gradient-to-r from-green-500 to-green-400 text-white shadow-md"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span>process</span>
                    <span className="text-xs opacity-70">{typeCounts.process}</span>
                  </button>
                  <button
                    onClick={() => setSelectedType("team-building")}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                      selectedType === "team-building"
                        ? "bg-gradient-to-r from-purple-500 to-purple-400 text-white shadow-md"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span>team-building</span>
                    <span className="text-xs opacity-70">{typeCounts["team-building"]}</span>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Experience
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedAge(null)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-all ${
                      selectedAge === null
                        ? "bg-accent/20 text-accent"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    All levels
                  </button>
                  <button
                    onClick={() => setSelectedAge("24-36")}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-all ${
                      selectedAge === "24-36"
                        ? "bg-accent/20 text-accent"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    2-3 years
                  </button>
                  <button
                    onClick={() => setSelectedAge("36-48")}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-all ${
                      selectedAge === "36-48"
                        ? "bg-accent/20 text-accent"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    3-4 years
                  </button>
                  <button
                    onClick={() => setSelectedAge("48-72")}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-all ${
                      selectedAge === "48-72"
                        ? "bg-accent/20 text-accent"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    4-6 years
                  </button>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Time</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedYear(null)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-all ${
                      selectedYear === null
                        ? "bg-accent/20 text-accent"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    All time
                  </button>
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year.toString())}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-all ${
                        selectedYear === year.toString()
                          ? "bg-accent/20 text-accent"
                          : "bg-muted/50 text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main content area */}
          <div className="min-w-0 flex-1 lg:max-w-md">
            <div className="mb-6 rounded-2xl border border-border/50 bg-background/95 p-4 shadow-lg backdrop-blur-md lg:hidden">
              <div className="mb-4">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedType(null)}
                    className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      selectedType === null
                        ? "bg-gradient-to-r from-accent to-accent/80 text-accent-foreground shadow-md"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span>all</span>
                    <span className="text-xs opacity-70">{typeCounts.all}</span>
                  </button>
                  <button
                    onClick={() => setSelectedType("leadership")}
                    className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      selectedType === "leadership"
                        ? "bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-md"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span>leadership</span>
                    <span className="text-xs opacity-70">{typeCounts.leadership}</span>
                  </button>
                  <button
                    onClick={() => setSelectedType("process")}
                    className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      selectedType === "process"
                        ? "bg-gradient-to-r from-green-500 to-green-400 text-white shadow-md"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span>process</span>
                    <span className="text-xs opacity-70">{typeCounts.process}</span>
                  </button>
                  <button
                    onClick={() => setSelectedType("team-building")}
                    className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      selectedType === "team-building"
                        ? "bg-gradient-to-r from-purple-500 to-purple-400 text-white shadow-md"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span>team-building</span>
                    <span className="text-xs opacity-70">{typeCounts["team-building"]}</span>
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Experience
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedAge(null)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      selectedAge === null
                        ? "bg-accent/20 text-accent"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    All levels
                  </button>
                  <button
                    onClick={() => setSelectedAge("24-36")}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      selectedAge === "24-36"
                        ? "bg-accent/20 text-accent"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    2-3 years
                  </button>
                  <button
                    onClick={() => setSelectedAge("36-48")}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      selectedAge === "36-48"
                        ? "bg-accent/20 text-accent"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    3-4 years
                  </button>
                  <button
                    onClick={() => setSelectedAge("48-72")}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      selectedAge === "48-72"
                        ? "bg-accent/20 text-accent"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    4-6 years
                  </button>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Time</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedYear(null)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      selectedYear === null
                        ? "bg-accent/20 text-accent"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    All time
                  </button>
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year.toString())}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        selectedYear === year.toString()
                          ? "bg-accent/20 text-accent"
                          : "bg-muted/50 text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-4 text-center">
              <p className="text-sm text-muted-foreground">
                {filteredActivities.length} {filteredActivities.length === 1 ? "post" : "posts"}
              </p>
            </div>

            <div className="space-y-4">
              {filteredActivities.map((activity, index) => (
                <TimelineCard
                  key={activity.id}
                  activity={activity}
                  onClick={() => setSelectedActivity(activity)}
                  onLike={() => handleLike(activity.id)}
                  likes={likes[activity.id] || 0}
                  isLiked={likedByUser[activity.id] || false}
                  observerRef={observerRef}
                  index={index}
                />
              ))}

              {filteredActivities.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-sm text-muted-foreground">No posts found with the selected filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <ActivityModal
        activity={selectedActivity}
        onClose={() => setSelectedActivity(null)}
        likes={selectedActivity ? likes[selectedActivity.id] || 0 : 0}
        isLiked={selectedActivity ? likedByUser[selectedActivity.id] || false : false}
        onLike={() => selectedActivity && handleLike(selectedActivity.id)}
      />
    </div>
  )
}
