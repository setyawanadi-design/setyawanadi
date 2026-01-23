"use client";

import { usePathname } from "next/navigation";
import { TableOfContents } from "@/components/modules/TableOfContents";

export function Sidebar() {
    const pathname = usePathname();
    const isDesignPage = pathname === "/design";

    return (
        <aside className="h-full flex flex-col gap-8 pt-4">
            {/* Design System Navigation */}
            {isDesignPage && (
                <div className="sticky top-24">
                    <TableOfContents />
                </div>
            )}

            {/* Future sidebar content can go here */}
        </aside>
    );
}
