
import React from 'react';
import { TECH_DASH } from "@/lib/utils";

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
            className={`w-full py-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-meta ${className}`}
            style={{
                ...TECH_DASH,
                backgroundImage: `${TECH_DASH.backgroundImage}, ${TECH_DASH.backgroundImage}`,
                backgroundPosition: 'top, bottom'
            }}
        >
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
