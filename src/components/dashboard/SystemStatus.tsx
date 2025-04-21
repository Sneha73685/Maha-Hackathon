
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Wifi, Zap, Server, Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface SystemIndicatorProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

function SystemIndicator({ label, value, icon }: SystemIndicatorProps) {
  const getStatusColor = (value: number) => {
    if (value >= 90) return "text-dome-green";
    if (value >= 70) return "text-dome-yellow";
    return "text-dome-red";
  };

  const getProgressColor = (value: number) => {
    if (value >= 90) return "bg-dome-green";
    if (value >= 70) return "bg-dome-yellow";
    return "bg-dome-red";
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 text-muted-foreground">{icon}</div>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
        <span className={`text-xs font-medium ${getStatusColor(value)}`}>{value}%</span>
      </div>
      <Progress value={value} className={`h-1 ${getProgressColor(value)}`} />
    </div>
  );
}

export function SystemStatus() {
  return (
    <Card className="border-dome-purple/20 bg-dome-dark shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <Activity className="mr-2 h-4 w-4 text-dome-purple" />
          System Status
        </CardTitle>
        <CardDescription>Real-time performance metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SystemIndicator 
          label="Detection Systems" 
          value={98} 
          icon={<Wifi />} 
        />
        <SystemIndicator 
          label="AI Processing" 
          value={87} 
          icon={<Server />} 
        />
        <SystemIndicator 
          label="Defense Modules" 
          value={94} 
          icon={<Shield />} 
        />
        <SystemIndicator 
          label="Power Systems" 
          value={100} 
          icon={<Zap />} 
        />
      </CardContent>
    </Card>
  );
}
