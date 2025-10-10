import LikeButton from "@/components/LikeButton";
import {getCategoryColor} from "@/lib/category-colors";
import { MessageCircleMore  } from "lucide-react";

export const MetaBlock = ({id, category, tags}: {id: string, category: string, tags: string[]}) => {
    return (
    <div className="mt-6 flex flex-wrap gap-2">
        <LikeButton postId={id} />
        <span
            className={`rounded-full flex justify-center items-center px-3 py-1 text-sm font-medium ${getCategoryColor(category).bg} ${getCategoryColor(category).text}`}
        >
            {category}
          </span>
        {tags && tags.length > 0 && tags.map((tag: string) => (
            <span key={tag} className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
              {tag}
            </span>
        ))}
        <a href={'https://app.daily.dev/squads/codecabin'} target={'_blank'} rel={'noreferrer noopener'} className={'rounded-full px-3 py-1.5 text-sm bg-gradient-to-r from-accent/10 to-accent/10 text-accent flex items-center'}><MessageCircleMore className='size-4' /></a>
    </div>
    )
}
