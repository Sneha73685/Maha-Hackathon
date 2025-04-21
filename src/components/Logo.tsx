
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-24'
  };

  return (
    <img 
      src="/lovable-uploads/3e5caa96-0fe8-419a-beb4-041372c8f8cd.png"
      alt="DomeWatch Logo"
      className={cn(sizes[size], 'w-auto', className)}
    />
  );
}
