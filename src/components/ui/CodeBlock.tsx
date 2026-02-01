"use client";

import React, { useState, useRef } from 'react';
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
    filename?: string;
    code?: string;
    className?: string;
}

export function CodeBlock({ filename, code, className, children }: CodeBlockProps & { children?: React.ReactNode }) {
    const [isCopied, setIsCopied] = useState(false);
    const preRef = useRef<HTMLPreElement>(null);

    // If children are passed (e.g. from mapped <pre> tag), use them.
    // Otherwise, use the 'code' prop and wrap it in a <code> tag with default styling.
    const content = children || (
        <code className="text-meta">{code}</code>
    );

    const handleCopy = async () => {
        let textToCopy = "";

        // 1. If 'code' prop is explicit, use it (Technical Way)
        if (code) {
            textToCopy = code;
        }
        // 2. If children (Easy Way), try to get text from ref
        else if (preRef.current) {
            textToCopy = preRef.current.innerText;
        }

        if (textToCopy) {
            try {
                await navigator.clipboard.writeText(textToCopy);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000); // Reset after 2s
            } catch (err) {
                console.error("Failed to copy code", err);
            }
        }
    };

    return (
        <Card
            tabIndex={0} // Make focusable for mobile tap
            className={cn(
                "code-block-card font-mono text-xs bg-neutral-50 mb-8 relative group outline-none",
                className
            )}
        >
            {/* Header / Filename */}
            {filename && (
                <div className="mb-4 text-accent uppercase tracking-wider text-xs font-bold flex items-center justify-between">
                    <span>{filename}</span>
                </div>
            )}

            {/* Content */}
            <pre ref={preRef} className="whitespace-pre-wrap font-mono bg-transparent! p-0! m-0! text-meta! overflow-x-auto">
                {content}
            </pre>

            {/* Copy Button (Absolute Positioned) */}
            <button
                onClick={handleCopy}
                className={cn(
                    "absolute top-3 right-3 p-1.5 rounded-md transition-all duration-200 cursor-pointer",
                    "text-meta hover:text-primary hover:bg-neutral-200/50",
                    "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus:opacity-100",
                    isCopied && "text-emerald-600 opacity-100 hover:text-emerald-700"
                )}
                aria-label="Copy code"
                title="Copy to clipboard"
            >
                {isCopied ? (
                    <Check className="w-4 h-4" />
                ) : (
                    <Copy className="w-4 h-4" />
                )}
            </button>
        </Card>
    );
}
