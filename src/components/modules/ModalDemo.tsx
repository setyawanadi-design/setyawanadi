"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export function ModalDemo() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="p-6 border border-dashed border-border rounded-lg flex items-center justify-center bg-card/50">
            <Button onClick={() => setIsOpen(true)}>Open Demo Modal</Button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Design System Modal"
                className="max-w-md"
            >
                <div className="space-y-4">
                    <p className="text-meta">
                        This is a standard modal container used across the system.
                        It handles backdrop blur, scroll locking, and animations automatically.
                    </p>
                    <div className="flex justify-end">
                        <Button variant="ghost" onClick={() => setIsOpen(false)}>
                            Close Interaction
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
