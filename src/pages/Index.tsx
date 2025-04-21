import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Radio, Lock, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function Index() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-dome-dark flex flex-col">
      {/* Navigation */}
      <header className="w-full border-b border-dome-purple/10 bg-dome-darker p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Logo size="sm" />
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-dome-purple-light hover:bg-dome-purple/10"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-24 flex flex-col items-center">
        <div className="relative mb-8">
          <div className="absolute -inset-0.5 bg-dome-purple/20 rounded-lg blur-xl"></div>
          <div className="relative bg-dome-darker p-1 rounded-lg">
            <Logo size="lg" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6">
          DomeWatch
        </h1>
        <p className="text-xl text-dome-purple-light text-center max-w-2xl mb-10 italic">
          Securing the skies, one drone at a time
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button 
            className="bg-dome-purple hover:bg-dome-purple-dark text-white px-8 py-6 text-lg"
            onClick={() => navigate("/login?type=operator")}
          >
            <Radio className="mr-2 h-5 w-5" />
            Operator Login
          </Button>
          <Button 
            variant="outline" 
            className="border-dome-purple text-dome-purple-light hover:bg-dome-purple/10 px-8 py-6 text-lg"
            onClick={() => navigate("/login?type=personnel")}
          >
            <Lock className="mr-2 h-5 w-5" />
            Authorized Personnel
          </Button>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-dome-darker py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Key System Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Advanced Detection" 
              description="Cutting-edge radar and RF analysis to identify unauthorized drones within protected airspace"
              icon={<Radio className="h-10 w-10 text-dome-purple" />}
              onClick={() => navigate("/detection")}
            />
            <FeatureCard 
              title="Countermeasure Systems" 
              description="Intelligent threat response with multiple neutralization options for different threat levels"
              icon={<Lock className="h-10 w-10 text-dome-purple" />}
              onClick={() => navigate("/countermeasures")}
            />
            <FeatureCard 
              title="Command & Control" 
              description="Real-time monitoring and responsive control systems for immediate threat management"
              icon={<ArrowRight className="h-10 w-10 text-dome-purple" />}
              onClick={() => navigate("/dashboard")}
            />
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-dome-purple/10 bg-dome-dark py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            DomeWatch &copy; 2025 • Advanced Drone Defense Technology
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description, icon, onClick }: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div 
      className="bg-dome-dark p-6 rounded-lg border border-dome-purple/10 hover:border-dome-purple/30 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
