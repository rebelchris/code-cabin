"use client"

import { getCategoryButtonColor } from "@/lib/category-colors"

interface FilterSectionProps {
  title: string
  children: React.ReactNode
  className?: string
}

function FilterSection({ title, children, className = "" }: FilterSectionProps) {
  return (
    <div className={className}>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      {children}
    </div>
  )
}

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  categoryCounts: Record<string, number>
  variant?: "desktop" | "mobile"
}

export function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  categoryCounts,
  variant = "desktop" 
}: CategoryFilterProps) {
  const isDesktop = variant === "desktop"
  
  return (
    <FilterSection title="Category">
      <div className={isDesktop ? "space-y-2" : "flex flex-wrap gap-2"}>
        <button
          onClick={() => onCategoryChange(null)}
          className={`${
            isDesktop 
              ? "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all"
              : "flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all"
          } ${
            selectedCategory === null
              ? "bg-gradient-to-r from-accent to-accent/80 text-accent-foreground shadow-md"
              : "bg-muted/50 text-muted-foreground hover:bg-muted"
          }`}
        >
          <span>all</span>
          <span className="text-xs opacity-70">{categoryCounts.all}</span>
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`${
              isDesktop 
                ? "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all"
                : "flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all"
            } ${getCategoryButtonColor(category, selectedCategory === category)}`}
          >
            <span>{category}</span>
            <span className="text-xs opacity-70">{categoryCounts[category] || 0}</span>
          </button>
        ))}
      </div>
    </FilterSection>
  )
}

interface TimeFilterProps {
  years: number[]
  selectedYear: string | null
  onYearChange: (year: string | null) => void
  variant?: "desktop" | "mobile"
}

export function TimeFilter({ 
  years, 
  selectedYear, 
  onYearChange,
  variant = "desktop" 
}: TimeFilterProps) {
  const isDesktop = variant === "desktop"
  
  return (
    <FilterSection title="Time">
      <div className={isDesktop ? "space-y-2" : "flex flex-wrap gap-2"}>
        <button
          onClick={() => onYearChange(null)}
          className={`${
            isDesktop 
              ? "w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-all"
              : "rounded-full px-4 py-2 text-sm font-medium transition-all"
          } ${
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
            onClick={() => onYearChange(year.toString())}
            className={`${
              isDesktop 
                ? "w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-all"
                : "rounded-full px-4 py-2 text-sm font-medium transition-all"
            } ${
              selectedYear === year.toString()
                ? "bg-accent/20 text-accent"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            }`}
          >
            {year}
          </button>
        ))}
      </div>
    </FilterSection>
  )
}
