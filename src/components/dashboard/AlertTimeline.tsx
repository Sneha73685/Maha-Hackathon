
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Bell, AlertCircle, Cpu, Radio, Shield, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineEvent {
  id: number;
  time: string;
  title: string;
  description: string;
  severity: "info" | "warning" | "critical";
  type: "detection" | "signal" | "system" | "threat";
}

const getEventIcon = (type: TimelineEvent["type"], severity: TimelineEvent["severity"]) => {
  switch(type) {
    case "detection":
      return <Cpu className="h-4 w-4" />;
    case "signal":
      return <Radio className="h-4 w-4" />;
    case "system":
      return <Shield className="h-4 w-4" />;
    case "threat":
      return severity === "critical" ? <Bell className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

const events: TimelineEvent[] = [
  {
    id: 1,
    time: "14:32:01",
    title: "Drone Detected",
    description: "Unauthorized drone detected in northeast quadrant",
    severity: "warning",
    type: "detection"
  },
  {
    id: 2,
    time: "14:31:45",
    title: "RF Signal Analysis",
    description: "Unknown signal pattern identified on 2.4GHz band",
    severity: "info",
    type: "signal"
  },
  {
    id: 3,
    time: "14:30:12",
    title: "System Alert",
    description: "Countermeasure system activated against threat ID #XJ42",
    severity: "info",
    type: "system"
  },
  {
    id: 4,
    time: "14:28:55",
    title: "Critical Threat",
    description: "Multiple drones approaching restricted area",
    severity: "critical",
    type: "threat"
  },
  {
    id: 5,
    time: "14:26:33",
    title: "Signal Jamming",
    description: "Successfully jammed unauthorized drone control signals",
    severity: "info",
    type: "system"
  },
  {
    id: 6,
    time: "14:25:10",
    title: "Drone Neutralized",
    description: "Unauthorized drone XJ42 successfully neutralized",
    severity: "info",
    type: "detection"
  },
  {
    id: 7,
    time: "14:22:48",
    title: "AI Analysis Complete",
    description: "Drone classified as unauthorized: 99.2% confidence",
    severity: "info",
    type: "system"
  }
];

export function AlertTimeline() {
  const getSeverityColor = (severity: TimelineEvent["severity"]) => {
    switch(severity) {
      case "info":
        return "bg-dome-blue text-dome-blue border-dome-blue/20";
      case "warning":
        return "bg-dome-yellow text-dome-yellow border-dome-yellow/20";
      case "critical":
        return "bg-dome-red text-dome-red border-dome-red/20";
      default:
        return "bg-muted text-muted-foreground border-muted/20";
    }
  };

  return (
    <Card className="border-dome-purple/20 bg-dome-dark shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <Bell className="mr-2 h-4 w-4 text-dome-purple" />
          Alert Timeline
        </CardTitle>
        <CardDescription>Real-time system events</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[280px] pr-4">
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="relative pl-6">
                <div className={`absolute left-0 top-1 h-4 w-4 rounded-full ${getSeverityColor(event.severity)}/10 flex items-center justify-center`}>
                  <div className={`h-2 w-2 rounded-full ${getSeverityColor(event.severity).split(' ')[0]}`}></div>
                </div>
                <div className="border-l border-muted/20 pl-4 pb-4">
                  <div className="flex items-center text-sm">
                    <span className="text-muted-foreground text-xs">{event.time}</span>
                    <div className={`ml-2 rounded-full px-2 py-0.5 text-xs ${getSeverityColor(event.severity)}/10 flex items-center`}>
                      {getEventIcon(event.type, event.severity)}
                      <span className="ml-1">{event.type}</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-medium mt-1">{event.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
