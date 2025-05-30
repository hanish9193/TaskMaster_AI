
"use client";

import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from '@/lib/utils';

interface AiCompanionProps {
  message: string | null;
  isLoading: boolean;
  respectLevel: number;
  className?: string;
  style?: React.CSSProperties;
}

const AiCompanion: FC<AiCompanionProps> = ({ message, isLoading, respectLevel, className, style }) => {
  const avatarImageUrl = `/taskmaster-logo.png`; // Updated to match user's filename

  return (
    <Card className={cn("w-full themed-card min-h-[300px] md:min-h-[380px] flex flex-col justify-between", className)} style={style}>
      <div className="relative z-10 flex flex-col h-full justify-between">
        <CardHeader className="flex flex-row items-center space-x-4 p-6 bg-transparent">
          <Avatar className="h-16 w-16 md:h-20 md:w-20 border-2 border-card-foreground/10 shadow-md flex-shrink-0">
            <AvatarImage
              src={avatarImageUrl} 
              alt="TaskMaster AI Avatar"
              width={80} // Intrinsic width for optimization, actual size controlled by CSS
              height={80} // Intrinsic height for optimization
            />
            <AvatarFallback className="text-2xl font-semibold bg-muted/70 flex items-center justify-center">
              {/* Fallback if image doesn't load, simple background color */}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl md:text-2xl font-semibold text-card-foreground">TaskMaster</CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 pt-0"> 
          <div className="min-h-[80px] w-full p-5 themed-element rounded-xl flex items-center justify-center text-center shadow-inner">
            {isLoading ? (
              <div className="space-y-3 w-full p-2">
                <Skeleton className="h-5 w-full bg-muted/50 rounded" />
                <Skeleton className="h-5 w-4/5 bg-muted/50 rounded" />
              </div>
            ) : (
              <p className="text-sm leading-relaxed px-2 text-card-foreground/90"> 
                {message || "How can I assist your focus today?"}
              </p>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default AiCompanion;
