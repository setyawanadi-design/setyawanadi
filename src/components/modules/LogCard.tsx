"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LogPeek } from "./LogPeek";

interface LogCardProps {
    title: string;
    date: string;
    id?: string;
    category?: string;
    tags?: string[];
    description?: string;
    meta?: {
        loc?: string;
        status?: string;
        class?: string;
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
    imageSrc?: string;
    variant?: "featured" | "standard" | "compact";
    className?: string;
}

export function LogCard({
    title,
    date,
    id,
    category,
    tags,
    description,
    meta,
    imageSrc,
    variant = "standard",
    className,
}: LogCardProps) {
    // ... [Featured Variant Code Omitted for Brevity - Keeping distinct] ... 
    if (variant === "featured") {
        return (
            <Card className={cn("group relative p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start justify-between min-h-80 bg-card border border-border hover:border-accent transition-colors", className)}>
                <div className="flex-1 flex flex-col h-full z-10">
                    <div className="space-y-4 mb-4">
                        <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight group-hover:text-primary transition-colors">
                            {title}
                        </h2>
                        <div className="font-mono text-xs text-meta/60">
                            {date}
                        </div>
                    </div>

                    {description && (
                        <p className="text-lg text-meta leading-relaxed max-w-xl mb-8">
                            {description}
                        </p>
                    )}

                    <div className="mt-auto flex flex-wrap gap-2">
                        {tags?.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs border-dashed text-meta/60 group-hover:text-accent group-hover:border-accent transition-colors">
                                #{tag}
                            </Badge>
                        ))}
                    </div>
                </div>
                {/* Image rendering kept ... */}
                {imageSrc && (
                    <div className="w-full md:w-80 h-[200px] md:h-full shrink-0 relative rounded-sm border border-border/40 overflow-hidden bg-muted/20">
                        <div className="absolute inset-0 bg-linear-to-br from-transparent to-black/5 mix-blend-multiply" />
                    </div>
                )}
            </Card>
        );
    }

    // ... [Compact Variant can stay as is or be updated if needed] ...
    if (variant === "compact") {
        const compactContent = (
            <Card variant="interactive" className={cn("group flex flex-col p-4 gap-2 bg-card", className)}>
                <h4 className="font-bold text-sm leading-tight group-hover:text-accent transition-colors">
                    {title}
                </h4>
                <div className="flex items-center gap-2 font-mono text-micro text-meta/50">
                    <span>{date}</span>
                    {id && <span>//{id}</span>}
                </div>
                {description && (
                    <p className="text-xs text-meta truncate mt-1">
                        {description}
                    </p>
                )}
            </Card>
        );

        if (id) {
            return (
                <Link href={`/${id}`} className="block">
                    {compactContent}
                </Link>
            );
        }
        return compactContent;
    }

    // Logic: Map status to Live Pill configuration
    // 3 MONTH ARCHIVE RULE
    // Safety check for date, default to today if missing to avoid false archive
    const logDate = date ? new Date(date).getTime() : new Date().getTime();
    const ninetyDaysAgo = new Date().getTime() - (90 * 24 * 60 * 60 * 1000);
    const isOld = logDate < ninetyDaysAgo;

    const normalizedStatus = meta?.status?.toLowerCase();

    let statusConfig: {
        show: boolean;
        variant: "live" | "outline";
        color?: "active" | "warning" | "accent";
        label: string
    } | null = null;

    if (normalizedStatus === "focus") {
        statusConfig = { show: true, variant: "live", color: "active", label: "FOCUS" };
    } else if (normalizedStatus === "active") {
        statusConfig = { show: true, variant: "live", color: "accent", label: "ACTIVE" };
    } else if (normalizedStatus === "paused") {
        statusConfig = { show: true, variant: "live", color: "warning", label: "PAUSED" };
    } else if (normalizedStatus === "archived") {
        statusConfig = { show: true, variant: "outline", label: "ARCHIVED" };
    } else if (isOld && !normalizedStatus) {
        // Auto-archive if old and no specific status
        statusConfig = { show: true, variant: "outline", label: "ARCHIVED" };
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
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

    // VARIANT: STANDARD (Grid)
    const cardContent = (
        <>
            <Card
                variant="interactive"
                className={cn("group flex flex-col justify-between p-6 bg-card hover:border-accent cursor-pointer", className)}
                onClick={() => id && setIsModalOpen(true)}
            >
                <div className="flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="text-xl font-bold leading-snug group-hover:text-primary transition-colors inline">
                            {title.split(" ").slice(0, -1).join(" ")}
                            {/* Glue last word + arrow */}
                            &nbsp;
                            <span className="whitespace-nowrap inline-block">
                                {title.split(" ").slice(-1)}
                                <span className="inline-block align-middle ml-1">
                                    <ArrowUpRight className="w-4 h-4 text-border group-hover:text-accent transition-colors mb-1" />
                                </span>
                            </span>
                        </h3>
                        {/* Integrated Status Pill */}
                        {statusConfig?.show && (
                            <Badge variant={statusConfig.variant} statusColor={statusConfig.color}>
                                {statusConfig.label}
                            </Badge>
                        )}
                    </div>

                    <div className="font-mono text-xs text-meta/50 mb-4">
                        {date}
                    </div>
                    {description && (
                        <div className="mb-4">
                            <p className="text-base text-meta leading-relaxed line-clamp-2 min-h-13 mb-3">
                                {description}
                            </p>
                            {statusConfig?.show && meta?.progress && meta.progress.total > 0 && (
                                <div className="flex items-center gap-3">
                                    <Progress value={meta.progress.percentage} className="h-1.5 bg-neutral-100" />
                                    <span className="font-mono text-[10px] text-meta shrink-0">
                                        {meta.progress.percentage}%
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-0">
                        {tags.map((tag) => (
                            <Badge
                                key={tag}
                                variant="soft"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </Card>

            <LogPeek
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={title}
                id={id}
                tags={tags}
                category={category}
                meta={meta}
                date={date}
                description={description}
            />
        </>
    );

    return cardContent;
}
