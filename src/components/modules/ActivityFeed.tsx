import React from 'react';
import { Card } from "@/components/ui/Card";
import { ChevronRight, RotateCcw } from "lucide-react";
import { TECH_DASH } from "@/lib/utils";

interface ActivityItem {
    id: string;
    text: string;
}

interface ActivityFeedProps {
    items: ActivityItem[];
    className?: string;
}

export function ActivityFeed({ items, className }: ActivityFeedProps) {
    return (
        <Card className={`group/card flex flex-col min-h-[320px] transition-colors duration-300 border-border/60 hover:border-accent ${className}`}>
            <div
                className="flex items-center justify-between mb-6 pb-4"
                style={{ ...TECH_DASH, backgroundPosition: 'bottom' }}
            >
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-primary">Recent Activity</h3>
                <RotateCcw className="w-3.5 h-3.5 text-meta group-hover/card:text-accent transition-colors" />
            </div>

            <div className="flex-1 space-y-1 overflow-y-auto pr-2">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="group flex items-start gap-4 p-3 rounded-md transition-all duration-200 hover:bg-muted/40 cursor-default"
                    >
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-accent/70 group-hover:text-accent transition-colors" />
                        <span className="leading-relaxed font-mono text-xs md:text-sm font-medium text-meta group-hover:text-primary transition-colors">
                            {item.text}
                        </span>
                    </div>
                ))}
            </div>

            <div
                className="mt-auto pt-4 flex items-center gap-3"
                style={{ ...TECH_DASH, backgroundPosition: 'top' }}
            >
                <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-meta group-hover/card:text-accent transition-colors font-medium">
                    Live Log Feed
                </span>
            </div>
        </Card>
    );
}
