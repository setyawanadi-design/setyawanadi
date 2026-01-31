
"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Grip } from "lucide-react";
import { DashedLine } from "@/components/ui/DashedLine";

interface TOCItem {
    id: string;
    label: string;
    level?: number;
}

const DESIGN_SECTIONS: TOCItem[] = [
    { id: "tokens", label: "01. Tokens" },
    { id: "elements", label: "02. Elements" },
    { id: "components", label: "03. Components" },
    { id: "modules", label: "04. Modules" },
];

export function TableOfContents({ items, autoScan = false }: { items?: TOCItem[], autoScan?: boolean }) {
    const [activeSection, setActiveSection] = useState<string>("");
    const [scannedItems, setScannedItems] = useState<TOCItem[]>([]);

    const sections = items || (autoScan ? scannedItems : DESIGN_SECTIONS);

    useEffect(() => {
        if (autoScan) {
            // Scan for H2 and H3 elements within the main content
            const headings = Array.from(document.querySelectorAll('.prose h2, .prose h3'));
            const newItems = headings.map((heading, index) => {
                if (!heading.id) {
                    heading.id = `heading-${index}`;
                }
                return {
                    id: heading.id,
                    label: heading.textContent || "Untitled",
                    level: heading.tagName === 'H2' ? 2 : 3
                };
            });
            setScannedItems(newItems);
        }
    }, [autoScan]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-20% 0px -50% 0px",
            }
        );

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [sections]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100, // Offset for header + sticky padding
                behavior: "smooth",
            });
        }
    };

    if (sections.length === 0) return null;

    return (
        <Card className="p-6 group/card hover:border-accent transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
                <h4 className="font-mono text-xs text-primary font-bold uppercase tracking-wider group-hover/card:text-accent transition-colors">
                    Contents
                </h4>
                <Grip className="w-3 h-3 text-meta/40 group-hover/card:text-accent transition-colors" />
            </div>
            <DashedLine className="mb-4" variant="tech" />
            <nav className="space-y-1">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left font-mono text-[10px] uppercase tracking-wide transition-all p-2 rounded-md cursor-pointer group flex items-center ${activeSection === section.id
                            ? "bg-accent/10 text-accent font-medium"
                            : "text-meta hover:bg-accent/5 hover:text-primary"
                            } ${section.level === 3 ? "pl-5 text-[9px]" : ""}`}
                    >
                        {activeSection === section.id && (
                            <div className="w-1 h-1 bg-accent rounded-full mr-2" />
                        )}
                        <span className="truncate block">
                            {section.label}
                        </span>
                    </button>
                ))}
            </nav>
        </Card>
    );
}
