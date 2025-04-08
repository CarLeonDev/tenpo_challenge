import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type LoadingProps = {
  size?: 'sm' | 'md' | 'lg'
}

export const Loading = ({ size = 'md' }: LoadingProps) => {
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  return (
    <Loader2 className={cn("w-4 h-4 animate-spin text-primary", sizeClass[size])} />
  );
};