// import React from 'react';
import { Badge } from "@/components/ui/Badge";
import { DashedLine } from "@/components/ui/DashedLine";
import { InteractiveHoverTitle } from "@/components/ui/InteractiveHoverTitle";

interface HeroModuleProps {
    title?: string;
    subtitle?: string;
    badgeText?: string;
}

export function HeroModule({
    title = "Setyawanadi",
    subtitle = "Digital Workspace & Design System",
    badgeText = "System Online",
}: HeroModuleProps) {
    return (
        <div className="pb-8 mb-8 pt-8 relative col-span-full animate-in fade-in slide-in-from-bottom-2 duration-700">
            {/* Bottom Separator */}
            <DashedLine className="absolute bottom-0 left-0 w-full" variant="tech" />

            <div className="flex justify-between items-end">
                <div className="max-w-3xl">
                    <Badge variant="dot" statusColor="busy" className="mb-6">{badgeText}</Badge>
                    <InteractiveHoverTitle
                        title={title}
                        className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight text-primary"
                    />
                    <p className="text-lg md:text-xl text-meta leading-relaxed max-w-3xl">
                        {subtitle}
                    </p>
                </div>

                {/* Decorative Visual (Restored) */}
                <div className="relative w-32 h-32 md:w-48 md:h-48 hidden md:block mb-4 mr-4 opacity-80">
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-2xl" />
                    <div className="absolute inset-4 border border-accent/20 rounded-full" />
                    <div className="absolute inset-8 border border-dashed border-accent/40 rounded-full animate-[spin_10s_linear_infinite]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 bg-accent/80 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
