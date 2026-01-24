"use client";

import { usePathname } from "next/navigation";
import { TableOfContents } from "@/components/modules/TableOfContents";
import { ActivityFeed } from "@/components/modules/ActivityFeed";
import { ContactCard } from "@/components/modules/ContactCard";

export function Sidebar() {
    const pathname = usePathname();
    const isDesignPage = pathname === "/design";
    const isHomePage = pathname === "/";

    return (
        <aside className="h-full flex flex-col gap-6 pt-4 overflow-y-auto pb-4 no-scrollbar">
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
                        className="min-h-[300px]"
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
        </aside>
    );
}
