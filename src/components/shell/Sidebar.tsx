"use client";

import { usePathname } from "next/navigation";

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="h-full flex flex-col gap-8 pt-4">
            {/* Sidebar content cleared. Ready for new component implementation. */}
        </aside>
    );
}
