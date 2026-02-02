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
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);

            // Mobile: Intercept back button to close modal
            // We push a state so that "Back" pops this state instead of navigating away
            const handlePopState = () => {
                // If popstate fires, it means the user pressed Back.
                // We should close the modal.
                // WE DO NOT call history.back() here because the browser already did it.
                onClose();
            };

            // Push the fake state
            window.history.pushState({ modalOpen: true }, "", window.location.href);
            window.addEventListener("popstate", handlePopState);

            // Calculate scrollbar width
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            document.body.style.overflow = "hidden";

            return () => {
                window.removeEventListener("popstate", handlePopState);

                // If the modal is closing, we need to clean up our history state
                // UNLESS the close was triggered by the back button itself (popstate).
                // If we are here because isOpen became false (UI Close), we must pop.
                // If we are here because handlePopState called onClose, the pop already happened.

                // How to detect? 
                // We can't easily detect "why" we are unmounting in strict cleanup.
                // BUT: We can check duplicate logic or valid history state? No.

                // Better approach: 
                // 1. If we pressed back, the state is ALREADY popped.
                // 2. If we pressed close button, the state is STILL there.

                // We blindly try to go back if the state is top? No, risky.
                // Let's rely on a flag or perform a check.

                // SIMPLIFIED APPROACH:
                // Just checking if we are still in the same history entry is hard.
                // Let's use a ref to track if we *should* go back.
            };
        } else {
            const timer = setTimeout(() => {
                setIsVisible(false);
                document.body.style.paddingRight = "0px";
                document.body.style.overflow = "unset";
            }, 210); // Match duration-200 + buffer
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // We need a ref to track if the back button was used
    const backButtonUsed = React.useRef(false);

    useEffect(() => {
        if (isOpen) {
            backButtonUsed.current = false;
            // Push history logic
            window.history.pushState({ modal: true }, "", window.location.href);

            const onPopState = () => {
                backButtonUsed.current = true;
                onClose();
            };

            window.addEventListener('popstate', onPopState);

            return () => {
                window.removeEventListener('popstate', onPopState);
                // If we didn't use the back button to close (i.e. clicked X),
                // we must manually pop the history state we pushed.
                if (!backButtonUsed.current) {
                    window.history.back();
                }
            };
        }
    }, [isOpen]); // This separate effect handles ONLY history to avoid race conditions with visual logic

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            document.body.style.overflow = "hidden";
        } else {
            const timer = setTimeout(() => {
                setIsVisible(false);
                document.body.style.paddingRight = "0px";
                document.body.style.overflow = "unset";
            }, 210);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Separate cleanup to handle unmount regardless of state
    useEffect(() => {
        return () => {
            document.body.style.paddingRight = "0px";
            document.body.style.overflow = "unset";
        }
    }, []);

    if (!mounted) return null;
    if (!isVisible) return null;

    // Use portal to render outside the DOM hierarchy
    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className={cn(
                    "absolute inset-0 bg-background/80 backdrop-blur-sm duration-200",
                    isOpen ? "animate-in fade-in" : "animate-out fade-out fill-mode-forwards"
                )}
                onClick={onClose}
            />

            {/* Content */}
            <Card
                className={cn(
                    "relative w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-lg duration-200 p-0 border-border",
                    isOpen ? "animate-in fade-in zoom-in-95" : "animate-out fade-out zoom-out-95 fill-mode-forwards",
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

                {/* Body - Removed default p-6 to allow full bleed layouts. Children must handle padding. */}
                {children}
            </Card>
        </div>,
        document.body
    );
}
