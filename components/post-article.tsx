"use client"

import Image from "next/image"
import { MetaBlock } from './MetaBlock'
import { NewsletterSubscribe } from './newsletter-subscribe'

type PostArticleProps = {
  postId: string
  title: string
  date: string
  image?: string
  category: string
  tags?: string[]
  contentHtml: string
}

export function PostArticle({ postId, title, date, image, category, tags = [], contentHtml }: PostArticleProps) {
  return (
    <article className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <span>{date}</span>
      </div>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl text-balance">
        {title}
      </h1>

      <MetaBlock id={postId} category={category} tags={tags} />

      {image && (
        <div className="relative mx-auto mt-6 aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
      )}

      <div className="mt-6 space-y-5">
        <div className='prose' dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>

      {/* Newsletter subscription */}
      <div className="mt-12 flex justify-center">
        <div className="w-full max-w-md">
          <NewsletterSubscribe variant="compact" />
        </div>
      </div>

    </article>
  )
}


