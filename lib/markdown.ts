import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface Story {
  slug: string
  title: string
  category: string
  date: string
  readTime: string
  description: string
  content: string
}

const storiesDirectory = path.join(process.cwd(), "content/stories")

export function getAllStories(): Story[] {
  const fileNames = fs.readdirSync(storiesDirectory)
  const stories = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const slug = name.replace(/\.md$/, "")
      const fullPath = path.join(storiesDirectory, name)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title,
        category: data.category,
        date: data.date,
        readTime: data.readTime,
        description: data.description,
        content,
      }
    })

  // Sort stories by date (newest first)
  return stories.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getStoryBySlug(slug: string): Story | null {
  try {
    const fullPath = path.join(storiesDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      category: data.category,
      date: data.date,
      readTime: data.readTime,
      description: data.description,
      content,
    }
  } catch (error) {
    return null
  }
}

export function getCategories(): Array<{ name: string; count: number }> {
  const stories = getAllStories()
  const categoryCount = stories.reduce(
    (acc, story) => {
      acc[story.category] = (acc[story.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const categories = Object.entries(categoryCount).map(([name, count]) => ({
    name,
    count,
  }))

  // Add "All Stories" category
  categories.unshift({ name: "All Stories", count: stories.length })

  return categories
}
