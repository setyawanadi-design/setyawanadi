
import React from 'react';
import { Card } from "@/components/ui/Card";
import { ChevronRight, RotateCcw } from "lucide-react";

interface ActivityItem {
    id: string;
    text: string;
    type?: 'commit' | 'deploy' | 'alert';
}

interface ActivityFeedProps {
    items: ActivityItem[];
    className?: string;
}

export function ActivityFeed({ items, className }: ActivityFeedProps) {
    return (
        <Card className={`flex flex-col h-full ${className}`}>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-dashed border-border/50">
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-primary">Recent Activity</h3>
                <RotateCcw className="w-3 h-3 text-meta" />
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                {items.map((item) => (
                    <div key={item.id} className="group flex items-start gap-3 text-sm text-meta hover:text-primary transition-colors cursor-default">
                        <ChevronRight className="w-4 h-4 text-accent/50 mt-0.5 group-hover:text-accent transition-colors" />
                        <span className="leading-relaxed font-mono text-xs md:text-sm">
                            {item.text}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-4 border-t border-dashed border-border/50 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-medium">
                    Live Log Feed
                </span>
            </div>
        </Card>
    );
}
