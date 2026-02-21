import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: '/api/',
            },
            // Explicitly allow AI crawlers
            {
                userAgent: 'GPTBot',
                allow: '/',
                disallow: '/api/',
            },
            {
                userAgent: 'ChatGPT-User',
                allow: '/',
                disallow: '/api/',
            },
            {
                userAgent: 'Claude-Web',
                allow: '/',
                disallow: '/api/',
            },
            {
                userAgent: 'PerplexityBot',
                allow: '/',
                disallow: '/api/',
            },
        ],
        sitemap: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/sitemap.xml`,
    };
}
