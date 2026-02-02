"use client";

import React, { useEffect, useState, useRef } from "react";
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

    // We don't strictly need a ref for the nav anymore since we look up the parent,
    // but good to keep it clean.
    const sections = items || (autoScan ? scannedItems : DESIGN_SECTIONS);

    // 1. Scan and Re-Scan handling (Async Content Support)
    useEffect(() => {
        if (!autoScan) return;

        const scanHeadings = () => {
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
        };

        // Initial Scan
        scanHeadings();

        // Watch for content changes (MDX hydration)
        const observer = new MutationObserver(scanHeadings);
        const article = document.querySelector('article') || document.body;
        observer.observe(article, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, [autoScan]);

    // 2. ScrollSpy (Scroll Position Tracking)
    useEffect(() => {
        if (sections.length === 0) return;

        const handleScroll = () => {
            // Logic 1: Bottom of Page Override
            // Use document.documentElement.scrollHeight for reliable detection across browsers/layouts.
            // Math.round handles sub-pixel scrolling differences.
            const isBottom = window.innerHeight + Math.round(window.scrollY) >= document.documentElement.scrollHeight - 50;
            if (isBottom) {
                setActiveSection(sections[sections.length - 1].id);
                return;
            }

            // Logic 2: "Reading Line" Trigger (Top 30%)
            const triggerPoint = window.scrollY + (window.innerHeight * 0.3);

            let currentActive = "";

            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element && element.offsetTop <= triggerPoint) {
                    currentActive = section.id;
                }
            }

            if (currentActive) {
                setActiveSection(currentActive);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial Check

        return () => window.removeEventListener("scroll", handleScroll);
    }, [sections]);

    // 3. Auto-Scroll Sidebar (Center Stage Logic)
    useEffect(() => {
        if (!activeSection) return;

        const activeBtn = document.getElementById(`toc-btn-${activeSection}`);
        if (activeBtn) {
            // Find the parent scrollable sidebar (The one defined in Sidebar.tsx)
            // It has 'overflow-y-auto' class.
            const sidebarNav = activeBtn.closest('.overflow-y-auto');

            if (sidebarNav) {
                const btnRect = activeBtn.getBoundingClientRect();
                const containerRect = sidebarNav.getBoundingClientRect();

                // Calculate where the button is relative to the container's visual top
                const relativeTop = btnRect.top - containerRect.top;
                const containerHeight = containerRect.height;
                const btnHeight = btnRect.height;

                // Center Stage Logic:
                // Target position is middle of the container
                const targetRelativeTop = (containerHeight / 2) - (btnHeight / 2);

                // Calculate difference
                const diff = relativeTop - targetRelativeTop;

                // Only scroll if the difference is noticeable (> 10px) to prevent micro-jitters
                if (Math.abs(diff) > 20) {
                    const currentScroll = sidebarNav.scrollTop;
                    sidebarNav.scrollTo({
                        top: currentScroll + diff,
                        behavior: 'auto' // Instant adjust
                    });
                }
            }
        }
    }, [activeSection]);

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
            {/* Nav without internal scrollbar, relying on parent Sidebar */}
            <nav className="space-y-1">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        id={`toc-btn-${section.id}`}
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
