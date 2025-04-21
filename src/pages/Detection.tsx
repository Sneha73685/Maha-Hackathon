
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Radar, Radio, Shield, AlertTriangle, Webcam, Image as ImageIcon, Video as VideoIcon } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Upload } from "lucide-react";

export default function Detection() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleCalibrateSystem = (system: string) => {
    toast.success(`${system} calibration initiated`, {
      description: "System optimization in progress. This may take a few minutes."
    });
  };
  
  const handleScanFrequencies = () => {
    toast.success("Frequency scanning initiated", {
      description: "Scanning for new signals across all frequency bands"
    });
  };
  
  const handleUpdateAI = () => {
    toast.success("AI model update initiated", {
      description: "Downloading and installing latest threat detection models"
    });
  };
  
  return (
    <div className="flex min-h-screen bg-dome-dark">
      {/* Sidebar for larger screens */}
      <div className="hidden lg:block">
        <Sidebar activePage="detection" />
      </div>
      
      {/* Mobile sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64 border-dome-purple/10 bg-dome-darker">
          <Sidebar activePage="detection" />
        </SheetContent>
      </Sheet>
      
      <div className="flex flex-col flex-1">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-6">
          <div className="grid gap-4 md:gap-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Detection Systems</h1>
              <Button
                className="bg-dome-purple hover:bg-dome-purple/90 text-white"
                onClick={() => navigate("/photo-detection")}
              >
                <Upload className="mr-2 h-4 w-4" />
                Media Detection
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-dome-darker border-dome-purple/10">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-dome-purple/10">
                      <Radar className="h-5 w-5 text-dome-purple-light" />
                    </div>
                    <CardTitle className="text-white">Visual Detection</CardTitle>
                  </div>
                  <CardDescription>AI-powered computer vision</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">System Status</span>
                        <span className="text-dome-green">Active</span>
                      </div>
                      <Progress value={92} className="h-2 bg-dome-purple/10" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Detection Range</span>
                        <span className="text-white">1.2 km</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-dome-purple hover:bg-dome-purple/90 text-white"
                      onClick={() => handleCalibrateSystem("Visual Detection")}
                    >
                      Calibrate Cameras
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-dome-darker border-dome-purple/10">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-dome-purple/10">
                      <Radio className="h-5 w-5 text-dome-purple-light" />
                    </div>
                    <CardTitle className="text-white">RF Monitoring</CardTitle>
                  </div>
                  <CardDescription>Signal pattern analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">System Status</span>
                        <span className="text-dome-green">Active</span>
                      </div>
                      <Progress value={88} className="h-2 bg-dome-purple/10" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Active Frequencies</span>
                        <span className="text-white">7 channels</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-dome-purple hover:bg-dome-purple/90 text-white"
                      onClick={handleScanFrequencies}
                    >
                      Scan New Frequencies
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-dome-darker border-dome-purple/10">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-dome-purple/10">
                      <AlertTriangle className="h-5 w-5 text-dome-purple-light" />
                    </div>
                    <CardTitle className="text-white">Threat Analysis</CardTitle>
                  </div>
                  <CardDescription>AI classification engine</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">System Status</span>
                        <span className="text-dome-green">Active</span>
                      </div>
                      <Progress value={95} className="h-2 bg-dome-purple/10" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Detection Accuracy</span>
                        <span className="text-white">97.8%</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-dome-purple hover:bg-dome-purple/90 text-white"
                      onClick={handleUpdateAI}
                    >
                      Update AI Model
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Webcam Detection Section */}
              <Card className="bg-dome-darker border-dome-purple/10">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-dome-purple/10">
                      <Webcam className="h-5 w-5 text-dome-purple-light" />
                    </div>
                    <CardTitle className="text-white">Webcam Detection</CardTitle>
                  </div>
                  <CardDescription>Use your webcam for real-time drone detection</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-muted-foreground text-sm">
                      Activate your device's webcam for live detection. All analysis happens directly in your browser.
                    </p>
                    <Button
                      className="w-full bg-dome-purple hover:bg-dome-purple/90 text-white"
                      onClick={() => navigate("/camera-detection")}
                    >
                      <Webcam className="mr-2 h-4 w-4" />
                      Start Webcam Detection
                    </Button>
                  </div>
                </CardContent>
              </Card>
              {/* End Webcam Detection Section */}

              {/* Photo Detection Shortcut */}
              <Card className="bg-dome-darker border-dome-purple/10">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-dome-purple/10">
                      <ImageIcon className="h-5 w-5 text-dome-purple-light" />
                    </div>
                    <CardTitle className="text-white">Photo Detection</CardTitle>
                  </div>
                  <CardDescription>Upload an image for drone detection</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-dome-purple hover:bg-dome-purple/90 text-white"
                      onClick={() => navigate("/photo-detection")}
                    >
                      Upload Photo
                    </Button>
                  </div>
                </CardContent>
              </Card>
              {/* Video Detection Shortcut */}
              <Card className="bg-dome-darker border-dome-purple/10">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-dome-purple/10">
                      <VideoIcon className="h-5 w-5 text-dome-purple-light" />
                    </div>
                    <CardTitle className="text-white">Video Detection</CardTitle>
                  </div>
                  <CardDescription>Upload a video for drone detection</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-dome-purple hover:bg-dome-purple/90 text-white"
                      onClick={() => navigate("/video-detection")}
                    >
                      Upload Video
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center text-xs text-muted-foreground mt-4">
              <p>DomeWatch v2.4.0 • All activity is logged and monitored</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
