import { getAllPosts } from '@/lib/markdown';
import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.codecabin.dev';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const allPosts = await getAllPosts();

    // 1. Generate Dynamic Post Routes
    const postsRoutes: MetadataRoute.Sitemap = allPosts.map((post) => ({
        url: `${BASE_URL}/post/${post.slug}`,
        lastModified: new Date(post.date).toISOString(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // 2. Define Static Routes (Home, About, etc.)
    const staticRoutes: MetadataRoute.Sitemap = [
        // Home Page
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
    ];

    // 3. Combine and return all routes
    return [...staticRoutes, ...postsRoutes];
}
