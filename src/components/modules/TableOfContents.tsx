
"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { ChevronRight } from "lucide-react";
import { TECH_DASH } from "@/lib/utils";

interface TOCItem {
    id: string;
    label: string;
}

const SECTIONS: TOCItem[] = [
    { id: "tokens", label: "01. Tokens" },
    { id: "elements", label: "02. Elements" },
    { id: "components", label: "03. Components" },
    { id: "modules", label: "04. Modules" },
];

export function TableOfContents() {
    const [activeSection, setActiveSection] = useState<string>("");

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

        SECTIONS.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100, // Offset for header + sticky padding
                behavior: "smooth",
            });
        }
    };

    return (
        <Card
            variant="glass"
            className="p-6 transition-all duration-300 hover:shadow-md hover:border-accent/50"
        >
            <div
                className="mb-4 pb-2"
                style={{ ...TECH_DASH, backgroundPosition: 'bottom' }}
            >
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    On This Page
                </h3>
            </div>
            <nav className="space-y-1">
                {SECTIONS.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full flex items-center justify-between group p-2 rounded-md transition-all text-sm font-mono ${activeSection === section.id
                            ? "bg-secondary text-primary font-medium translate-x-1"
                            : "text-meta hover:text-primary hover:bg-secondary/50 hover:translate-x-1"
                            }`}
                    >
                        <span>{section.label}</span>
                        {activeSection === section.id && (
                            <ChevronRight className="w-4 h-4 text-accent animate-in fade-in slide-in-from-left-1" />
                        )}
                    </button>
                ))}
            </nav>
        </Card>
    );
}
