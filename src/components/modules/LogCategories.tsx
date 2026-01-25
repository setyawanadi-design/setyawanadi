import { Card } from "@/components/ui/Card";
import { Grip } from "lucide-react";
import { cn } from "@/lib/utils";

import { DashedLine } from "@/components/ui/DashedLine";

interface CategoryItem {
    label: string;
    count: number;
    isActive?: boolean;
}

export function LogCategories({ items }: { items: CategoryItem[] }) {
    return (
        <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h4 className="font-mono text-xs text-primary font-bold uppercase tracking-wider">Categories</h4>
                <Grip className="w-3 h-3 text-meta/40" />
            </div>
            <DashedLine className="mb-4" variant="receipt" />
            <ul className="space-y-3">
                {items.map((item) => (
                    <li key={item.label} className="group flex items-center justify-between cursor-pointer">
                        <span className={cn(
                            "font-mono text-[10px] uppercase transition-colors tracking-wide",
                            item.isActive ? "text-accent" : "text-meta group-hover:text-primary"
                        )}>
                            [{item.label}]
                        </span>
                        <span className={cn(
                            "font-mono text-[10px] transition-colors",
                            item.isActive ? "text-accent" : "text-meta/40 group-hover:text-meta"
                        )}>
                            {item.count}
                        </span>
                    </li>
                ))}
            </ul>
        </Card>
    );
}
