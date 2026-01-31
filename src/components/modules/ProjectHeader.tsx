
import React from 'react';
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

interface ProjectHeaderProps {
    id: string;
    date: string;
    location?: string;
    tags?: string[];
    category?: string;
    className?: string;
}

export function ProjectHeader({ id, date, location, tags, category, className }: ProjectHeaderProps) {
    return (
        <div
            className={`relative w-full py-4 font-mono text-[9px] md:text-micro uppercase tracking-wider text-meta ${className}`}
        >
            {/* Content Container with standard padding */}
            <div className="w-full px-4 md:px-4 flex items-center justify-between">
                <div className="flex gap-4">
                    <span>ID: {id}</span>
                    <span className="text-border">{'//'}</span>
                    <span>Date: {date}</span>
                    {location && (
                        <>
                            <span className="text-border">{'//'}</span>
                            <span>Loc: {location}</span>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {category && (
                        <Badge variant="default" className="font-mono text-[9px] md:text-[10px] uppercase tracking-wider px-1.5 md:px-2 py-0.5 h-auto rounded-full">
                            {category}
                        </Badge>
                    )}
                    {tags && tags.map((tag) => (
                        <Badge
                            key={tag}
                            variant="outline"
                            className="bg-neutral-100 text-meta hover:bg-neutral-200 border-none font-mono text-[9px] md:text-[10px] uppercase tracking-wider px-1.5 md:px-2 py-0.5 h-auto rounded-full"
                        >
                            #{tag}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    );
}
