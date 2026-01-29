
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "solid" | "ghost" | "link";
    size?: "default" | "sm" | "xs";
    href?: string; // Optional: if provided, renders as Link
}

export function Button({
    className,
    variant = "solid",
    size = "default",
    href,
    children,
    ...props
}: ButtonProps) {

    const baseStyles = cn(
        "inline-flex items-center justify-center gap-2 transition-all duration-300 font-medium focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer",

        // SIZES
        size === "default" && "text-sm px-5 py-3",
        size === "sm" && "text-xs px-3 py-2",
        size === "xs" && "text-[10px] uppercase tracking-wider px-2 py-1",

        // SOLID: Blue background, white text
        variant === "solid" && "bg-accent text-white hover:bg-accent/90 shadow-sm rounded-full",

        // GHOST: Transparent, dark text
        variant === "ghost" && "bg-transparent text-primary hover:bg-meta/10 rounded-md",

        // LINK: Blue text, underlined on hover, typically with arrow
        variant === "link" && "bg-transparent text-accent hover:underline px-0 py-0"
    );

    const content = (
        <>
            {children}
            {variant === "link" && <ArrowRightIcon className="h-4 w-4" />}
            {variant === "solid" && <ArrowRightIcon className="h-4 w-4 opacity-70" />}
        </>
    );

    if (href) {
        return (
            <Link href={href} className={cn(baseStyles, className)}>
                {content}
            </Link>
        );
    }

    return (
        <button className={cn(baseStyles, className)} {...props}>
            {content}
        </button>
    );
}
