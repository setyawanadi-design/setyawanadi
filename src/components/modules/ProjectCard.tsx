
import React from 'react';
import { Card } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";

interface ProjectCardProps {
    title: string;
    category?: string;
    description: string;
    progress?: number;
    status?: string;
    className?: string; // Allow passing classes for grid positioning
}

export function ProjectCard({
    title,
    category = "Active Project",
    description,
    progress,
    status,
    className
}: ProjectCardProps) {
    return (
        <Card className={className}>
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2 text-sm text-meta font-mono uppercase">
                    <span>Tracker</span>
                    <span>//</span>
                    <span>{category}</span>
                </div>
                <span className="text-accent">↗</span>
            </div>

            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-meta mb-8 leading-relaxed">
                {description}
            </p>

            {progress !== undefined && (
                <div className="flex items-center gap-4">
                    <Progress value={progress} />
                    {status && (
                        <span className="font-mono text-xs text-meta whitespace-nowrap">{status}</span>
                    )}
                </div>
            )}
        </Card>
    );
}
