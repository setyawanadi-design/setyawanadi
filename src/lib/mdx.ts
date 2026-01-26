import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const logsDirectory = path.join(process.cwd(), 'src/content/logs');

export interface LogPost {
    slug: string;
    metadata: LogMetadata;
    content: string;
}

export interface LogMetadata {
    title: string;
    date: string;
    description?: string;
    status?: string;
    tags?: string[];
    pinned?: boolean;
    hero_image?: string;
    [key: string]: any;
}

export function getPinnedLogs(): LogPost[] {
    const allLogs = getLogPosts();
    return allLogs.filter(log => log.metadata.pinned === true);
}

export function getLogPosts(): LogPost[] {
    if (!fs.existsSync(logsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(logsDirectory);
    const allLogsData = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(logsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            metadata: data as LogMetadata,
            content,
        };
    });

    // Sort logs by date
    return allLogsData.sort((a, b) => {
        if (a.metadata.date < b.metadata.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getLogBySlug(slug: string): LogPost | null {
    try {
        const fullPath = path.join(logsDirectory, `${slug}.mdx`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            metadata: data as LogMetadata,
            content,
        };
    } catch (error) {
        return null;
    }
}
