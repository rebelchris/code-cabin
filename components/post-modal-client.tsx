"use client"

import { useRouter } from "next/navigation"
import type { PostView } from "@/lib/types"
import { PostModal as ModalUI } from "@/components/post-modal"

export function PostModalClient({ post }: { post: PostView }) {
  const router = useRouter()
  return <ModalUI post={post} onClose={() => router.back()} />
}


