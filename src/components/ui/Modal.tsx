"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    if (!mounted) return null;
    if (!isOpen) return null;

    // Use portal to render outside the DOM hierarchy
    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Content */}
            <Card
                className={cn(
                    "relative w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-lg animate-in fade-in zoom-in-95 duration-200 p-0 border-border",
                    className
                )}
                variant="default"
            >
                {/* Header (Optional) - If no title, caller handles header/close */}
                {title ? (
                    <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-card/80 backdrop-blur-md border-b border-border">
                        <h2 className="text-lg font-bold font-display">{title}</h2>
                        <button
                            onClick={onClose}
                            className="p-1 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5 text-meta" />
                        </button>
                    </div>
                ) : (
                    /* If no title, we still need a way to close depending on design, 
                       BUT for this specific design the close button is part of the custom header. 
                       So we can render nothing here and let children handle it, 
                       OR render an absolute close button. 
                       The design shows 'close' text in header. Let's assume children handle it if title is null.
                    */
                    null
                )}

                {/* Body */}
                <div className="p-6">
                    {children}
                </div>
            </Card>
        </div>,
        document.body
    );
}
