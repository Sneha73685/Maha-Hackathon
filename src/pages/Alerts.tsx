
import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { AlertTriangle, Clock, Shield, MapPin, Info } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Alerts() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const alerts = [
    {
      id: 1,
      severity: "critical",
      title: "Unauthorized Drone in Zone A",
      description: "Large quadcopter detected near northern perimeter",
      time: "2 minutes ago",
      location: "Zone A - Northern Perimeter",
      status: "active"
    },
    {
      id: 2,
      severity: "warning",
      title: "RF Signal Detected",
      description: "Unknown frequency pattern matching drone controller",
      time: "15 minutes ago",
      location: "Zone C - Eastern Approach",
      status: "investigating"
    },
    {
      id: 3,
      severity: "info",
      title: "System Update Available",
      description: "New threat detection model ready for installation",
      time: "1 hour ago",
      location: "System-wide",
      status: "pending"
    },
    {
      id: 4,
      severity: "critical",
      title: "Jamming Attempt Detected",
      description: "Possible signal interference affecting sensors in Zone B",
      time: "2 hours ago",
      location: "Zone B - Communications Tower",
      status: "resolved"
    },
    {
      id: 5,
      severity: "warning",
      title: "Battery Backup Activated",
      description: "Power fluctuation detected in perimeter sensors",
      time: "3 hours ago",
      location: "Zone D - Perimeter Sensors",
      status: "resolved"
    }
  ];
  
  return (
    <div className="flex min-h-screen bg-dome-dark">
      {/* Sidebar for larger screens */}
      <div className="hidden lg:block">
        <Sidebar activePage="alerts" />
      </div>
      
      {/* Mobile sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64 border-dome-purple/10 bg-dome-darker">
          <Sidebar activePage="alerts" />
        </SheetContent>
      </Sheet>
      
      <div className="flex flex-col flex-1">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-6">
          <div className="grid gap-4 md:gap-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Alerts & Notifications</h1>
              <Badge variant="outline" className="bg-dome-purple/10 text-dome-purple-light border-dome-purple/30">
                {alerts.filter(a => a.status === "active" || a.status === "investigating").length} Active
              </Badge>
            </div>
            
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={`bg-dome-darker border rounded-lg p-4 ${
                    alert.severity === "critical" 
                      ? "border-dome-red/30" 
                      : alert.severity === "warning"
                        ? "border-yellow-600/30"
                        : "border-dome-purple/30"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full shrink-0 ${
                        alert.severity === "critical" 
                          ? "bg-dome-red/10" 
                          : alert.severity === "warning"
                            ? "bg-yellow-600/10"
                            : "bg-dome-purple/10"
                      }`}>
                        {alert.severity === "critical" ? (
                          <AlertTriangle className={`h-5 w-5 text-dome-red`} />
                        ) : alert.severity === "warning" ? (
                          <AlertTriangle className={`h-5 w-5 text-yellow-500`} />
                        ) : (
                          <Info className={`h-5 w-5 text-dome-purple-light`} />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-white">{alert.title}</h3>
                          <Badge className={`text-xs ${
                            alert.status === "active" 
                              ? "bg-dome-red/10 text-dome-red" 
                              : alert.status === "investigating"
                                ? "bg-yellow-600/10 text-yellow-500"
                                : alert.status === "pending"
                                  ? "bg-dome-purple/10 text-dome-purple-light"
                                  : "bg-green-700/10 text-green-500"
                          }`}>
                            {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{alert.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{alert.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {(alert.status === "active" || alert.status === "investigating") && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-dome-purple/30 text-dome-purple-light hover:bg-dome-purple/10"
                        >
                          Resolve
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant={alert.severity === "critical" ? "default" : "outline"}
                        className={
                          alert.severity === "critical" 
                            ? "bg-dome-red hover:bg-dome-red/90 text-white" 
                            : "border-dome-purple/30 text-dome-purple-light hover:bg-dome-purple/10"
                        }
                      >
                        {alert.severity === "critical" ? "Respond" : "Details"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-4">
              <Button variant="outline" className="border-dome-purple/30 text-dome-purple-light hover:bg-dome-purple/10">
                View Resolved Alerts
              </Button>
              <Button variant="outline" className="border-dome-purple/30 text-dome-purple-light hover:bg-dome-purple/10">
                Export Alert Log
              </Button>
            </div>
            
            <div className="text-center text-xs text-muted-foreground mt-4">
              <p>DomeWatch v2.4.0 • All alerts are logged and monitored</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
