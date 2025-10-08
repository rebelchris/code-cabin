// Color mapping for categories with fallbacks
export const categoryColors: Record<string, { bg: string; text: string; hover: string }> = {
  "hard lessons": {
    bg: "bg-gradient-to-r from-red-500/10 to-orange-500/10",
    text: "text-red-600 dark:text-red-400",
    hover: "hover:bg-red-500/20"
  },
  "leadership": {
    bg: "bg-gradient-to-r from-blue-500/10 to-blue-400/10",
    text: "text-blue-600 dark:text-blue-400",
    hover: "hover:bg-blue-500/20"
  },
  "process": {
    bg: "bg-gradient-to-r from-green-500/10 to-green-400/10",
    text: "text-green-600 dark:text-green-400",
    hover: "hover:bg-green-500/20"
  },
  "team-building": {
    bg: "bg-gradient-to-r from-purple-500/10 to-purple-400/10",
    text: "text-purple-600 dark:text-purple-400",
    hover: "hover:bg-purple-500/20"
  },
  "communication": {
    bg: "bg-gradient-to-r from-cyan-500/10 to-cyan-400/10",
    text: "text-cyan-600 dark:text-cyan-400",
    hover: "hover:bg-cyan-500/20"
  },
  "productivity": {
    bg: "bg-gradient-to-r from-emerald-500/10 to-emerald-400/10",
    text: "text-emerald-600 dark:text-emerald-400",
    hover: "hover:bg-emerald-500/20"
  },
  "culture": {
    bg: "bg-gradient-to-r from-pink-500/10 to-pink-400/10",
    text: "text-pink-600 dark:text-pink-400",
    hover: "hover:bg-pink-500/20"
  },
  "strategy": {
    bg: "bg-gradient-to-r from-indigo-500/10 to-indigo-400/10",
    text: "text-indigo-600 dark:text-indigo-400",
    hover: "hover:bg-indigo-500/20"
  }
}

// Fallback colors for unknown categories
const fallbackColors = [
  { bg: "bg-gradient-to-r from-gray-500/10 to-gray-400/10", text: "text-gray-600 dark:text-gray-400", hover: "hover:bg-gray-500/20" },
  { bg: "bg-gradient-to-r from-slate-500/10 to-slate-400/10", text: "text-slate-600 dark:text-slate-400", hover: "hover:bg-slate-500/20" },
  { bg: "bg-gradient-to-r from-zinc-500/10 to-zinc-400/10", text: "text-zinc-600 dark:text-zinc-400", hover: "hover:bg-zinc-500/20" },
  { bg: "bg-gradient-to-r from-stone-500/10 to-stone-400/10", text: "text-stone-600 dark:text-stone-400", hover: "hover:bg-stone-500/20" },
  { bg: "bg-gradient-to-r from-neutral-500/10 to-neutral-400/10", text: "text-neutral-600 dark:text-neutral-400", hover: "hover:bg-neutral-500/20" }
]

export function getCategoryColor(category: string): { bg: string; text: string; hover: string } {
  if (categoryColors[category]) {
    return categoryColors[category]
  }
  
  // Generate a consistent fallback color based on category name
  const hash = category.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
  
  const index = Math.abs(hash) % fallbackColors.length
  return fallbackColors[index]
}

// Button color variants for category filters
export const categoryButtonColors: Record<string, { active: string; inactive: string }> = {
  "hard lessons": {
    active: "bg-gradient-to-r from-red-500 to-red-400 text-white shadow-md",
    inactive: "bg-muted/50 text-muted-foreground hover:bg-muted"
  },
  "leadership": {
    active: "bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-md",
    inactive: "bg-muted/50 text-muted-foreground hover:bg-muted"
  },
  "process": {
    active: "bg-gradient-to-r from-green-500 to-green-400 text-white shadow-md",
    inactive: "bg-muted/50 text-muted-foreground hover:bg-muted"
  },
  "team-building": {
    active: "bg-gradient-to-r from-purple-500 to-purple-400 text-white shadow-md",
    inactive: "bg-muted/50 text-muted-foreground hover:bg-muted"
  },
  "communication": {
    active: "bg-gradient-to-r from-cyan-500 to-cyan-400 text-white shadow-md",
    inactive: "bg-muted/50 text-muted-foreground hover:bg-muted"
  },
  "productivity": {
    active: "bg-gradient-to-r from-emerald-500 to-emerald-400 text-white shadow-md",
    inactive: "bg-muted/50 text-muted-foreground hover:bg-muted"
  },
  "culture": {
    active: "bg-gradient-to-r from-pink-500 to-pink-400 text-white shadow-md",
    inactive: "bg-muted/50 text-muted-foreground hover:bg-muted"
  },
  "strategy": {
    active: "bg-gradient-to-r from-indigo-500 to-indigo-400 text-white shadow-md",
    inactive: "bg-muted/50 text-muted-foreground hover:bg-muted"
  }
}

export function getCategoryButtonColor(category: string, isActive: boolean): string {
  if (categoryButtonColors[category]) {
    return isActive ? categoryButtonColors[category].active : categoryButtonColors[category].inactive
  }
  
  // Fallback for unknown categories
  return isActive 
    ? "bg-gradient-to-r from-accent to-accent/80 text-accent-foreground shadow-md"
    : "bg-muted/50 text-muted-foreground hover:bg-muted"
}
