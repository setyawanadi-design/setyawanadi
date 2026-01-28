import { cn } from "@/lib/utils";

interface BrutalistCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    checked?: boolean;
}

export function BrutalistCheckbox({ className, checked, disabled, ...props }: BrutalistCheckboxProps) {
    return (
        <span className={cn("inline-flex items-center align-text-top mr-3", className)}>
            {/* The Visual "Checkbox" */}
            <span className={cn(
                "font-mono text-xs font-bold tracking-wider select-none",
                checked ? "text-emerald-500" : "text-meta/40"
            )}>
                [{checked ? "DONE" : "PENDING"}]
            </span>

            {/* Hidden real input for accessibility/functionality if needed, though MDX usually just renders it readonly */}
            <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                disabled={disabled}
                readOnly
                {...props}
            />
        </span>
    );
}
