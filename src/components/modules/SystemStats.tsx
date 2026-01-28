import { cn } from "@/lib/utils";

interface SystemStatsProps {
    className?: string;
    stats?: {
        label: string;
        value: string;
    }[];
}

export function SystemStats({ className, stats = [
    { label: "UPTIME", value: "99.8%" },
    { label: "NODES", value: "42/45" },
    { label: "LATENCY", value: "120ms" }
] }: SystemStatsProps) {
    return (
        <div className={cn("border border-border rounded-lg p-4 grid grid-cols-3 gap-4 bg-card/50", className)}>
            {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col gap-1 items-center justify-center border-r border-border last:border-0">
                    <span className="text-[10px] font-mono text-meta uppercase">{stat.label}</span>
                    <span className="text-xs font-mono font-bold">{stat.value}</span>
                </div>
            ))}
        </div>
    );
}
