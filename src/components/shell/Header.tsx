"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DashedLine } from '@/components/ui/DashedLine';
import { SystemStatus } from '@/components/shell/SystemStatus';
import { cn } from "@/lib/utils";

export function Header() {
    const pathname = usePathname();

    return (
        <header
            className="fixed top-0 left-0 w-full h-16 bg-background z-50 flex items-center justify-between px-6"
        >
            {/* Bottom Border (Tech) */}
            <DashedLine className="absolute bottom-0 left-0 w-full" variant="receipt" />
            <div className="text-xl font-display font-bold text-primary flex items-center">
                <SystemStatus />
                <Link href="/">Adi<span className="text-accent text-3xl leading-none">.</span></Link>
            </div>
            <nav className="flex items-center gap-6">
                {/* Navigation Links (Currently Empty) */}
            </nav>
        </header>
    );
}
