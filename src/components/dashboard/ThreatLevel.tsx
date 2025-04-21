
import { Shield, AlertTriangle, AlertOctagon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThreatLevelProps {
  level: "low" | "moderate" | "high" | "critical";
  className?: string;
}

export function ThreatLevel({ level, className }: ThreatLevelProps) {
  const getLevelDetails = () => {
    switch(level) {
      case "low":
        return { 
          icon: Shield, 
          bg: "bg-dome-green", 
          text: "text-dome-green",
          label: "Low Threat",
          description: "No unauthorized drones detected in protected airspace"
        };
      case "moderate":
        return { 
          icon: Shield, 
          bg: "bg-dome-yellow", 
          text: "text-dome-yellow",
          label: "Moderate Threat",
          description: "Potential unauthorized drone activity detected"
        };
      case "high":
        return { 
          icon: AlertTriangle, 
          bg: "bg-dome-yellow", 
          text: "text-dome-yellow",
          label: "High Threat",
          description: "Confirmed unauthorized drone in protected airspace"
        };
      case "critical":
        return { 
          icon: AlertOctagon, 
          bg: "bg-dome-red", 
          text: "text-dome-red",
          label: "Critical Threat",
          description: "Multiple unauthorized drones detected - immediate action required"
        };
      default:
        return { 
          icon: Shield, 
          bg: "bg-dome-green", 
          text: "text-dome-green",
          label: "System Normal",
          description: "Defense system operational"
        };
    }
  };

  const details = getLevelDetails();
  const Icon = details.icon;

  return (
    <div className={cn("flex flex-col items-center p-4 rounded-lg bg-dome-darker border border-dome-purple/20", className)}>
      <div className={cn("p-4 rounded-full", details.bg + "/10", "mb-3")}>
        <Icon className={cn("h-10 w-10", details.text)} />
      </div>
      <h3 className={cn("text-xl font-bold mb-1", details.text)}>{details.label}</h3>
      <p className="text-muted-foreground text-center text-sm">{details.description}</p>
      
      <div className="w-full mt-4 bg-dome-dark/50 rounded-full h-2.5">
        <div 
          className={cn(
            "h-2.5 rounded-full",
            level === "low" ? "w-1/4 " + details.bg : "",
            level === "moderate" ? "w-2/4 " + details.bg : "",
            level === "high" ? "w-3/4 " + details.bg : "",
            level === "critical" ? "w-full " + details.bg : ""
          )}
        ></div>
      </div>
    </div>
  );
}
