
import React from 'react';
import { Card } from "@/components/ui/Card";
import { ArrowRight } from "lucide-react";
import Link from 'next/link';
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
        <Link href={href} className={cn("block group", className)}>
            <Card className="bg-blue-50/50 hover:bg-blue-50 border-blue-100 hover:border-blue-200 transition-all duration-300 flex items-center justify-between p-6">
                <div>
                    <span className="font-mono text-micro uppercase tracking-wider text-accent font-bold mb-1 block">
                        {label}
                    </span>
                    <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">
                        {title}
                    </h3>
                </div>
                <ArrowRight className="w-5 h-5 text-accent transform transition-transform duration-300 group-hover:translate-x-1" />
            </Card>
        </Link>
    );
}
