import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface LogCardProps {
    title: string;
    date: string;
    id?: string;
    category?: string;
    description?: string;
    meta?: {
        loc?: string;
        status?: string;
        class?: string;
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
    description,
    meta,
    imageSrc,
    variant = "standard",
    className,
}: LogCardProps) {
    // VARIANT: FEATURED (Full width, Image Right)
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

                    <div className="mt-auto flex flex-wrap gap-4 font-mono text-micro uppercase text-meta/40 tracking-wider">
                        {meta?.loc && <span>LOC: {meta.loc}</span>}
                        {meta?.status && <span>STATUS: {meta.status}</span>}
                        {meta?.class && <span>CLASS: {meta.class}</span>}
                    </div>
                </div>

                {imageSrc && (
                    <div className="w-full md:w-80 h-[200px] md:h-full shrink-0 relative rounded-sm border border-border/40 overflow-hidden bg-muted/20">
                        {/* Placeholder for Image - In real app use Next/Image */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 mix-blend-multiply" />
                    </div>
                )}
            </Card>
        );
    }

    // VARIANT: COMPACT (Sidebar / Pinned)
    if (variant === "compact") {
        return (
            <Card variant="interactive" className={cn("group flex flex-col p-4 gap-2 bg-card", className)}>
                <h4 className="font-bold text-sm leading-tight group-hover:text-accent transition-colors">
                    {title}
                </h4>
                <div className="flex items-center gap-2 font-mono text-micro text-meta/50">
                    <span>{date}</span>
                    {id && (
                        <>
                            <span>//</span>
                            <span>{id}</span>
                        </>
                    )}
                </div>
                {description && (
                    <p className="text-xs text-meta truncate mt-1">
                        {description}
                    </p>
                )}
            </Card>
        );
    }

    // VARIANT: STANDARD (Grid)
    const cardContent = (
        <Card variant="interactive" className={cn("group flex flex-col justify-between p-6 min-h-60 bg-card hover:border-accent", className)}>
            <div className="space-y-4">
                <h3 className="text-xl font-bold leading-snug group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <div className="font-mono text-xs text-meta/50 mb-4">
                    {date}
                </div>
                {description && (
                    <p className="text-base text-meta leading-relaxed">
                        {description}
                    </p>
                )}
            </div>

            {meta && (
                <div className="mt-8 flex flex-wrap gap-3 font-mono text-micro uppercase text-meta/40 tracking-wider pt-4 border-t border-dashed border-border/40">
                    {meta.loc && <span>LOC: {meta.loc}</span>}
                    {meta.status && <span>STATUS: {meta.status}</span>}
                </div>
            )}
        </Card>
    );

    if (id) {
        return (
            <Link href={`/logs/${id}`} className="block h-full">
                {cardContent}
            </Link>
        );
    }

    return cardContent;
}
