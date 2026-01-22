
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "solid" | "ghost" | "link";
    href?: string; // Optional: if provided, renders as Link
}

export function Button({
    className,
    variant = "solid",
    href,
    children,
    ...props
}: ButtonProps) {

    const baseStyles = cn(
        "inline-flex items-center justify-center gap-2 transition-all duration-300 font-medium text-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none",

        // SOLID: Blue background, white text
        variant === "solid" && "bg-accent text-white px-5 py-3 rounded-full hover:bg-accent/90 shadow-sm",

        // GHOST: Transparent, dark text
        variant === "ghost" && "bg-transparent text-primary hover:bg-meta/10 px-4 py-2 rounded-md",

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
