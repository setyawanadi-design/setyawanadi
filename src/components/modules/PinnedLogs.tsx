import { LogCard } from "./LogCard";
import { ShieldAlert } from "lucide-react";

export function PinnedLogs() {
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center px-1 mb-2">
                <h4 className="font-mono text-micro text-primary font-bold uppercase tracking-wider">Pinned Logs</h4>
                <ShieldAlert className="w-3 h-3 text-accent" />
            </div>

            <LogCard
                variant="compact"
                title="Sumatra Mesh"
                date="2026.08.14"
                id="ID-442"
                description="Regional network stabilization in Riau sector."
            />
            <LogCard
                variant="compact"
                title="Schema V2"
                date="2026.07.22"
                id="ID-391"
                description="Core data structure migration for multi-tenant."
            />
            <LogCard
                variant="compact"
                title="Thermal Audit"
                date="2026.06.30"
                id="ID-215"
                description="Peak load hardware review and cooling systems."
            />
        </div>
    );
}
