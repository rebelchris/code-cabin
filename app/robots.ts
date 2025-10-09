import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*', // Apply rules to all user agents (bots)
            allow: '/',     // Allow crawling of all pages
            disallow: '/api/', // Disallow crawling of specific paths (optional)
        },
        sitemap: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/sitemap.xml`, // Specify your sitemap URL
    };
}
