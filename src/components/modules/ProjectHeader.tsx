
import React from 'react';
import { cn } from "@/lib/utils";
import { DashedLine } from "@/components/ui/DashedLine";

interface ProjectHeaderProps {
    id: string;
    date: string;
    location: string;
    completionPercentage?: number;
    className?: string;
}

export function ProjectHeader({ id, date, location, completionPercentage, className }: ProjectHeaderProps) {
    return (
        <div
            className={`relative w-full py-2 flex items-center justify-between font-mono text-micro uppercase tracking-wider text-meta ${className}`}
        >
            <DashedLine className="absolute top-0 left-0 w-full" variant="receipt" />
            <DashedLine className="absolute bottom-0 left-0 w-full" variant="receipt" />
            <div className="flex gap-4">
                <span>ID: {id}</span>
                <span className="text-border">{'//'}</span>
                <span>Date: {date}</span>
                <span className="text-border">{'//'}</span>
                <span>Loc: {location}</span>
            </div>
            {completionPercentage !== undefined && (
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span>{completionPercentage}% Complete</span>
                </div>
            )}
        </div>
    );
}
