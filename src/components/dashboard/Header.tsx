
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BellRing, ChevronDown, Menu, ShieldAlert, Radio, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface HeaderProps {
  className?: string;
  onMenuClick?: () => void;
  userRole?: string;
}

export function Header({ className, onMenuClick, userRole = "operator" }: HeaderProps) {
  const navigate = useNavigate();
  
  const handleProfileClick = () => {
    toast.info("Profile Settings", {
      description: "View and edit your profile"
    });
  };
  
  const handleSettingsClick = () => {
    navigate("/settings");
  };
  
  const handleHelpClick = () => {
    toast.info("Help Documentation", {
      description: "Accessing system documentation and user guides"
    });
  };
  
  const handleLogout = () => {
    toast.success("Logged out successfully", {
      description: "Redirecting to home page..."
    });
    localStorage.removeItem("userRole");
    setTimeout(() => navigate("/"), 1500);
  };
  
  return (
    <header className={cn("border-b border-dome-purple/10 bg-dome-darker p-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
            {userRole === "operator" ? (
              <ShieldAlert className="h-6 w-6 text-dome-purple" />
            ) : (
              <Radio className="h-6 w-6 text-dome-purple" />
            )}
            <h1 className="text-xl font-bold text-white">DomeWatch</h1>
            <Badge variant="outline" className="ml-2 bg-dome-purple/10 text-dome-purple-light">
              {userRole === "operator" ? "Command Center" : "Monitoring System"}
            </Badge>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="relative"
              >
                <BellRing className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-dome-red text-[10px] font-medium text-white">
                  2
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-dome-darker border-dome-purple/20">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start cursor-pointer" onClick={() => navigate("/alerts")}>
                <span className="text-dome-red font-medium">Critical Alert</span>
                <span className="text-xs text-muted-foreground">Unauthorized drone in Zone A</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start cursor-pointer">
                <span>System Update</span>
                <span className="text-xs text-muted-foreground">New threat detection model ready</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-center text-xs text-dome-purple-light cursor-pointer"
                onClick={() => navigate("/alerts")}
              >
                View all
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-dome-purple text-white">
                    {userRole === "operator" ? "OP" : "AP"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm font-medium">
                    {userRole === "operator" ? "Operator" : "Personnel"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {userRole === "operator" ? "Security Level: Alpha" : "Access Level: Beta"}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-dome-darker border-dome-purple/20">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfileClick}>
                Profile
              </DropdownMenuItem>
              {userRole === "operator" && (
                <DropdownMenuItem onClick={handleSettingsClick}>
                  Settings
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleHelpClick}>
                Help
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
