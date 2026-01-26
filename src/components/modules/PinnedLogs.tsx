import { LogCard } from "./LogCard";
import { ShieldAlert } from "lucide-react";
import type { LogPost } from "@/lib/mdx";

interface PinnedLogsProps {
    items?: LogPost[];
}

export function PinnedLogs({ items = [] }: PinnedLogsProps) {
    if (!items || items.length === 0) return null;

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center px-1 mb-2">
                <h4 className="font-mono text-micro text-primary font-bold uppercase tracking-wider">Pinned Logs</h4>
                <ShieldAlert className="w-3 h-3 text-accent" />
            </div>

            {items.map((log) => (
                <LogCard
                    key={log.slug}
                    variant="compact"
                    title={log.metadata.title}
                    date={log.metadata.date}
                    id={log.slug}
                    description={log.metadata.description}
                />
            ))}
        </div>
    );
}
