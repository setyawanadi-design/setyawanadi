
import React from 'react';
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export function Checkbox({ className, checked, disabled, ...props }: CheckboxProps) {
    return (
        <div className={cn("inline-flex items-center gap-2 align-top my-1", className)}>
            <div className={cn(
                "relative flex items-center justify-center w-5 h-5 rounded-sm border transition-all duration-200",
                checked
                    ? "bg-primary border-primary text-background group-hover:bg-accent group-hover:border-accent"
                    : "bg-transparent border-meta/40 hover:border-primary",
                disabled && "opacity-80 cursor-default"
            )}>
                {checked && (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                )}
            </div>

            {/* The actual input is hidden but accessible */}
            <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                disabled={disabled}
                readOnly
                {...props}
            />
        </div>
    );
}
