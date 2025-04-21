
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, User } from "lucide-react";
import { toast } from "sonner";

export function PersonnelLoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate personnel authentication
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Personnel login successful", {
        description: "Welcome to DomeWatch Monitoring System"
      });
      localStorage.setItem("userRole", "personnel");
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <Card className="w-full border-dome-purple/20 bg-dome-dark shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-dome-purple/10">
          <User className="h-10 w-10 text-dome-purple" />
        </div>
        <CardTitle className="text-2xl font-bold text-white">Personnel Login</CardTitle>
        <CardDescription className="text-dome-purple-light">
          Monitoring & Observation Access
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Input
                id="username"
                placeholder="Username"
                required
                className="bg-dome-darker/50 border-dome-purple/20 text-white"
              />
            </div>
            <div className="grid gap-2">
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  className="bg-dome-darker/50 border-dome-purple/20 text-white"
                />
                <Lock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="grid gap-2">
              <Input
                id="department"
                placeholder="Department Code"
                required
                className="bg-dome-darker/50 border-dome-purple/20 text-white"
              />
            </div>
            <Button 
              type="submit" 
              className="bg-dome-purple hover:bg-dome-purple-dark text-white w-full"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Access System"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <p className="text-xs text-muted-foreground text-center">
          Authorized personnel have limited system access.
          <br />
          Contact your supervisor for access issues.
        </p>
      </CardFooter>
    </Card>
  );
}
