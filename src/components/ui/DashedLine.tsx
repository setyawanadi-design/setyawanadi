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
                    backgroundImage: `url("data:image/svg+xml,%3csvg width='12' height='1' viewBox='0 0 12 1' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='6' height='1' fill='%23a3a3a3'/%3e%3c/svg%3e")`,
                    backgroundRepeat: 'repeat-x',
                    backgroundPosition: 'bottom'
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
                backgroundImage: `url("data:image/svg+xml,%3csvg width='8' height='1' viewBox='0 0 8 1' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='4' height='1' fill='%23a3a3a3'/%3e%3c/svg%3e")`,
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'bottom'
            }}
            role="separator"
        />
    );
}
