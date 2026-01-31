"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Progress } from "@/components/ui/Progress";
import { cn } from "@/lib/utils";
import { Share2 } from "lucide-react";

interface LogPeekProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    id?: string;
    meta?: {
        status?: string;
        progress?: {
            total: number;
            completed: number;
            percentage: number;
        };
        checklist?: {
            label: string;
            completed: boolean;
        }[];
        headers?: string[];
    };
    date?: string; // Optional context if needed
    description?: string;
}

export function LogPeek({
    isOpen,
    onClose,
    title,
    id,
    meta,
    description,
}: LogPeekProps) {
    // Logic: Map status to Live Pill configuration
    // 3 MONTH ARCHIVE RULE not needed here for display, passed status or calculated in parent is enough, 
    // BUT we want the pill in the modal too. 
    // Let's reuse the logic or accept a "statusConfig" prop?
    // For now, let's recalculate or just accept the raw meta and do the logic. 
    // The previous LogCard did the 90-day check inside render. I should probably copy that logic or move it to a helper.
    // For "Zero-Clutter", let's keep it simple here.

    const [copied, setCopied] = useState(false);

    const handleShare = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof window !== "undefined" && id) {
            const url = `${window.location.origin}/${id}`;
            navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // Replicating Status Logic locally or cleaner? 
    // ideally the "Status" is a property of the Log, not the Card.
    // But for now I'll just copy the visualization logic.

    // NOTE: The 90-day rule was in LogCard. I'll need `date` if I want to replicate it perfectly inside the modal for the "STATUS: ARCHIVED" text.
    // I added `date` to props.

    const normalizedStatus = meta?.status?.toLowerCase();

    // Status visual config
    let statusConfig: {
        color: "active" | "warning" | "accent" | "blue" | "default";
        label: string;
    } = { color: "blue", label: "UNKNOWN" }; // Default

    if (normalizedStatus === "focus") {
        statusConfig = { color: "active", label: "FOCUS" };
    } else if (normalizedStatus === "active") {
        statusConfig = { color: "accent", label: "ACTIVE" };
    } else if (normalizedStatus === "paused") {
        statusConfig = { color: "warning", label: "PAUSED" };
    } else if (normalizedStatus === "archived") {
        statusConfig = { color: "default", label: "ARCHIVED" };
    }
    // Note: The "old date" auto-archive logic is primarily for the PILL on the card. 
    // Inside the modal, we usually show the explicit status, but let's stick to the visual consistency if possible.
    // If the user liked the "Archived" pill on the card, they probably expect "STATUS: ARCHIVED" in the modal.
    // So let's handle the "ARCHIVED" override if passed/handled.
    // Actually, let's just use the `meta.status`.

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="max-w-2xl overflow-hidden border border-border"
        >
            <div>
                {/* 1. Custom Header */}
                <div className="pb-4 mb-4 relative">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-mono uppercase tracking-widest text-primary font-bold">
                            {title.toUpperCase()}
                        </h2>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                onClose();
                            }}
                            className="font-mono text-meta hover:text-primary h-auto px-2 py-1"
                        >
                            CLOSE
                        </Button>
                    </div>
                    <div className="absolute bottom-0 left-0 w-[calc(100%+3rem)] -mx-6 border-b border-border" />
                </div>

                {/* 2. Status Section */}
                <div className="mb-8">
                    <div className="flex justify-between items-end mb-2">
                        <div className="flex items-center gap-2">
                            <span className={cn(
                                "text-xs font-mono font-bold uppercase",
                                statusConfig.color === "active" ? "text-emerald-500" :
                                    statusConfig.color === "warning" ? "text-amber-500" :
                                        statusConfig.color === "accent" ? "text-blue-500" :
                                            "text-blue-500" // Fallback
                            )}>
                                STATUS: {statusConfig.label}
                            </span>
                        </div>
                        {meta?.progress && meta.progress.total > 0 && (
                            <span className="text-xs font-mono text-meta">{meta.progress.percentage}% COMPLETE</span>
                        )}
                    </div>
                    {meta?.progress && meta.progress.total > 0 && (
                        <div className="h-1.5 w-full bg-border/30 rounded-full overflow-hidden">
                            <div
                                className={cn(
                                    "h-full transition-all duration-500 ease-out",
                                    statusConfig.color === "active" ? "bg-emerald-500" :
                                        statusConfig.color === "warning" ? "bg-amber-500" :
                                            "bg-blue-500"
                                )}
                                style={{ width: `${meta.progress.percentage}%` }}
                            />
                        </div>
                    )}
                </div>

                {description && (
                    <div className="mb-6">
                        <p className="text-sm text-meta leading-relaxed">
                            {description}
                        </p>
                    </div>
                )}

                {/* 3. Timeline / Topics Section (Scrollable) */}
                <div className="mb-0 flex-1 min-h-0 overflow-hidden flex flex-col">
                    {meta?.checklist && meta.checklist.length > 0 ? (
                        <>
                            <div className="text-[10px] font-mono text-meta/60 uppercase tracking-widest mb-4 shrink-0">MILESTONE TIMELINE</div>
                            <div className="space-y-3 pl-1 overflow-y-auto max-h-[40vh] pr-2">
                                {meta.checklist.map((item, idx) => (
                                    <div key={idx} className="flex gap-3 text-sm font-mono">
                                        <span className={cn(
                                            "shrink-0",
                                            item.completed ? "text-emerald-500" : "text-meta/40"
                                        )}>
                                            [{item.completed ? "DONE" : "PENDING"}]
                                        </span>
                                        <span className={cn(
                                            "leading-relaxed",
                                            item.completed ? "text-primary" : "text-meta"
                                        )}>
                                            {item.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="text-[10px] font-mono text-meta/60 uppercase tracking-widest mb-4 shrink-0">TOPICS COVERED</div>
                            {meta?.headers && meta.headers.length > 0 ? (
                                <div className="space-y-2 pl-1 overflow-y-auto max-h-[40vh] pr-2">
                                    {meta.headers.map((header, idx) => (
                                        <div key={idx} className="flex gap-3 text-sm font-mono text-meta">
                                            <span className="text-meta/40 shrink-0">##</span>
                                            <span>{header}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-meta text-sm italic font-mono display-block py-4">No detailed milestones logged.</p>
                            )}
                        </>
                    )}
                </div>

                {/* 4. Action Footer */}
                <div className="pt-4 relative mt-4">
                    <div className="absolute top-0 left-0 w-[calc(100%+3rem)] -mx-6 border-t border-border" />
                    <div className="flex justify-end gap-3 items-center">
                        <Button
                            variant="ghost"
                            size="xs"
                            onClick={handleShare}
                            className={cn("text-meta hover:text-primary", copied && "text-emerald-500")}
                        >
                            {copied ? "COPIED!" : (
                                <>
                                    SHARE_ENTRY
                                    <Share2 className="w-3 h-3 ml-1" />
                                </>
                            )}
                        </Button>

                        <Button
                            variant="link"
                            size="xs"
                            href={`/${id || '#'}`}
                            className="text-blue-500 hover:text-blue-600"
                        >
                            VIEW_FULL_LOG
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
