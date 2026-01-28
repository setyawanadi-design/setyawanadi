"use client";

import { usePathname } from "next/navigation";
import { TableOfContents } from "@/components/modules/TableOfContents";
import { ActivityFeed } from "@/components/modules/ActivityFeed";
import { ContactCard } from "@/components/modules/ContactCard";
import { LogCategories } from "@/components/modules/LogCategories";
import { PinnedLogs } from "@/components/modules/PinnedLogs";
import type { LogPost } from "@/lib/mdx"; // Import type for props


export function Sidebar({ pinnedLogs = [], recentLogs = [] }: { pinnedLogs?: LogPost[], recentLogs?: LogPost[] }) {
    const pathname = usePathname();
    const isDesignPage = pathname === "/design";
    const isHomePage = pathname === "/";
    const isLogsRoot = pathname === "/logs";
    const isLogDetail = pathname?.startsWith("/logs/") && pathname !== "/logs";
    const isLogsPage = isLogsRoot; // "isLogsPage" in the lower block refers to the general section, but I used it for the categories block. I will update usage.

    // Map logs to Activity Feed format
    const activityItems = recentLogs.map((log) => ({
        id: log.slug,
        text: `New Log: ${log.metadata.title}`,
        href: `/logs/${log.slug}`
    }));

    return (
        <aside className="h-full flex flex-col gap-6 overflow-y-auto pb-4 no-scrollbar">
            {/* Design System Navigation */}
            {isDesignPage && (
                <div className="sticky top-0">
                    <TableOfContents />
                </div>
            )}

            {/* Home Page Sidebar Widgets */}
            {isHomePage && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <ActivityFeed
                        className="min-h-72"
                        items={activityItems.length > 0 ? activityItems : [
                            { id: '1', text: 'System: Waiting for data...' }
                        ]}
                    />
                    <ContactCard />
                </div>
            )}

            {/* Logs Page Sidebar Widgets */}
            {isLogsPage && !isLogDetail && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <ContactCard />
                    <LogCategories items={[
                        { label: "FIELD_REPORTS", count: 12 },
                        { label: "SYSTEM_LOGS", count: 8 },
                        { label: "REFLECTIONS", count: 5 },
                        { label: "ARCHIVE", count: 24 },
                    ]} />
                    <PinnedLogs items={pinnedLogs} className="md:grid-cols-1 gap-3" variant="compact" />
                </div>
            )}

            {/* Log Detail Page: Table of Contents */}
            {isLogDetail && (
                <div className="sticky top-0 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <TableOfContents autoScan />
                </div>
            )}


        </aside>
    );
}
