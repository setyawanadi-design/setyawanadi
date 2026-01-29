import { LogCard } from "./LogCard";
import { ShieldAlert } from "lucide-react";
import type { LogPost } from "@/lib/mdx";

import { cn } from "@/lib/utils";

interface PinnedLogsProps {
    items?: LogPost[];
    showHeader?: boolean;
    className?: string; // For grid overrides
    variant?: "standard" | "compact" | "featured"; // Pass down to LogCard
}

export function PinnedLogs({ items = [], showHeader = true, className, variant = "standard" }: PinnedLogsProps) {
    if (!items || items.length === 0) return null;

    return (
        <div className="space-y-3">
            {showHeader && (
                <div className="flex justify-between items-center px-1 mb-2">
                    <h4 className="font-mono text-micro text-primary font-bold uppercase tracking-wider">Pinned Logs</h4>
                    <ShieldAlert className="w-3 h-3 text-accent" />
                </div>
            )}

            <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6", className)}>
                {items.map((log) => (
                    <LogCard
                        key={log.slug}
                        variant={variant}
                        title={log.metadata.title}
                        date={log.metadata.date}
                        id={log.slug}
                        description={log.metadata.description}
                        tags={log.metadata.tags}
                        meta={{
                            status: log.metadata.status,
                            progress: log.metadata.progress,
                            checklist: log.metadata.checklist
                        }}
                        className="h-full"
                    />
                ))}
            </div>
        </div>
    );
}
