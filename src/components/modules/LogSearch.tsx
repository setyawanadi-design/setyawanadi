
"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogSearchProps {
    className?: string;
}

const CATEGORIES = ["all", "active", "archived", "field_notes"];

export function LogSearch({ className }: LogSearchProps) {
    const [activeCategory, setActiveCategory] = useState("all");

    return (
        <Card
            className={cn(
                "flex items-center justify-between p-2 pl-4 pr-2 rounded-2xl border-border bg-card min-h-[3.5rem]",
                className
            )}
        >
            {/* Categories */}
            <div className="flex items-center gap-1 md:gap-4 overflow-x-auto no-scrollbar mask-gradient pr-4">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                            "font-mono text-[10px] md:text-xs font-medium uppercase tracking-wide transition-colors whitespace-nowrap",
                            activeCategory === cat
                                ? "text-accent"
                                : "text-meta hover:text-primary"
                        )}
                    >
                        [{cat}]
                    </button>
                ))}
            </div>

            {/* Divider + Search */}
            <div className="flex items-center gap-3 pl-4 border-l border-border/50">
                <Search className="w-3.5 h-3.5 text-meta shrink-0" />
                <input
                    type="text"
                    placeholder="SEARCH_LOGS..."
                    className="bg-transparent border-none outline-none font-mono text-[10px] md:text-xs text-primary placeholder:text-meta/40 w-24 md:w-32 uppercase tracking-wide"
                />
            </div>
        </Card>
    );
}
