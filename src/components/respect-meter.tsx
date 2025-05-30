
"use client";

import type { FC } from 'react';
import { Progress } from "@/components/ui/progress";
import { Heart, Annoyed, Meh } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RespectMeterProps {
  respectLevel: number;
  className?: string;
  style?: React.CSSProperties;
}

const RespectMeter: FC<RespectMeterProps> = ({ respectLevel, className, style }) => {
  const getRespectStatus = () => {
    if (respectLevel > 7) {
      return {
        text: "Supportive",
        icon: Heart,
        colorClass: "text-green-500", 
        borderColorClass: "border-green-500/30",
        description: "Always happy to help you succeed!",
        progressClass: "[&>div]:bg-gradient-to-r from-green-400 to-teal-500"
      };
    }
    if (respectLevel < 4) {
      return {
        text: "Indifferent",
        icon: Annoyed,
        colorClass: "text-orange-500",
        borderColorClass: "border-orange-500/30",
        description: "Just trying to get through the day...",
        progressClass: "[&>div]:bg-gradient-to-r from-orange-400 to-amber-500"
      };
    }
    return {
      text: "Neutral",
      icon: Meh,
      colorClass: "text-blue-500", 
      borderColorClass: "border-blue-500/30",
      description: "Awaiting your tasks.",
      progressClass: "[&>div]:bg-gradient-to-r from-primary to-blue-500"
    };
  };

  const status = getRespectStatus();
  const Icon = status.icon;
  const progressPercentage = respectLevel * 10;

  return (
    <Card className={cn("w-full themed-card", status.borderColorClass, className)} style={style}>
        <CardHeader className="pb-2 pt-5 border-b border-border/30">
            <CardTitle className="text-xl font-semibold text-foreground/90 text-center">AI Attitude</CardTitle>
        </CardHeader>
        <CardContent className="p-5 pt-4 flex flex-col items-center text-center">
            <div className={cn(`flex items-center gap-2 text-lg font-semibold mb-1`, status.colorClass)}>
                <Icon className="h-7 w-7 animate-float" />
                {status.text}
            </div>
            <p className="text-xs text-muted-foreground/80 mb-2">{`(Level: ${respectLevel.toFixed(1)}/10)`}</p>
            <p className="text-sm text-muted-foreground/90 mb-4 min-h-[30px]">{status.description}</p>
            
            <div className="w-full max-w-xs">
              <Progress
                  value={progressPercentage}
                  className={cn(
                      "w-full h-3 rounded-full bg-muted/40 overflow-hidden shadow-inner",
                      status.progressClass
                  )}
                  aria-valuenow={respectLevel}
                  aria-valuemin={0}
                  aria-valuemax={10}
                  aria-label={`AI Attitude level: ${respectLevel} out of 10`}
              />
              <div className="flex justify-between text-xs text-muted-foreground/80 mt-2 px-0.5">
                  <span>Distant</span>
                  <span>Neutral</span>
                  <span>Friendly</span>
              </div>
            </div>
        </CardContent>
    </Card>
  );
};

export default RespectMeter;
