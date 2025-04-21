
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  color?: "default" | "success" | "warning" | "danger" | "info";
}

export function StatusCard({ 
  title, 
  value, 
  description, 
  icon, 
  className,
  color = "default" 
}: StatusCardProps) {
  
  const colorStyles = {
    default: "border-dome-purple/20 bg-dome-dark",
    success: "border-dome-green/20 bg-dome-green/10",
    warning: "border-dome-yellow/20 bg-dome-yellow/10",
    danger: "border-dome-red/20 bg-dome-red/10",
    info: "border-dome-blue/20 bg-dome-blue/10",
  };
  
  const titleColors = {
    default: "text-white",
    success: "text-dome-green",
    warning: "text-dome-yellow",
    danger: "text-dome-red",
    info: "text-dome-blue",
  };
  
  return (
    <Card className={cn(colorStyles[color], "shadow-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className={cn("text-sm font-medium", titleColors[color])}>{title}</CardTitle>
        {icon && <div className={cn("h-4 w-4", titleColors[color])}>{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <CardDescription className="text-xs text-muted-foreground mt-1">
            {description}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
}
