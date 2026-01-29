"use client";

import React, { useState } from 'react';

interface InteractiveHoverTitleProps {
    title: string;
    className?: string;
}

const colors = [
    "#3B82F6", // Accent (Blue)
    "#10B981", // Active (Emerald)
    "#F59E0B", // Warning (Amber)
    "#EF4444", // Error (Red)
];

const HoverWord = ({ word }: { word: string }) => {
    const [color, setColor] = useState<string | null>(null);

    const handleMouseEnter = () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setColor(randomColor);
    };

    const handleMouseLeave = () => {
        setColor(null);
    };

    return (
        <span
            className="inline-block transition-colors duration-200 cursor-default"
            style={{ color: color || 'inherit' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {word}&nbsp;
        </span>
    );
};

export function InteractiveHoverTitle({ title, className }: InteractiveHoverTitleProps) {
    const words = title.split(' ');

    return (
        <h1 className={className}>
            {words.map((word, index) => (
                <HoverWord key={index} word={word} />
            ))}
        </h1>
    );
}
