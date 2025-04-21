
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { OperatorLoginForm } from "@/components/auth/OperatorLoginForm";
import { PersonnelLoginForm } from "@/components/auth/PersonnelLoginForm";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Radio, Lock, ArrowLeft } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("operator");
  
  // Check for login type in URL parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const loginType = params.get("type");
    if (loginType === "operator" || loginType === "personnel") {
      setActiveTab(loginType);
    }
  }, [location]);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-dome-dark p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 h-[150%] w-[150%] rounded-[50%] bg-dome-purple/5 blur-3xl"></div>
        <div className="absolute -bottom-1/2 left-1/2 h-[150%] w-[150%] rounded-[50%] bg-dome-purple/10 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-lg">
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute -top-12 left-0 text-dome-purple-light hover:bg-dome-purple/10"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-center">
          <div className="inline-block px-3 py-1 text-xs font-medium text-dome-purple-light bg-dome-purple/10 rounded-full shadow-sm">
            Secured Connection • 256-bit encrypted
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-dome-darker">
            <TabsTrigger value="operator" className="data-[state=active]:bg-dome-purple data-[state=active]:text-white">
              <Radio className="mr-2 h-4 w-4" />
              Operator
            </TabsTrigger>
            <TabsTrigger value="personnel" className="data-[state=active]:bg-dome-purple data-[state=active]:text-white">
              <Lock className="mr-2 h-4 w-4" />
              Authorized Personnel
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="operator">
            <OperatorLoginForm />
          </TabsContent>
          
          <TabsContent value="personnel">
            <PersonnelLoginForm />
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            DomeWatch Security Systems • Authorized Access Only
          </p>
        </div>
      </div>
    </div>
  );
}
