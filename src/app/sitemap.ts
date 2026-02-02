import { MetadataRoute } from 'next';
import { getLogPosts } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://setyawanadi.com'; // Replace with your actual domain
    const logs = getLogPosts();

    const logEntries: MetadataRoute.Sitemap = logs.map((log) => ({
        url: `${baseUrl}/${log.slug}`,
        lastModified: new Date(log.metadata.date),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/design`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        ...logEntries,
    ];
}
