
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

import Link from "next/link";
// ...

export function ContactCard({
    title = "Send me a message",
    label = "CONTACT",
    href = "mailto:setyawanadi@hotmail.com?subject=Hello, I found your contact from your site",
    className
}: ContactCardProps) {
    return (
        <Link href={href} className={cn("block group cursor-pointer active:scale-[0.98] transition-transform duration-100", className)}>
            <Card className="bg-accent border-accent text-white transition-all duration-300 flex items-center gap-2 p-4 cursor-pointer shadow-lg -translate-y-1 hover:shadow-none hover:translate-y-0 active:translate-y-0 active:shadow-none">
                <div className="flex-1">
                    <span className="font-mono text-micro uppercase tracking-wider text-white/80 font-bold mb-1 block">
                        {label}
                    </span>
                    <h3 className="text-lg font-medium text-white">
                        {title}
                    </h3>
                </div>
                <ArrowRight className="w-5 h-5 text-white transform transition-transform duration-300 group-hover:-translate-x-1" />
            </Card>
        </Link>
    );
}
