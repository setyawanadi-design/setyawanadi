
import React from 'react';
import { Card } from "@/components/ui/Card";

interface CodeBlockProps {
    filename?: string;
    code: string;
    className?: string;
}

export function CodeBlock({ filename, code, className }: CodeBlockProps) {
    return (
        <Card className={`font-mono text-xs bg-neutral-50 ${className}`}>
            {filename && (
                <div className="mb-4 text-accent uppercase tracking-wider text-xs font-bold">
                    {filename}
                </div>
            )}
            <pre className="whitespace-pre-wrap font-mono !bg-transparent !p-0 !m-0">
                <code className="text-meta">{code}</code>
            </pre>
        </Card>
    );
}
