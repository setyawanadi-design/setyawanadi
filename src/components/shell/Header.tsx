"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DashedLine } from '@/components/ui/DashedLine';
import { SystemStatus } from '@/components/shell/SystemStatus';
import { cn } from "@/lib/utils";

import { useScrollDirection } from '@/hooks/useScrollDirection';

export function Header() {
    const pathname = usePathname();
    const scrollDirection = useScrollDirection();
    const isHidden = scrollDirection === 'down';

    return (
        <header
            className={cn(
                "fixed top-0 left-0 w-full h-16 bg-background z-50 flex items-center justify-between px-6 border-b border-border transition-transform duration-300 md:transition-none",
                isHidden ? "-translate-y-full md:translate-y-0" : "translate-y-0"
            )}
        >
            {/* Bottom Border (Replaced with standard border-b) */}
            <div className="text-xl font-display font-bold text-primary flex items-center">
                <SystemStatus />
                <Link href="/">Setyawanadi<span className="text-accent text-3xl leading-none">.</span></Link>
            </div>
            <nav className="flex items-center gap-6">
                {/* Navigation Links (Currently Empty) */}
            </nav>
        </header>
    );
}
