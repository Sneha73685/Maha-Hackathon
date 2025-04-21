
import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Users, UserPlus, AlertCircle, ShieldCheck, Clock } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const operators = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Senior Operator",
    status: "online",
    clearance: "Alpha",
    lastLogin: "Now",
    initials: "AC",
  },
  {
    id: 2,
    name: "Morgan Smith",
    role: "Threat Analyst",
    status: "online",
    clearance: "Alpha",
    lastLogin: "23m ago",
    initials: "MS",
  },
  {
    id: 3,
    name: "Jordan Lee",
    role: "Technical Lead",
    status: "offline",
    clearance: "Alpha",
    lastLogin: "2h ago",
    initials: "JL",
  },
  {
    id: 4,
    name: "Casey Taylor",
    role: "Junior Operator",
    status: "offline",
    clearance: "Beta",
    lastLogin: "Yesterday",
    initials: "CT",
  },
];

export default function Operators() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const handleAddOperator = () => {
    toast.info("Add Operator", {
      description: "Opening operator onboarding form"
    });
  };
  
  const handleManagePermissions = (name: string) => {
    toast.info(`Manage ${name}'s Permissions`, {
      description: "Opening permission management panel"
    });
  };
  
  const handleContactOperator = (name: string) => {
    toast.success(`Contact ${name}`, {
      description: "Opening secure communication channel"
    });
  };
  
  return (
    <div className="flex min-h-screen bg-dome-dark">
      {/* Sidebar for larger screens */}
      <div className="hidden lg:block">
        <Sidebar activePage="operators" />
      </div>
      
      {/* Mobile sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64 border-dome-purple/10 bg-dome-darker">
          <Sidebar activePage="operators" />
        </SheetContent>
      </Sheet>
      
      <div className="flex flex-col flex-1">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-6">
          <div className="grid gap-4 md:gap-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Operators</h1>
              <Button 
                className="bg-dome-purple hover:bg-dome-purple/90 text-white"
                onClick={handleAddOperator}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Operator
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
              {operators.map((operator) => (
                <Card key={operator.id} className="bg-dome-darker border-dome-purple/10">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-dome-purple/20 text-dome-purple-light font-medium">
                            {operator.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-white">{operator.name}</CardTitle>
                          <CardDescription>{operator.role}</CardDescription>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`
                          ${operator.status === 'online' 
                            ? 'bg-dome-green/10 text-dome-green border-dome-green/30' 
                            : 'bg-gray-700/30 text-gray-400 border-gray-600/30'}
                        `}
                      >
                        {operator.status === 'online' ? 'Online' : 'Offline'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-dome-purple-light" />
                        <span className="text-sm text-muted-foreground">Clearance Level:</span>
                        <span className="text-sm text-white">{operator.clearance}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-dome-purple-light" />
                        <span className="text-sm text-muted-foreground">Last login:</span>
                        <span className="text-sm text-white">{operator.lastLogin}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 bg-dome-darker text-dome-purple-light border border-dome-purple/30 hover:bg-dome-purple/10"
                      onClick={() => handleManagePermissions(operator.name)}
                    >
                      Permissions
                    </Button>
                    <Button 
                      className="flex-1 bg-dome-purple hover:bg-dome-purple/90 text-white"
                      onClick={() => handleContactOperator(operator.name)}
                    >
                      Contact
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <Card className="bg-dome-darker border-dome-purple/10 mt-4">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-dome-purple/10">
                    <AlertCircle className="h-5 w-5 text-dome-purple-light" />
                  </div>
                  <CardTitle className="text-white">Operator Activity</CardTitle>
                </div>
                <CardDescription>Recent system interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-dome-purple/10 text-dome-purple-light text-xs">AC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-white">Alex Chen</p>
                      <p className="text-xs text-muted-foreground">Activated RF jamming countermeasure in Zone B</p>
                      <p className="text-xs text-dome-purple-light mt-1">15 minutes ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-dome-purple/10 text-dome-purple-light text-xs">MS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-white">Morgan Smith</p>
                      <p className="text-xs text-muted-foreground">Updated threat classification model parameters</p>
                      <p className="text-xs text-dome-purple-light mt-1">1 hour ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-dome-purple/10 text-dome-purple-light text-xs">JL</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-white">Jordan Lee</p>
                      <p className="text-xs text-muted-foreground">Calibrated detection systems for night operations</p>
                      <p className="text-xs text-dome-purple-light mt-1">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-center text-xs text-muted-foreground mt-4">
              <p>DomeWatch v2.4.0 • Access controlled by security policy</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
