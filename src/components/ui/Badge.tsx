
import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "pill" | "outline" | "status" | "dot" | "default";
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

                // Outline Variant (Tech Stack)
                variant === "outline" && "rounded-full border border-border text-primary bg-transparent",

                // Dot Variant (System Status)
                variant === "dot" && "gap-2 text-meta bg-transparent px-0",

                // Default Variant (Solid Color)
                variant === "default" && "rounded-full bg-accent text-white border border-accent",

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
            {children}
        </span>
    );
}
