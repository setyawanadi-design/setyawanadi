"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function SystemStatus() {
    const [isBooting, setIsBooting] = React.useState(true);

    React.useEffect(() => {
        // Simulate system check/boot sequence
        const timer = setTimeout(() => {
            setIsBooting(false);
        }, 2000); // 2 seconds spin

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={cn(
            "flex items-center justify-center overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
            isBooting ? "w-4 opacity-100 mr-3" : "w-0 opacity-0 mr-0"
        )}>
            <Loader2 className="w-3.5 h-3.5 animate-spin text-meta shrink-0" />
        </div>
    );
}
