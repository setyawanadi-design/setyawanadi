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
    tags?: string[];
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
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 mix-blend-multiply" />
                    </div>
                )}
            </Card>
        );
    }

    // ... [Compact Variant can stay as is or be updated if needed] ...
    if (variant === "compact") {
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
                    <Link href={`/logs/${id}`} className="block">
                        {compactContent}
                    </Link>
                );
            }
            return compactContent;
        }
    }

    // VARIANT: STANDARD (Grid)
    const cardContent = (
        <Card variant="interactive" className={cn("group flex flex-col justify-between p-6 bg-card hover:border-accent", className)}>
            <div className="flex flex-col">
                <h3 className="text-xl font-bold leading-snug group-hover:text-primary transition-colors mb-1">
                    {title}
                </h3>
                <div className="font-mono text-xs text-meta/50 mb-4">
                    {date}
                </div>
                {description && (
                    <p className="text-base text-meta leading-relaxed line-clamp-2 min-h-[3.25rem]">
                        {description}
                    </p>
                )}
            </div>

            {tags && tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 pt-0">
                    {tags.map((tag) => (
                        <Badge
                            key={tag}
                            variant="outline"
                            className="bg-neutral-100 text-meta hover:bg-neutral-200 border-none font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 h-auto"
                        >
                            #{tag}
                        </Badge>
                    ))}
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
