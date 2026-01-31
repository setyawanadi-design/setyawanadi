
import React from 'react';
import { Card } from "@/components/ui/Card";

interface CodeBlockProps {
    filename?: string;
    code?: string;
    className?: string;
}

export function CodeBlock({ filename, code, className, children }: CodeBlockProps & { children?: React.ReactNode }) {
    // If children are passed (e.g. from mapped <pre> tag), use them.
    // Otherwise, use the 'code' prop and wrap it in a <code> tag with default styling.
    const content = children || (
        <code className="text-meta">{code}</code>
    );

    return (
        <Card className={`font-mono text-xs bg-neutral-50 mb-8 ${className || ''}`}>
            {filename && (
                <div className="mb-4 text-accent uppercase tracking-wider text-xs font-bold">
                    {filename}
                </div>
            )}
            <pre className="whitespace-pre-wrap font-mono bg-transparent! p-0! m-0! text-meta!">
                {content}
            </pre>
        </Card>
    );
}
