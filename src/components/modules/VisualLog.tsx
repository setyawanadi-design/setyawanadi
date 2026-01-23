
import React from 'react';
import { Card } from "@/components/ui/Card";
import { Eye } from "lucide-react";

interface VisualLogProps {
    id: string;
    year: string;
    imageSrc?: string;
    className?: string;
}

export function VisualLog({ id, year, imageSrc, className }: VisualLogProps) {
    return (
        <Card className={`relative overflow-hidden group min-h-[200px] border-none ${className}`} variant="flat">
            {/* Background Image / Placeholder */}
            {imageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={imageSrc}
                    alt={`Log ${id}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            ) : (
                <div className="absolute inset-0 bg-neutral-900">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />
                    <div className="absolute top-0 right-0 p-4">
                        <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
                        </div>
                    </div>
                </div>
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

            {/* Content Layer */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex items-end justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                            <span className="font-mono text-[10px] uppercase text-white/70">Visual_Log</span>
                        </div>
                        <h3 className="font-mono text-lg text-white font-bold">
                            ID: {id} <span className="text-white/40">//</span> {year}
                        </h3>
                    </div>

                    {/* Action Button */}
                    <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-all duration-300 group-hover:scale-110">
                        <Eye className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </Card>
    );
}
