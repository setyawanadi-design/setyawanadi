import { getLogPosts } from "@/lib/mdx";
import { LogCard } from "@/components/modules/LogCard";
import { LogSearch } from "@/components/modules/LogSearch";


export const metadata = {
    title: "Logs | setyawanadi",
    description: "System logs, field reports, and architectural reflections.",
};

export default function LogsPage() {
    const logs = getLogPosts();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">


            {/* Search Module (Full Width in Main Col) */}
            <div className="w-full">
                <LogSearch className="w-full" />
            </div>

            {/* Logs Feed Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {logs.length > 0 ? (
                    logs.map((log) => (
                        <LogCard
                            key={log.slug}
                            variant="standard"
                            title={log.metadata.title}
                            date={log.metadata.date}
                            category={log.metadata.tags?.[0]}
                            description={log.metadata.description}
                            meta={{
                                status: log.metadata.status,
                                loc: log.metadata.category || "SYSTEM"
                            }}
                            id={log.slug}
                        />
                    ))
                ) : (
                    // Empty State
                    <div className="col-span-full py-12 text-center border border-dashed border-border rounded-lg bg-card/50">
                        <p className="font-mono text-xs text-meta uppercase tracking-widest mb-2">System Empty</p>
                        <p className="text-meta">No logs found in local archive.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
