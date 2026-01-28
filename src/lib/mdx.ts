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
    } catch {
        return null;
    }
}



export interface HomeData {
    focus: {
        title: string;
        status: "Active" | "Paused" | "Completed";
        description: string;
    };
    project: {
        id?: string; // Add slug for linking
        title: string;
        description: string;
        progress: number;
        status: string;
        category: string;
        checklist?: {
            label: string;
            completed: boolean;
        }[];
    };
    stack: {
        title: string;
        subtitle: string;
        tags: string[];
    };
    visualLog: {
        id: string;
        label?: string;
        year: string;
        imageSrc: string;
    };
}

export function calculateProgress(content: string): number {
    const todos = (content.match(/- \[ \]/g) || []).length;
    const dones = (content.match(/- \[x\]/g) || []).length;
    const total = todos + dones;

    if (total === 0) return 0;
    return Math.round((dones / total) * 100);
}

export function getHomeData(): HomeData | null {
    try {
        // 1. Read base config (keeping for Stack and defaults)
        const fullPath = path.join(process.cwd(), 'src/content/home.json');
        let homeData: HomeData | null = null;

        if (fs.existsSync(fullPath)) {
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            homeData = JSON.parse(fileContents) as HomeData;
        }

        // 2. Find Active Project Log (Status: IN_PROGRESS or Active)
        const logs = getLogPosts();
        // Prioritize logs explicitly marked as IN_PROGRESS
        const activeLog = logs.find(log =>
            log.metadata.status === "IN_PROGRESS" ||
            log.metadata.status?.toLowerCase() === "active"
        );

        // 3. Populate Project/Focus Data from Active Log
        if (activeLog && homeData) {
            const progress = calculateProgress(activeLog.content);

            // Extract Checklist Items
            const checklistRegex = /^[-*] \[(x| )\] (.*)$/gm;
            const checklist: { label: string; completed: boolean }[] = [];
            let match;
            while ((match = checklistRegex.exec(activeLog.content)) !== null) {
                checklist.push({
                    completed: match[1] === 'x',
                    label: match[2].trim()
                });
            }

            // Map MDX to Project Data
            homeData.project = {
                id: activeLog.slug,
                title: activeLog.metadata.title,
                description: activeLog.metadata.description || "",
                progress: progress,
                status: `${progress}%`,
                category: activeLog.metadata.category || "Development",
                checklist: checklist
            };

            // Map MDX to Focus Data
            // We use the same log for "Focus" since they are merged now
            homeData.focus = {
                title: "Current Focus", // Static title for the block
                status: (activeLog.metadata.status === "IN_PROGRESS" ? "Active" : activeLog.metadata.status) as "Active" | "Paused" | "Completed",
                description: activeLog.metadata.description || ""
            };
        } else if (homeData) {
            // Fallback if no active log found - clear out static "Active Dev" data to avoid confusion
            homeData.focus = {
                title: "No Active Focus",
                status: "Paused",
                description: "No active project logs found."
            };
        }

        // 4. Override Visual Log with latest image from ANY log
        const latestVisualLog = logs.find(log => log.metadata.hero_image);
        if (latestVisualLog) {
            if (homeData && homeData.visualLog) {
                // Extract filename from URL or path
                const imageUrl = latestVisualLog.metadata.hero_image || "";
                const imageName = imageUrl.split('/').pop()?.split('?')[0] || latestVisualLog.slug;

                homeData.visualLog = {
                    id: latestVisualLog.slug,
                    label: imageName,
                    year: latestVisualLog.metadata.date.split('.')[0] || "2026",
                    imageSrc: imageUrl
                };
            }
        }

        return homeData;
    } catch {
        return null;
    }
}
