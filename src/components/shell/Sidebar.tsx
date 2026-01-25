"use client";

import { usePathname } from "next/navigation";
import { TableOfContents } from "@/components/modules/TableOfContents";
import { ActivityFeed } from "@/components/modules/ActivityFeed";
import { ContactCard } from "@/components/modules/ContactCard";
import { LogCategories } from "@/components/modules/LogCategories";
import { PinnedLogs } from "@/components/modules/PinnedLogs";


export function Sidebar() {
    const pathname = usePathname();
    const isDesignPage = pathname === "/design";
    const isHomePage = pathname === "/";
    const isLogsPage = pathname === "/logs";


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
                        items={[
                            { id: '1', text: 'Commit: Stabilized Grid Layout Architecture.' },
                            { id: '2', text: 'Deploy: FocusCard Module to Production.' },
                            { id: '3', text: 'System: Optimization routines running.' },
                            { id: '4', text: 'Log: Daily backup completed successfully.' },
                        ]}
                    />
                    <ContactCard />
                </div>
            )}

            {/* Logs Page Sidebar Widgets */}
            {isLogsPage && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <ContactCard
                        title="Inquiries"
                        label="COLLAB"
                    />
                    <LogCategories items={[
                        { label: "FIELD_REPORTS", count: 12 },
                        { label: "SYSTEM_LOGS", count: 8 },
                        { label: "REFLECTIONS", count: 5 },
                        { label: "ARCHIVE", count: 24 },
                    ]} />
                    <PinnedLogs />
                </div>
            )}


        </aside>
    );
}
