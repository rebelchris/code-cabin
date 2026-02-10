import { PostModalClient } from "@/components/post-modal-client";
import { buildPostViewBySlug } from "@/lib/post-view";

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  const postData = await buildPostViewBySlug(id)
  return <PostModalClient post={postData} />
}


