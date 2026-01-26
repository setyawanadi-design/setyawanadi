
import React from 'react';
import { Card } from "@/components/ui/Card";
import { ArrowRight } from "lucide-react";

import { cn } from '@/lib/utils';

interface ContactCardProps {
    title?: string;
    label?: string;
    href?: string;
    className?: string;
}

export function ContactCard({
    title = "Start a collaboration",
    label = "CONTACT",
    href = "/contact",
    className
}: ContactCardProps) {
    return (
        <div className={cn("block group shadow-none cursor-pointer", className)}>
            <Card className="bg-accent border-accent text-white hover:bg-[#006FDE] transition-all duration-300 flex items-center justify-between p-4 shadow-none cursor-pointer">
                <div>
                    <span className="font-mono text-micro uppercase tracking-wider text-white/80 font-bold mb-1 block">
                        {label}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                        {title}
                    </h3>
                </div>
                <ArrowRight className="w-5 h-5 text-white transform transition-transform duration-300 group-hover:translate-x-1" />
            </Card>
        </div>
    );
}
