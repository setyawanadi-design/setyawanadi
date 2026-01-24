import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface FocusCardProps {
  title?: string;
  status?: "Active" | "Paused" | "Completed";
  description?: string;
  className?: string;
}

export function FocusCard({
  title = "Current Focus",
  status = "Active",
  description,
  className,
}: FocusCardProps) {
  return (
    <Card className={cn("flex flex-col gap-4 min-h-[180px]", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          [{title}]
        </h3>
        <div className={cn(
            "flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium border",
            status === "Active" && "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
             status === "Paused" && "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
             status === "Completed" && "bg-blue-500/10 text-blue-600 border-blue-500/20",
        )}>
          {status === "Active" && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          )}
           {status === "Paused" && (
             <span className="h-2 w-2 rounded-full bg-yellow-500" />
           )}
          {status}
        </div>
      </div>
      
      {description && (
        <div className="flex-1 flex items-center">
           <p className="text-2xl font-medium leading-tight tracking-tight">{description}</p>
        </div>
      )}

      {status === "Active" && (
          <div className="mt-auto pt-4 flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>SYNCING...</span>
          </div>
      )}
    </Card>
  );
}
