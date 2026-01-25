import { cn } from "@/lib/utils";

interface DashedLineProps {
    className?: string;
    variant?: "receipt" | "tech";
}

export function DashedLine({ className, variant = "receipt" }: DashedLineProps) {
    // VARIANT: RECEIPT (Wider gap, darker)
    if (variant === "receipt") {
        return (
            <div
                className={cn("w-full h-[1px]", className)}
                style={{
                    backgroundImage: 'linear-gradient(to right, var(--color-meta) 50%, transparent 50%)',
                    backgroundSize: '8px 1px',
                    backgroundRepeat: 'repeat-x',
                    backgroundPosition: 'bottom',
                    opacity: 0.6
                }}
                role="separator"
            />
        );
    }

    // VARIANT: TECH (Tighter gap, used in headers)
    return (
        <div
            className={cn("w-full h-[1px]", className)}
            style={{
                backgroundImage: 'linear-gradient(to right, var(--color-border) 60%, transparent 40%)',
                backgroundSize: '6px 1px',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'bottom'
            }}
            role="separator"
        />
    );
}
