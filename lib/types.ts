export interface Frontmatter {
  title?: string
  description?: string
  date?: string
  readTime?: string
  slug?: string
  image?: string
  tags?: string[]
  category?: string
  age?: string
  timeInvestment?: string
  whatWeTried?: string
  whatHappened?: string
  whyItWorked?: string
  theLesson?: string
}

export interface Post extends Frontmatter {
  slug: string
  content: string
}

export interface PostView {
  id: string
  title: string
  description: string
  age: string
  date: string
  timeInvestment: string
  whatWeTried: string
  whatHappened: string
  whyItWorked: string
  theLesson: string
  image: string
  tags?: string[]
  category: string
  timestamp: string
  contentHtml?: string
}


