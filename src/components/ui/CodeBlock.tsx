
import React from 'react';
import { Card } from "@/components/ui/Card";

interface CodeBlockProps {
    filename?: string;
    code: string;
    className?: string;
}

export function CodeBlock({ filename, code, className }: CodeBlockProps) {
    return (
        <Card className={`font-mono text-xs p-6 bg-neutral-50/50 ${className}`} variant="flat">
            {filename && (
                <div className="mb-4 text-accent uppercase tracking-wider text-[10px] font-bold">
                    {filename}
                </div>
            )}
            <pre className="whitespace-pre-wrap text-meta font-mono">
                <code>{code}</code>
            </pre>
        </Card>
    );
}
