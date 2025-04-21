
import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { BarChart3, PieChart, TrendingUp, Download, Filter } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { toast } from "sonner";

// Sample data for charts
const detectionData = [
  { name: "Mon", value: 12 },
  { name: "Tue", value: 19 },
  { name: "Wed", value: 7 },
  { name: "Thu", value: 23 },
  { name: "Fri", value: 18 },
  { name: "Sat", value: 9 },
  { name: "Sun", value: 5 },
];

const performanceData = [
  { name: "Jan", value: 78 },
  { name: "Feb", value: 82 },
  { name: "Mar", value: 85 },
  { name: "Apr", value: 89 },
  { name: "May", value: 94 },
  { name: "Jun", value: 91 },
];

export default function Analytics() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const handleExportData = () => {
    toast.success("Export initiated", {
      description: "Analytics data export prepared for download"
    });
  };

  const handleApplyFilters = () => {
    toast.success("Filters applied", {
      description: "Analytics view updated with selected filters"
    });
  };
  
  return (
    <div className="flex min-h-screen bg-dome-dark">
      {/* Sidebar for larger screens */}
      <div className="hidden lg:block">
        <Sidebar activePage="analytics" />
      </div>
      
      {/* Mobile sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64 border-dome-purple/10 bg-dome-darker">
          <Sidebar activePage="analytics" />
        </SheetContent>
      </Sheet>
      
      <div className="flex flex-col flex-1">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-6">
          <div className="grid gap-4 md:gap-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="bg-dome-darker text-dome-purple-light border border-dome-purple/30 hover:bg-dome-purple/10"
                  onClick={handleApplyFilters}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button 
                  className="bg-dome-purple hover:bg-dome-purple/90 text-white"
                  onClick={handleExportData}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card className="bg-dome-darker border-dome-purple/10">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-dome-purple/10">
                      <BarChart3 className="h-5 w-5 text-dome-purple-light" />
                    </div>
                    <CardTitle className="text-white">Weekly Detections</CardTitle>
                  </div>
                  <CardDescription>Drone detections by day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={detectionData}>
                        <XAxis dataKey="name" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "#1a1625",
                            border: "1px solid rgba(149, 76, 233, 0.2)"
                          }}
                        />
                        <Bar dataKey="value" fill="#954ce9" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-dome-darker border-dome-purple/10">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-dome-purple/10">
                      <TrendingUp className="h-5 w-5 text-dome-purple-light" />
                    </div>
                    <CardTitle className="text-white">System Performance</CardTitle>
                  </div>
                  <CardDescription>Detection accuracy over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <XAxis dataKey="name" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "#1a1625",
                            border: "1px solid rgba(149, 76, 233, 0.2)"
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#954ce9" 
                          strokeWidth={2}
                          dot={{ fill: "#954ce9", r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-dome-darker border-dome-purple/10 mt-4">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-dome-purple/10">
                    <PieChart className="h-5 w-5 text-dome-purple-light" />
                  </div>
                  <CardTitle className="text-white">Threat Assessment</CardTitle>
                </div>
                <CardDescription>Analytics and trend analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="bg-dome-purple/5 p-4 rounded-lg">
                    <h3 className="text-dome-purple-light font-medium mb-2">Threat Categories</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Commercial</span>
                        <span className="text-sm text-white">68%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Hobbyist</span>
                        <span className="text-sm text-white">24%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Unknown</span>
                        <span className="text-sm text-white">8%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-dome-purple/5 p-4 rounded-lg">
                    <h3 className="text-dome-purple-light font-medium mb-2">Detection Methods</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">RF Detection</span>
                        <span className="text-sm text-white">42%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Visual</span>
                        <span className="text-sm text-white">35%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Acoustic</span>
                        <span className="text-sm text-white">23%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-dome-purple/5 p-4 rounded-lg">
                    <h3 className="text-dome-purple-light font-medium mb-2">Response Times</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Average</span>
                        <span className="text-sm text-white">14.2s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Fastest</span>
                        <span className="text-sm text-white">3.7s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Critical Response</span>
                        <span className="text-sm text-white">8.5s</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-center text-xs text-muted-foreground mt-4">
              <p>DomeWatch v2.4.0 • Analytics data refreshed every 15 minutes</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
