"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Slash, Home } from "lucide-react";
import { Fragment } from "react";

export function Breadcrumbs() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    // Don't show on home page
    if (segments.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 font-mono text-micro text-meta/60 mb-2 md:mb-6">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
                <Home className="w-3 h-3" />
                <span>root</span>
            </Link>

            {segments.map((segment, index) => {
                const href = `/${segments.slice(0, index + 1).join("/")}`;
                const isLast = index === segments.length - 1;

                return (
                    <Fragment key={segment}>
                        <Slash className="w-3 h-3 text-border/60 -rotate-12" />
                        {isLast ? (
                            <span className="text-meta font-medium truncate max-w-[200px]">
                                {segment}
                            </span>
                        ) : (
                            <Link href={href} className="hover:text-primary transition-colors">
                                {segment}
                            </Link>
                        )}
                    </Fragment>
                );
            })}
        </nav>
    );
}
