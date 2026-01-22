
import React from 'react';
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface StackModuleProps {
    title?: string;
    subtitle?: string;
    tags: string[];
    className?: string;
}

export function StackModule({
    title = "The Stack",
    subtitle = "Feature Block",
    tags,
    className
}: StackModuleProps) {
    return (
        <Card className={className}>
            <div className="h-full flex flex-col justify-between">
                <div>
                    <div className="text-3xl mb-4 text-gray-300">◎</div>
                    <div className="text-xs font-mono text-meta uppercase mb-1">{subtitle}</div>
                    <div className="text-xl font-bold text-accent">{title}</div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                </div>
            </div>
        </Card>
    );
}
