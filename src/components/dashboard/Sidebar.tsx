import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart3, 
  Radar, 
  Shield, 
  Settings, 
  AlertTriangle, 
  Database, 
  Users, 
  LogOut,
  Eye,
  Radio,
  FileText,
  Webcam,
  Upload,
  Image as ImageIcon,
  Video as VideoIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DomeWatchBadge } from "./DomeWatchBadge";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface SidebarProps {
  className?: string;
  activePage?: string;
  userRole?: string;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  alert?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

function SidebarItem({ icon, label, active, alert, onClick, disabled }: SidebarItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start",
        active ? "bg-dome-purple/10 text-dome-purple-light" : "text-muted-foreground hover:bg-dome-purple/5 hover:text-dome-purple-light",
        disabled && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-muted-foreground"
      )}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      <div className="relative">
        {icon}
        {alert && (
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-dome-red"></span>
        )}
      </div>
      <span className="ml-3">{label}</span>
    </Button>
  );
}

export function Sidebar({ className, activePage = "dashboard", userRole = "operator" }: SidebarProps) {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    toast.success("Logged out successfully", {
      description: "Redirecting to home page..."
    });
    localStorage.removeItem("userRole");
    setTimeout(() => navigate("/"), 1500);
  };
  
  const handleDisabledFeature = () => {
    toast.info("Access Restricted", {
      description: "This feature requires operator privileges"
    });
  };
  
  const isPersonnel = userRole === "personnel";
  
  return (
    <aside
      className={cn(
        "flex flex-col border-r border-dome-purple/10 bg-dome-darker w-64 p-4",
        className
      )}
    >
      <div className="flex items-center py-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
        <DomeWatchBadge />
      </div>
      
      <Separator className="my-4 bg-dome-purple/10" />
      
      <nav className="space-y-1.5">
        <SidebarItem 
          icon={<BarChart3 className="h-5 w-5" />} 
          label="Dashboard" 
          active={activePage === "dashboard"}
          onClick={() => navigate("/dashboard")}
        />
        <SidebarItem 
          icon={<Webcam className="h-5 w-5" />} 
          label="Camera Detection" 
          active={activePage === "camera-detection"}
          onClick={() => navigate("/camera-detection")}
        />
        <SidebarItem 
          icon={<Radar className="h-5 w-5" />} 
          label="Detection" 
          active={activePage === "detection"}
          onClick={() => navigate("/detection")}
        />
        <div className="ml-3">
          <div className="text-xs text-dome-purple-light mt-2 mb-1 select-none">Media Detection</div>
          <SidebarItem 
            icon={<ImageIcon className="h-5 w-5" />} 
            label="Photo Detection" 
            active={activePage === "photo-detection"}
            onClick={() => navigate("/photo-detection")}
          />
          <SidebarItem 
            icon={<VideoIcon className="h-5 w-5" />} 
            label="Video Detection" 
            active={activePage === "video-detection"}
            onClick={() => navigate("/video-detection")}
          />
        </div>
        <SidebarItem 
          icon={<Shield className="h-5 w-5" />} 
          label="Countermeasures" 
          active={activePage === "countermeasures"}
          alert={!isPersonnel}
          onClick={() => navigate("/countermeasures")}
          disabled={isPersonnel}
        />
        <SidebarItem 
          icon={<AlertTriangle className="h-5 w-5" />} 
          label="Alerts" 
          active={activePage === "alerts"}
          onClick={() => navigate("/alerts")}
        />
        <SidebarItem 
          icon={<Database className="h-5 w-5" />} 
          label="Analytics" 
          active={activePage === "analytics"}
          onClick={() => navigate("/analytics")}
        />
        
        {isPersonnel ? (
          <>
            <SidebarItem 
              icon={<Eye className="h-5 w-5" />} 
              label="Monitoring Logs" 
              active={activePage === "logs"}
              onClick={() => navigate("/logs")}
            />
            <SidebarItem 
              icon={<FileText className="h-5 w-5" />} 
              label="Reports" 
              active={activePage === "reports"}
              onClick={() => navigate("/reports")}
            />
          </>
        ) : (
          <>
            <SidebarItem 
              icon={<Users className="h-5 w-5" />} 
              label="Operators" 
              active={activePage === "operators"}
              onClick={() => navigate("/operators")}
            />
            <SidebarItem 
              icon={<Settings className="h-5 w-5" />} 
              label="Settings" 
              active={activePage === "settings"}
              onClick={() => navigate("/settings")}
            />
          </>
        )}
      </nav>
      
      <div className="mt-auto">
        <Separator className="my-4 bg-dome-purple/10" />
        <Button 
          variant="ghost" 
          className="w-full justify-start text-muted-foreground hover:bg-dome-red/10 hover:text-dome-red"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span className="ml-3">Log Out</span>
        </Button>
      </div>
    </aside>
  );
}
