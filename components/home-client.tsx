"use client"

import { useEffect, useMemo, useRef, useState } from "react"
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
  ageMonths: number
  timestamp: string
}

export default function HomeClient({ initialActivities }: { initialActivities: Activity[] }) {
  const [activities] = useState<Activity[]>(initialActivities)
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
  }, [activities])

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
  }, [activities])

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
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [activities, selectedYear, selectedType, selectedAge])

  const typeCounts = useMemo(() => {
    const counts = { all: activities.length, leadership: 0, process: 0, "team-building": 0 as number }
    activities.forEach((a) => {
      counts[a.type as keyof typeof counts]++
    })
    return counts
  }, [activities])

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
