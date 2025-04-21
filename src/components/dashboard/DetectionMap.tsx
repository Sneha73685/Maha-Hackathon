
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Crosshair, Cpu } from "lucide-react";
import { useState, useEffect } from "react";

interface MarkerProps {
  x: number;
  y: number;
  type: "drone" | "facility";
  pulse?: boolean;
}

const Marker = ({ x, y, type, pulse = false }: MarkerProps) => {
  return (
    <div className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
      {type === "drone" ? (
        <div className="relative">
          <Cpu className="h-5 w-5 text-dome-red" />
          {pulse && (
            <span className="absolute inset-0 animate-ping rounded-full bg-dome-red/30"></span>
          )}
        </div>
      ) : (
        <div className="relative">
          <Crosshair className="h-5 w-5 text-dome-blue" />
          <span className="absolute inset-0 animate-pulse rounded-full bg-dome-blue/20"></span>
        </div>
      )}
    </div>
  );
};

export function DetectionMap() {
  const [drones, setDrones] = useState<MarkerProps[]>([
    { x: 25, y: 40, type: "drone", pulse: true },
    { x: 70, y: 60, type: "drone", pulse: false },
  ]);
  
  const facilities = [
    { x: 45, y: 45, type: "facility" as const },
    { x: 20, y: 30, type: "facility" as const },
    { x: 75, y: 65, type: "facility" as const },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDrones(prev => {
        return prev.map(drone => ({
          ...drone,
          x: drone.x + (Math.random() * 2 - 1),
          y: drone.y + (Math.random() * 2 - 1),
        }));
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="border-dome-purple/20 bg-dome-dark shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Aerial Surveillance</CardTitle>
        <CardDescription>Protected Zone Coverage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-[250px] w-full overflow-hidden rounded-md border border-muted/20 bg-dome-darker">
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
            {[...Array(36)].map((_, i) => (
              <div key={i} className="border border-muted/10"></div>
            ))}
          </div>
          
          {/* Map markers */}
          {facilities.map((facility, index) => (
            <Marker key={`facility-${index}`} {...facility} />
          ))}
          
          {drones.map((drone, index) => (
            <Marker key={`drone-${index}`} {...drone} />
          ))}
          
          {/* Protection circle */}
          <div 
            className="absolute rounded-full border border-dome-purple-light/30 bg-dome-purple/5"
            style={{ 
              width: '60%', 
              height: '60%', 
              left: '20%', 
              top: '20%' 
            }}
          >
            <div className="absolute inset-0 animate-pulse rounded-full border border-dome-purple-light/20"></div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <div className="flex items-center">
            <div className="mr-1.5 h-2 w-2 rounded-full bg-dome-red"></div>
            <span>Unauthorized Drone (2)</span>
          </div>
          <div className="flex items-center">
            <div className="mr-1.5 h-2 w-2 rounded-full bg-dome-blue"></div>
            <span>Protected Facility (3)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
