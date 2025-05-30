
"use client";

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface AddTaskFormProps {
  onAddTask: (text: string, priority: 'high' | 'medium' | 'low', dueDate: Date | null) => void;
  theme?: 'light' | 'dark'; // To adjust for contrasting backgrounds
}

const AddTaskForm: FC<AddTaskFormProps> = ({ onAddTask, theme = 'light' }) => {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string>(""); // HH:mm format
  const [minTime, setMinTime] = useState<string | undefined>(undefined);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of today for date comparison

  useEffect(() => {
    if (dueDate) {
      const now = new Date();
      const isSelectedDateToday =
        dueDate.getFullYear() === now.getFullYear() &&
        dueDate.getMonth() === now.getMonth() &&
        dueDate.getDate() === now.getDate();

      if (isSelectedDateToday) {
        const currentHours = now.getHours().toString().padStart(2, '0');
        const currentMinutes = now.getMinutes().toString().padStart(2, '0');
        const newMinTime = `${currentHours}:${currentMinutes}`;
        setMinTime(newMinTime);

        // If a time is already set and it's before the new minTime, clear it
        if (time && time < newMinTime) {
          setTime("");
        }
      } else {
        setMinTime(undefined); // No min time for future dates
      }
    } else {
      setMinTime(undefined); // No due date, so no min time
    }
  }, [dueDate, time]); // Rerun when dueDate or time changes

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      let finalDueDate: Date | null = null;
      if (dueDate) {
        finalDueDate = new Date(dueDate); // Start with the selected date (at 00:00)
        if (time) {
          const [hours, minutes] = time.split(':').map(Number);
          if (!isNaN(hours) && !isNaN(minutes)) {
            finalDueDate.setHours(hours, minutes, 0, 0);
          }
        } else {
           // If date is picked but no time, default to end of day
           finalDueDate.setHours(23, 59, 59, 999);
        }
      }
      onAddTask(taskText.trim(), priority, finalDueDate);
      setTaskText('');
      setPriority('medium');
      setDueDate(null);
      setTime("");
      setMinTime(undefined);
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      // Check if selectedDate is in the past (ignoring time part for date selection)
      const startOfSelectedDay = new Date(selectedDate);
      startOfSelectedDay.setHours(0,0,0,0);
      if (startOfSelectedDay < today) {
        setDueDate(null); // Or show an error / keep previous valid date
        setTime("");
        return;
      }
      setDueDate(selectedDate);
    } else {
      // If date is cleared, also clear the time
      setDueDate(null);
      setTime("");
    }
  };

  const inputStyles = theme === 'dark' 
    ? "bg-white/10 border-white/30 text-white placeholder:text-gray-300 focus:bg-white/20 focus:border-primary/60" 
    : "bg-input border-border/60 focus:bg-background/70 focus:border-primary/60";
  
  const selectTriggerStyles = theme === 'dark'
    ? "bg-white/10 border-white/30 text-white data-[placeholder]:text-gray-300"
    : "bg-input border-border/60 data-[placeholder]:text-muted-foreground";
  
  const selectContentStyles = theme === 'dark' 
    ? "bg-slate-800/90 border-slate-700 text-slate-200 backdrop-blur-md" 
    : "";
  
  const selectItemStyles = theme === 'dark' 
    ? "hover:!bg-slate-700 focus:!bg-slate-700 data-[highlighted]:!bg-slate-700" 
    : "";

  const popoverButtonStyles = theme === 'dark'
    ? "bg-white/10 border-white/30 text-gray-300 hover:text-white"
    : "bg-input border-border/60 text-muted-foreground hover:text-foreground";

  const popoverContentStyles = theme === 'dark'
    ? "bg-gray-900/80 border-gray-700/50 text-gray-100 backdrop-blur-lg shadow-xl"
    : "";

  const calendarClassNamesDark = {
    root: "p-3",
    caption_label: "text-slate-100",
    nav_button: "text-slate-300 hover:text-slate-100 hover:bg-slate-700/50 border-slate-600",
    head_cell: "text-slate-400 font-medium w-9 text-center",
    day: "text-slate-200 hover:bg-slate-700/50 data-[selected]:!text-white data-[today]:text-accent-foreground",
    day_selected: "!bg-primary/80 !text-primary-foreground hover:!bg-primary/90 focus:!bg-primary/90",
    day_today: "!bg-accent/70 !text-accent-foreground ring-1 ring-accent/50",
    day_outside: "text-slate-500 opacity-60",
    day_disabled: "text-slate-600 opacity-50 !cursor-not-allowed",
    icon: "text-slate-300 group-hover:text-slate-100 h-4 w-4", 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4 mb-8">
      <Input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="What new task to focus on?"
        className={cn(
          "flex-grow shadow-sm h-11 rounded-lg text-sm focus:ring-1 focus:ring-ring transition-all duration-200 px-4 py-2.5",
          inputStyles
        )}
        aria-label="New task input"
      />
      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={priority} onValueChange={(value: 'high' | 'medium' | 'low') => setPriority(value)}>
          <SelectTrigger className={cn("w-full sm:w-[150px] h-11 rounded-lg text-sm", selectTriggerStyles)}>
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent className={cn(selectContentStyles)}>
            <SelectItem value="high" className={cn(selectItemStyles)}>High Priority</SelectItem>
            <SelectItem value="medium" className={cn(selectItemStyles)}>Medium Priority</SelectItem>
            <SelectItem value="low" className={cn(selectItemStyles)}>Low Priority</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full sm:w-auto flex-grow justify-start text-left font-normal h-11 rounded-lg",
                popoverButtonStyles,
                !dueDate && (theme === 'dark' ? "text-gray-400" : "text-muted-foreground")
              )}
            >
              <CalendarIcon className={cn("mr-2 h-4 w-4", theme === 'dark' ? "text-gray-300" : "")} />
              {dueDate ? format(dueDate, "PPP") : <span>Pick a due date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className={cn(
              "w-auto p-0", 
              popoverContentStyles
            )}
            align="start"
          >
            <Calendar
              mode="single"
              selected={dueDate || undefined}
              onSelect={handleDateSelect}
              disabled={(date) => date < today || date < new Date("1900-01-01")} // Disable dates before today
              initialFocus
              classNames={theme === 'dark' ? calendarClassNamesDark : undefined}
              components={theme === 'dark' ? {
                IconLeft: ({ className: iconClassName, ...props }) => <ChevronLeft className={cn(calendarClassNamesDark.icon, iconClassName)} {...props} />,
                IconRight: ({ className: iconClassName, ...props }) => <ChevronRight className={cn(calendarClassNamesDark.icon, iconClassName)} {...props} />,
              } : {
                IconLeft: ({ className, ...props }) => <ChevronLeft className={cn("h-4 w-4", className)} {...props} />,
                IconRight: ({ className, ...props }) => <ChevronRight className={cn("h-4 w-4", className)} {...props} />,
              }}
            />
          </PopoverContent>
        </Popover>
        
        {dueDate && (
           <div className={cn("relative w-full sm:w-[140px]", theme === 'dark' && "dark-time-input-container")}> {/* Increased width slightly */}
            <Clock className={cn("absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4", theme === 'dark' ? "text-gray-300" : "text-muted-foreground")} />
            <Input
              type="time"
              value={time}
              min={minTime}
              onChange={(e) => setTime(e.target.value)}
              className={cn(
                "h-11 rounded-lg pl-10 pr-6 text-sm", // Ensure pr-6 for native control space
                inputStyles
              )}
              style={theme === 'dark' ? { colorScheme: 'dark' } as React.CSSProperties : {}}
              aria-label="Due time"
            />
          </div>
        )}
      </div>
      <Button
        type="submit"
        className={cn(
          "w-full shadow-md h-11 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-98 disabled:scale-100 disabled:shadow-none px-5 text-sm font-semibold",
          theme === 'dark' 
            ? "bg-primary hover:bg-primary/80 text-primary-foreground disabled:bg-gray-500/50 disabled:text-gray-400" 
            : "bg-primary hover:bg-primary/80 text-primary-foreground disabled:bg-muted disabled:text-muted-foreground"
        )}
        aria-label="Add task"
        disabled={!taskText.trim()}
      >
        <PlusCircle className="h-4 w-4 mr-2" /> Add Task
      </Button>
    </form>
  );
};

export default AddTaskForm;

