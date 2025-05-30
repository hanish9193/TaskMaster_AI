
'use client';

import Link from 'next/link';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function AppHeader() {
  return (
    <header 
      className={cn(
        "app-header flex items-center justify-between px-4 md:px-6 h-16"
      )}
    >
      {/* Left: App Name */}
      <Link href="/dashboard" className="flex items-center gap-2 group">
        <span className="text-xl font-semibold text-foreground hidden sm:inline-block">TaskMaster AI</span>
      </Link>

      {/* Center: Navigation (Placeholder) */}
      <nav className="hidden md:flex gap-4">
        {/* Example Nav Item:
        <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Focus
        </Link>
        */}
      </nav>

      {/* Right: User Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        <Button variant="ghost" size="icon" className="rounded-full relative hover:bg-muted/50 transition-colors">
          <Bell className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          {/* Notification Dot Example: 
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-accent ring-2 ring-background"></span> 
          */}
          <span className="sr-only">Notifications</span>
        </Button>
        <Avatar className="h-9 w-9 border-2 border-transparent hover:border-primary/50 transition-colors cursor-pointer">
          <AvatarImage 
            src="https://placehold.co/80x80.png" 
            alt="User Avatar" 
            data-ai-hint="professional person" />
          <AvatarFallback>
            {/* Removed UserCircle icon */}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
