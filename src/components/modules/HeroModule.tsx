
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
                <div className="w-32 h-32 bg-gray-200 rounded-full animate-pulse hidden md:block" />
            </div>
        </Card>
    );
}
