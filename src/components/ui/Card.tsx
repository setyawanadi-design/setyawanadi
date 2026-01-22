
import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "glass" | "hero" | "flat" | "interactive";
}

export function Card({
    className,
    variant = "default",
    children,
    ...props
}: CardProps) {
    return (
        <div
            className={cn(
                "rounded-[var(--radius-card)] overflow-hidden transition-all duration-300",

                // Default Stance - Seamless, Border-driven
                variant === "default" && "bg-card border border-border",

                // Glass Stance (Frosted)
                variant === "glass" && "glass active:scale-[0.98]",

                // Hero Stance (Big, Clean)
                variant === "hero" && "bg-card p-8 border border-border",

                // Flat Stance (Internal grouping)
                variant === "flat" && "bg-transparent border-none p-0",

                // Interactive Stance (Hover effects)
                variant === "interactive" && "bg-card border border-border hover:border-accent hover:shadow-sm hover:-translate-y-0.5 cursor-pointer",

                // Base Padding (can be overridden)
                variant !== "flat" && variant !== "hero" && "p-6",

                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
