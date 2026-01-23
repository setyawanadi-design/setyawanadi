
import React from 'react';
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface HeroModuleProps {
    title?: string;
    subtitle?: string;
    badgeText?: string;
    ctaText?: string;
    ctaLink?: string;
}

export function HeroModule({
    title = "Hello. I'm Card.",
    subtitle = "I am the fundamental building block. I come in many shapes, but I am always the same component.",
    badgeText = "Master Atom",
    ctaText = "Explore Documentation",
    ctaLink = "#"
}: HeroModuleProps) {
    return (
        <Card variant="hero" className="col-span-full">
            <div className="flex justify-between items-start">
                <div>
                    <Badge variant="pill" className="mb-4">{badgeText}</Badge>
                    <h2 className="text-4xl font-bold mb-4">{title}</h2>
                    <p className="text-xl text-meta max-w-lg mb-6">
                        {subtitle}
                    </p>
                    <Button variant="link" href={ctaLink}>{ctaText}</Button>
                </div>
                {/* Simulated Image Placeholder */}
                {/* Decorative Visual */}
                <div className="relative w-48 h-48 hidden md:block">
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-2xl" />
                    <div className="absolute inset-4 border border-accent/20 rounded-full" />
                    <div className="absolute inset-8 border border-dashed border-accent/40 rounded-full animate-[spin_10s_linear_infinite]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 bg-accent/80 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                    </div>
                </div>
            </div>
        </Card>
    );
}
