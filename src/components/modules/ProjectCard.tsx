"use client";

import React, { useState } from 'react';
import { Card } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";

import { Share2 } from "lucide-react";
import Link from 'next/link';

interface ProjectCardProps {
    title: string;
    slug?: string; // Add slug prop
    category?: string;
    description: string;
    progress?: number;
    status?: string;
    // New Focus props
    focusStatus?: string;
    focusDescription?: string;
    // Checklist Data
    checklist?: {
        label: string;
        completed: boolean;
    }[];
    className?: string;
}

export function ProjectCard({
    title,
    slug,
    description,
    progress,
    focusStatus,
    checklist = [],
    className
}: ProjectCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    // Logic: If status is 'active' or 'in_progress', show active pill.
    const normalizedFocusStatus = focusStatus?.toLowerCase();
    const showActivePill = normalizedFocusStatus === "active" || normalizedFocusStatus === "in_progress";

    const handleShare = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof window !== "undefined" && slug) {
            const url = `${window.location.origin}/logs/${slug}`;
            navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <>
            <Card
                className={className}
                variant="interactive"
                onClick={() => setIsModalOpen(true)}
            >
                <div className="flex justify-between items-start mb-6">
                    <div className="flex flex-col gap-1">
                        {/* Integrated Focus Status - Only show if active/in_progress or specifically requested */}
                        {showActivePill && (
                            <div className={cn(
                                "flex items-center gap-2 px-2 py-0.5 rounded-full text-[10px] font-medium border w-fit font-mono uppercase tracking-wider",
                                "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                            )}>
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                </span>
                                <span>Active</span>
                            </div>
                        )}
                    </div>
                    <span className="text-accent">↗</span>
                </div>

                <h2 className="text-xl font-bold mb-2">{title}</h2>

                {/* Main Desc - Optional */}
                {description && (
                    <p className="text-meta mb-4 leading-relaxed">
                        {description}
                    </p>
                )}

                {/* Progress Bar - Only if progress is active/true (>0) */}
                {progress !== undefined && progress > 0 && (
                    <div className="flex items-center gap-4 mt-auto">
                        <Progress value={progress} />
                        <span className="font-mono text-xs text-meta whitespace-nowrap">{progress}%</span>
                    </div>
                )}
            </Card>

            {/* Checklist Modal - System Report Style */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                // No title to disable default header
                className="max-w-2xl overflow-hidden border border-border"
            >
                <div>
                    {/* 1. Custom Header */}
                    <div className="pb-4 mb-4 relative">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-mono uppercase tracking-widest text-primary font-bold">
                                SYSTEM_REPORT // {title.toUpperCase()}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-sm font-mono hover:text-meta transition-colors cursor-pointer"
                            >
                                close
                            </button>
                        </div>
                        {/* Edge-to-Edge Line (Solid) */}
                        <div className="absolute bottom-0 left-0 w-[calc(100%+3rem)] -mx-6 border-b border-border" />
                    </div>

                    {/* 2. Status Section */}
                    <div className="mb-8">
                        <div className="flex justify-between items-end mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-mono font-bold text-blue-500 uppercase">STATUS: OPTIMIZING</span>
                            </div>
                            <span className="text-xs font-mono text-meta">{progress}% COMPLETE</span>
                        </div>
                        {progress !== undefined && (
                            <div className="h-1.5 w-full bg-border/30 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 transition-all duration-500 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        )}
                    </div>

                    {/* 3. Timeline Section */}
                    <div className="mb-8">
                        <div className="text-[10px] font-mono text-meta/60 uppercase tracking-widest mb-4">MILESTONE TIMELINE</div>
                        {checklist.length > 0 ? (
                            <div className="space-y-3 pl-1">
                                {checklist.map((item, idx) => (
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
                        ) : (
                            <p className="text-meta text-sm italic font-mono display-block py-4">No milestones logged.</p>
                        )}
                    </div>

                    {/* 4. Stats Footer Box - Removed as per request (extracted to SystemStats) */}

                    {/* 5. Action Footer */}
                    <div className="pt-4 relative">
                        {/* Edge-to-Edge Line (Solid) */}
                        <div className="absolute top-0 left-0 w-[calc(100%+3rem)] -mx-6 border-t border-border" />
                        <div className="flex justify-end gap-4 items-center">
                            <button
                                onClick={handleShare}
                                className="text-xs font-bold text-meta hover:text-primary flex items-center gap-1 uppercase tracking-wider transition-colors cursor-pointer"
                            >
                                {copied ? (
                                    <span className="text-emerald-500">COPIED!</span>
                                ) : (
                                    <>
                                        SHARE_ENTRY
                                        <Share2 className="w-3 h-3 mb-0.5" />
                                    </>
                                )}
                            </button>
                            <Link href={`/logs/${slug || '#'}`} className="text-xs font-bold text-blue-500 hover:text-blue-600 flex items-center gap-1 uppercase tracking-wider group">
                                VIEW_FULL_LOG
                                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                            </Link>
                        </div>
                    </div>

                </div>
            </Modal>
        </>
    );
}
