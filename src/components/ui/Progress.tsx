
import React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number; // 0 to 100
}

export function Progress({ className, value, ...props }: ProgressProps) {
    return (
        <div
            className={cn("relative h-2 w-full overflow-hidden rounded-full bg-border/30", className)}
            {...props}
        >
            <div
                className="h-full w-full flex-1 bg-accent transition-all duration-500 ease-in-out"
                style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
            />
        </div>
    );
}
