import { Card } from "@/components/ui/Card";
import { BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatItem {
    label: string;
    value: string;
    isGood?: boolean;
}

export function LogStats({ stats }: { stats: StatItem[] }) {
    return (
        <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h4 className="font-mono text-micro text-primary font-bold uppercase tracking-wider">Archive Stats</h4>
                <BarChart3 className="w-3 h-3 text-meta/40" />
            </div>
            <div className="space-y-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="flex justify-between items-baseline">
                        <span className="font-mono text-micro text-meta/60 uppercase tracking-widest">{stat.label}</span>
                        <span className={cn(
                            "font-mono text-xs font-medium",
                            stat.isGood ? "text-emerald-500" : "text-primary"
                        )}>
                            {stat.value}
                        </span>
                    </div>
                ))}
            </div>
        </Card>
    );
}
