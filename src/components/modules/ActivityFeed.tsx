import React from 'react';
import { Card } from "@/components/ui/Card";
import { ChevronRight, RotateCcw, History, GitCommit, Play, Database, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashedLine } from "@/components/ui/DashedLine";

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
        <Card className={`group/card flex flex-col min-h-80 transition-colors duration-300 hover:border-accent ${className}`}>
            {/* Header / Meta */}
            <div className="flex items-center justify-between py-3 px-4 border-b border-border/40 relative">
                <DashedLine className="absolute bottom-0 left-0 w-full" variant="receipt" />
                <h3 className="font-mono text-xs uppercase tracking-widest text-meta flex items-center gap-2">
                    <History className="w-3.5 h-3.5" />
                    Recent Activity
                </h3>
                <RotateCcw className="w-3.5 h-3.5 text-meta group-hover/card:text-accent transition-colors" />
            </div>

            <div className="flex-1 space-y-1 overflow-y-auto pr-2 mb-6">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="group flex items-start gap-4 p-3 rounded-md transition-all duration-200 cursor-default hover:bg-accent/5"
                    >
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0 transition-colors text-accent/40 group-hover:text-accent" />
                        <span className="leading-relaxed font-mono text-xs md:text-sm font-medium transition-colors text-meta group-hover:text-primary">
                            {item.text}
                        </span>
                    </div>
                ))}
            </div>

            {/* Footer / Status */}
            <div className="py-3 px-4 bg-meta/5 border-t border-border/40 relative">
                <DashedLine className="absolute top-0 left-0 w-full" variant="receipt" />
                <div className="flex items-center justify-between font-mono text-micro text-meta/60">
                    <span className="font-mono text-micro uppercase tracking-wider text-meta group-hover/card:text-accent transition-colors font-medium">
                        Live Log Feed
                    </span>
                </div>
            </div>
        </Card>
    );
}
