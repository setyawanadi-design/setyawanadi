
import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "pill" | "outline" | "status" | "dot" | "default" | "live" | "soft";
    statusColor?: "active" | "inactive" | "warning" | "accent";
}

export function Badge({
    className,
    variant = "pill",
    statusColor = "active",
    children,
    ...props
}: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center justify-center px-2.5 py-0.5 text-xs font-mono font-medium uppercase tracking-wide transition-colors",

                // Pill Variant (Standard Grey)
                variant === "pill" && "rounded-full bg-meta/10 text-meta",

                // Soft Variant (New Standard Tag)
                variant === "soft" && "rounded-full bg-neutral-100 text-meta border border-border/50 font-sans normal-case px-2.5",

                // Outline Variant (Tech Stack)
                variant === "outline" && "rounded-full border border-border text-primary bg-transparent",

                // Dot Variant (System Status)
                variant === "dot" && "gap-2 text-meta bg-transparent px-0",

                // Default Variant (Solid Color)
                variant === "default" && "rounded-full bg-accent text-white border border-accent",

                // Live Variant (Pulsing Pill)
                variant === "live" && "rounded-full border gap-2 pl-2 pr-2.5 py-0.5",
                variant === "live" && statusColor === "active" && "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
                variant === "live" && statusColor === "inactive" && "bg-neutral-500/10 text-neutral-500 border-neutral-500/20",
                variant === "live" && statusColor === "warning" && "bg-amber-500/10 text-amber-600 border-amber-500/20",
                variant === "live" && statusColor === "accent" && "bg-blue-500/10 text-blue-600 border-blue-500/20",

                className
            )}
            {...props}
        >
            {variant === "dot" && (
                <span className={cn(
                    "h-2 w-2 rounded-full",
                    statusColor === "active" && "bg-green-500 animate-pulse",
                    statusColor === "inactive" && "bg-meta",
                    statusColor === "warning" && "bg-yellow-500",
                    statusColor === "accent" && "bg-accent",
                )} />
            )}

            {variant === "live" && (
                <span className="relative flex h-1.5 w-1.5">
                    <span className={cn(
                        "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                        statusColor === "active" && "bg-emerald-500",
                        statusColor === "inactive" && "bg-neutral-500",
                        statusColor === "warning" && "bg-amber-500",
                        statusColor === "accent" && "bg-blue-500",
                    )}></span>
                    <span className={cn(
                        "relative inline-flex rounded-full h-1.5 w-1.5",
                        statusColor === "active" && "bg-emerald-500",
                        statusColor === "inactive" && "bg-neutral-500",
                        statusColor === "warning" && "bg-amber-500",
                        statusColor === "accent" && "bg-blue-500",
                    )}></span>
                </span>
            )}
            {children}
        </span>
    );
}
