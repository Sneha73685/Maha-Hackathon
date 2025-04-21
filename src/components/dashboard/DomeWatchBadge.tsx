
import { ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface DomeWatchBadgeProps {
  className?: string;
}

export function DomeWatchBadge({ className }: DomeWatchBadgeProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <div className="absolute -inset-0.5 rounded-full bg-dome-purple opacity-50 blur-sm"></div>
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-dome-darker border border-dome-purple/30">
          <ShieldAlert className="h-4 w-4 text-dome-purple-light" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-dome-purple-light">DomeWatch</span>
        <span className="text-[10px] text-muted-foreground">v2.4.0</span>
      </div>
      <div className="ml-1.5 h-1.5 w-1.5 rounded-full bg-dome-green animate-pulse"></div>
    </div>
  );
}
