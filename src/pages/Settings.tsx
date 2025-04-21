
import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Settings as SettingsIcon, Bell, Shield, Database, Monitor, Users, Save } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

export default function Settings() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundsEnabled, setSoundsEnabled] = useState(true);
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(true);
  const [telemetryEnabled, setTelemetryEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [sensitivityValue, setSensitivityValue] = useState([75]);
  
  const handleSaveSettings = () => {
    toast.success("Settings saved successfully", {
      description: "Your preferences have been updated"
    });
  };
  
  const handleResetDefaults = () => {
    toast.info("Reset to defaults", {
      description: "All settings have been reset to system defaults"
    });
    setNotificationsEnabled(true);
    setSoundsEnabled(true);
    setAutoUpdateEnabled(true);
    setTelemetryEnabled(true);
    setDarkModeEnabled(true);
    setSensitivityValue([75]);
  };
  
  return (
    <div className="flex min-h-screen bg-dome-dark">
      {/* Sidebar for larger screens */}
      <div className="hidden lg:block">
        <Sidebar activePage="settings" />
      </div>
      
      {/* Mobile sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64 border-dome-purple/10 bg-dome-darker">
          <Sidebar activePage="settings" />
        </SheetContent>
      </Sheet>
      
      <div className="flex flex-col flex-1">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-6">
          <div className="grid gap-4 md:gap-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Settings</h1>
              <Button 
                className="bg-dome-purple hover:bg-dome-purple/90 text-white"
                onClick={handleSaveSettings}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
            
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid grid-cols-4 mb-4 bg-dome-purple/5 border border-dome-purple/10">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-4">
                <Card className="bg-dome-darker border-dome-purple/10">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-dome-purple/10">
                        <SettingsIcon className="h-5 w-5 text-dome-purple-light" />
                      </div>
                      <CardTitle className="text-white">General Settings</CardTitle>
                    </div>
                    <CardDescription>Configure basic preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-white">Dark Mode</p>
                        <p className="text-xs text-muted-foreground">Use dark theme across the application</p>
                      </div>
                      <Switch 
                        checked={darkModeEnabled} 
                        onCheckedChange={setDarkModeEnabled}
                      />
                    </div>
                    
                    <Separator className="bg-dome-purple/10" />
                    
                    <div className="space-y-2">
                      <Label htmlFor="sensitivity" className="text-sm font-medium text-white">
                        Detection Sensitivity
                      </Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          id="sensitivity"
                          value={sensitivityValue}
                          onValueChange={setSensitivityValue}
                          max={100}
                          step={1}
                          className="flex-1"
                        />
                        <span className="text-sm text-white w-10 text-center">{sensitivityValue}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Adjust threshold for threat detection</p>
                    </div>
                    
                    <Separator className="bg-dome-purple/10" />
                    
                    <div className="space-y-2">
                      <Label htmlFor="apiKey" className="text-sm font-medium text-white">
                        API Key
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="apiKey" 
                          type="password" 
                          value="●●●●●●●●●●●●●●●●●●●●" 
                          readOnly
                          className="bg-dome-dark border-dome-purple/20 text-white"
                        />
                        <Button 
                          variant="outline" 
                          className="bg-dome-darker text-dome-purple-light border border-dome-purple/30 hover:bg-dome-purple/10"
                          onClick={() => toast.info("API Key Management", {
                            description: "Opening secure API key generation interface"
                          })}
                        >
                          Regenerate
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">For third-party integrations</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-4">
                <Card className="bg-dome-darker border-dome-purple/10">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-dome-purple/10">
                        <Bell className="h-5 w-5 text-dome-purple-light" />
                      </div>
                      <CardTitle className="text-white">Notification Settings</CardTitle>
                    </div>
                    <CardDescription>Configure alerts and notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-white">Enable Notifications</p>
                        <p className="text-xs text-muted-foreground">Show system alerts and notifications</p>
                      </div>
                      <Switch 
                        checked={notificationsEnabled} 
                        onCheckedChange={setNotificationsEnabled}
                      />
                    </div>
                    
                    <Separator className="bg-dome-purple/10" />
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-white">Alert Sounds</p>
                        <p className="text-xs text-muted-foreground">Play sounds for critical alerts</p>
                      </div>
                      <Switch 
                        checked={soundsEnabled} 
                        onCheckedChange={setSoundsEnabled}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-4">
                <Card className="bg-dome-darker border-dome-purple/10">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-dome-purple/10">
                        <Shield className="h-5 w-5 text-dome-purple-light" />
                      </div>
                      <CardTitle className="text-white">Security Settings</CardTitle>
                    </div>
                    <CardDescription>Configure security preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium text-white">
                        Update Password
                      </Label>
                      <div className="flex flex-col gap-2 md:flex-row">
                        <Input 
                          id="currentPassword" 
                          type="password" 
                          placeholder="Current password" 
                          className="bg-dome-dark border-dome-purple/20 text-white"
                        />
                        <Input 
                          id="newPassword" 
                          type="password" 
                          placeholder="New password" 
                          className="bg-dome-dark border-dome-purple/20 text-white"
                        />
                        <Button 
                          className="bg-dome-purple hover:bg-dome-purple/90 text-white"
                          onClick={() => toast.success("Password updated", {
                            description: "Your password has been changed successfully"
                          })}
                        >
                          Update
                        </Button>
                      </div>
                    </div>
                    
                    <Separator className="bg-dome-purple/10" />
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-white">
                        Two-Factor Authentication
                      </Label>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">Enhance account security with 2FA</p>
                          <Button 
                            variant="outline" 
                            className="bg-dome-darker text-dome-purple-light border border-dome-purple/30 hover:bg-dome-purple/10"
                            onClick={() => toast.info("2FA Configuration", {
                              description: "Opening two-factor authentication setup wizard"
                            })}
                          >
                            Configure
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="system" className="space-y-4">
                <Card className="bg-dome-darker border-dome-purple/10">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-dome-purple/10">
                        <Database className="h-5 w-5 text-dome-purple-light" />
                      </div>
                      <CardTitle className="text-white">System Settings</CardTitle>
                    </div>
                    <CardDescription>Configure system behavior</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-white">Automatic Updates</p>
                        <p className="text-xs text-muted-foreground">Keep the system up to date</p>
                      </div>
                      <Switch 
                        checked={autoUpdateEnabled} 
                        onCheckedChange={setAutoUpdateEnabled}
                      />
                    </div>
                    
                    <Separator className="bg-dome-purple/10" />
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-white">Usage Telemetry</p>
                        <p className="text-xs text-muted-foreground">Send anonymous usage data</p>
                      </div>
                      <Switch 
                        checked={telemetryEnabled} 
                        onCheckedChange={setTelemetryEnabled}
                      />
                    </div>
                    
                    <Separator className="bg-dome-purple/10" />
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-white">
                        System Information
                      </Label>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">DomeWatch Version</span>
                          <span className="text-xs text-white">2.4.0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">Database Version</span>
                          <span className="text-xs text-white">1.2.8</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">Last Update</span>
                          <span className="text-xs text-white">2 days ago</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                className="bg-dome-darker text-dome-red border border-dome-red/30 hover:bg-dome-red/10"
                onClick={handleResetDefaults}
              >
                Reset to Defaults
              </Button>
            </div>
            
            <div className="text-center text-xs text-muted-foreground mt-4">
              <p>DomeWatch v2.4.0 • Settings are synced across all devices</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
