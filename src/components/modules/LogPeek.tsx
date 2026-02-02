"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Progress } from "@/components/ui/Progress";
import { cn } from "@/lib/utils";
import { Share2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface LogPeekProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    id?: string;
    tags?: string[]; // Added tags prop
    category?: string; // Added category prop
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
    tags, // Destructure tags
    category, // Added category
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
            className="max-w-2xl border border-border"
        >
            <div className="flex flex-col max-h-[85vh]">
                {/* 1. FIXED TOP SECTION (Header + Metadata) */}
                <div className="shrink-0 bg-card z-30 border-b border-dashed border-border/50">

                    {/* Header */}
                    <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-border mb-4">
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

                    {/* Status Section */}
                    <div className="px-6 mb-6">
                        <div className="flex justify-between items-end mb-2">
                            <div className="flex items-center gap-2">
                                <span className={cn(
                                    "text-xs font-mono font-bold uppercase",
                                    statusConfig.color === "active" ? "text-emerald-500" :
                                        statusConfig.color === "warning" ? "text-amber-500" :
                                            statusConfig.color === "accent" ? "text-blue-500" :
                                                "text-blue-500"
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

                    {/* Description */}
                    {description && (
                        <div className="px-6 mb-4">
                            <p className="text-sm text-meta leading-relaxed line-clamp-3">
                                {description}
                            </p>
                        </div>
                    )}

                    {/* Tags */}
                    {(category || (tags && tags.length > 0)) && (
                        <div className="flex flex-wrap gap-2 mb-6 items-center px-6">
                            {category && (
                                <Badge variant="default" className="text-xs px-2 py-0.5 h-auto rounded-full">
                                    {category}
                                </Badge>
                            )}
                            {tags?.map((tag) => (
                                <Badge key={tag} variant="soft" className="text-xs">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {/* Timeline Header (Sticky) */}
                    <div className="px-6 pb-2">
                        <div className="text-[10px] font-mono text-meta/60 uppercase tracking-widest">
                            {meta?.checklist && meta.checklist.length > 0 ? "MILESTONE TIMELINE" : "TOPICS COVERED"}
                        </div>
                    </div>
                </div>

                {/* 2. SCROLLABLE MIDDLE SECTION (Timeline Items Only) */}
                <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar bg-neutral-50/50">
                    <div className="px-6 py-4 space-y-3">
                        {meta?.checklist && meta.checklist.length > 0 ? (
                            meta.checklist.map((item, idx) => (
                                <div key={idx} className="flex gap-3 text-sm font-mono">
                                    <span className={cn(
                                        "shrink-0 text-[10px] pt-0.5 uppercase whitespace-pre",
                                        item.completed ? "text-emerald-500" : "text-meta/40"
                                    )}>
                                        {item.completed ? `[DONE]\u00A0\u00A0\u00A0\u00A0-` : `[PENDING]\u00A0-`}
                                    </span>
                                    <span className={cn(
                                        "leading-relaxed",
                                        item.completed ? "text-primary" : "text-meta"
                                    )}>
                                        {item.label.split(/(\*\*.*?\*\*)/).map((part, i) =>
                                            part.startsWith("**") && part.endsWith("**") ? (
                                                <strong key={i} className="font-bold text-primary">
                                                    {part.slice(2, -2)}
                                                </strong>
                                            ) : (
                                                part
                                            )
                                        )}
                                    </span>
                                </div>
                            ))
                        ) : meta?.headers && meta.headers.length > 0 ? (
                            meta.headers.map((header, idx) => (
                                <div key={idx} className="flex gap-3 text-sm font-mono text-meta">
                                    <span className="text-meta/40 shrink-0">##</span>
                                    <span>{header}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-meta text-sm italic font-mono">No detailed milestones logged.</p>
                        )}
                    </div>
                </div>

                {/* 3. FIXED BOTTOM SECTION (Footer) */}
                <div className="shrink-0 px-6 py-4 bg-card border-t border-border z-20 flex justify-end gap-3 items-center">
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
        </Modal>
    );
}