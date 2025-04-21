
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock } from "lucide-react";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md border-dome-purple/20 bg-dome-dark shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-dome-purple/10">
          <Shield className="h-10 w-10 text-dome-purple" />
        </div>
        <CardTitle className="text-2xl font-bold text-white">DomeWatch</CardTitle>
        <CardDescription className="text-dome-purple-light">
          AI-Powered Anti-Drone Defense System
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
            <Button 
              type="submit" 
              className="bg-dome-purple hover:bg-dome-purple-dark text-white w-full"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Secure Login"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <p className="text-xs text-muted-foreground text-center">
          Authorized Personnel Only. This system is monitored and protected.
          <br />
          © 2025 DomeWatch Security Systems
        </p>
      </CardFooter>
    </Card>
  );
}
