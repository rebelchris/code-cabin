import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import type { Post } from "@/lib/types";

const postsDirectory = join(process.cwd(), "content");

export function getPostSlugs(): string[] {
    return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string): Post {
    const realSlug = slug.replace(/\.mdx$/, "");
    const fullPath = join(postsDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return { ...(data as any), slug: realSlug, content } as Post;
}

export function getAllCategories(): string[] {
    const slugs = getPostSlugs();
    const categories = new Set<string>();
    
    slugs.forEach((slug) => {
        const post = getPostBySlug(slug);
        if (post.category) {
            categories.add(post.category);
        }
    });
    
    return Array.from(categories).sort();
}

export function getAllPosts(): Post[] {
    const slugs = getPostSlugs();
    const posts: Post[] = slugs
        .map((slug) => getPostBySlug(slug))
        // sort posts by date in descending order
        .sort((post1, post2) => ((post1.date || "") > (post2.date || "") ? -1 : 1));
    return posts;
}
