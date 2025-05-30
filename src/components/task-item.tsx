
"use client";

import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Zap, AlertTriangle, CalendarClock, Flag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Task } from '@/types/task';
import { format, formatDistanceToNowStrict } from 'date-fns';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  theme?: 'light' | 'dark'; // To adjust for contrasting backgrounds
}

const TaskItem: FC<TaskItemProps> = ({ task, onToggleComplete, onDelete, theme = 'light' }) => {
  const isOverdue = !task.completed && task.dueDate && task.dueDate < Date.now();

  const getPriorityBadgeInfo = (priority: 'high' | 'medium' | 'low') => {
    if (theme === 'dark') {
      switch (priority) {
        case 'high': return { variantClass: "bg-red-500/70 border-red-400/50 text-white", text: "High" };
        case 'medium': return { variantClass: "bg-blue-500/70 border-blue-400/50 text-white", text: "Medium" };
        case 'low': return { variantClass: "bg-gray-500/70 border-gray-400/50 text-white", text: "Low" };
        default: return { variantClass: "bg-gray-600/70 border-gray-500/50 text-white", text: "Medium" };
      }
    }
    // Light theme badge variants
    switch (priority) {
      case 'high': return { variantClass: "bg-destructive text-destructive-foreground border-destructive/50", text: "High" };
      case 'medium': return { variantClass: "bg-secondary text-secondary-foreground border-border", text: "Medium" };
      case 'low': return { variantClass: "bg-muted text-muted-foreground border-border", text: "Low" };
      default: return { variantClass: "bg-muted text-muted-foreground border-border", text: "Medium" };
    }
  };
  
  const priorityInfo = getPriorityBadgeInfo(task.priority);

  const baseTextColor = theme === 'dark' ? 'text-white' : 'text-foreground';
  const mutedTextColor = theme === 'dark' ? 'text-gray-300' : 'text-muted-foreground';
  const completedTextColor = theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground/80';
  const overdueColor = theme === 'dark' ? 'text-red-400' : 'text-destructive';

  const taskItemBaseClass = theme === 'dark'
    ? "bg-white/5 backdrop-filter backdrop-blur-sm border-white/10 hover:bg-white/10"
    : "bg-card/80 themed-element border-transparent hover:border-primary/20 hover:bg-secondary/50"; // themed-element provides light theme glassmorphism

  return (
    <div className={cn(
      "flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-out group min-h-[64px]",
      taskItemBaseClass,
      task.completed && (theme === 'dark' ? 'opacity-60 hover:opacity-70' : 'opacity-70 hover:opacity-80'),
      isOverdue && !task.completed && (theme === 'dark' ? 'border-red-500/40 bg-red-900/20' : 'border-destructive/30 bg-destructive/5')
    )}>
      <div className="flex items-start space-x-3.5 flex-grow mr-3 overflow-hidden w-full sm:w-auto mb-2 sm:mb-0">
         <Checkbox
            id={`task-${task.id}`}
            checked={task.completed}
            onCheckedChange={() => onToggleComplete(task.id)}
            className={cn(
              "h-5 w-5 rounded border-2 transition-all duration-200 flex-shrink-0 transform hover:scale-110 mt-1",
              theme === 'dark' 
                ? (task.completed ? 'border-gray-400 bg-gray-500/80 data-[state=checked]:text-black' : 'border-gray-500 hover:border-gray-300 data-[state=checked]:bg-gray-300 data-[state=checked]:border-gray-300 data-[state=checked]:text-black')
                : (task.completed ? 'border-primary/70 bg-primary/70 data-[state=checked]:text-primary-foreground' : 'border-muted-foreground/30 hover:border-primary/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary')
            )}
            aria-label={`Mark task ${task.completed ? 'incomplete' : 'complete'}`}
          />
        <div className="flex-grow">
          <label
            htmlFor={`task-${task.id}`}
            className={cn(
              "text-sm font-medium cursor-pointer flex-grow break-words transition-colors duration-200 block",
              task.completed
                ? `line-through ${completedTextColor}`
                : `${baseTextColor} group-hover:text-primary/90` // primary/90 might need theme adjustment
            )}
          >
            {task.text}
          </label>
          <div className={cn("flex items-center gap-2 mt-1.5 text-xs", mutedTextColor)}>
            <Badge variant="outline" className={cn("px-1.5 py-0.5 text-xs border", priorityInfo.variantClass)}>
              <Flag className="h-3 w-3 mr-1" />
              {priorityInfo.text}
            </Badge>
            {task.dueDate && (
              <span className={cn("flex items-center", isOverdue && !task.completed && `${overdueColor} font-medium`)}>
                <CalendarClock className="h-3 w-3 mr-1" />
                Due: {format(new Date(task.dueDate), "MMM d, HH:mm")}
                {isOverdue && !task.completed && " (Overdue)"}
                {!isOverdue && !task.completed && ` (${formatDistanceToNowStrict(new Date(task.dueDate), { addSuffix: true })})`}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-1.5 shrink-0 ml-auto sm:ml-0 self-end sm:self-center">
        {task.completed && <Zap className={cn("h-4 w-4 animate-pulse", theme === 'dark' ? 'text-yellow-400/70' : 'text-accent/70')} />}
        {isOverdue && <AlertTriangle className={cn("h-4 w-4 animate-pulse", overdueColor)} />}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(task.id)}
          className={cn(
            "rounded-full transition-all duration-200 transform group-hover:scale-105 group-hover:opacity-100 md:opacity-0 focus:opacity-100 focus:scale-105 w-8 h-8",
            theme === 'dark' ? 'text-gray-400 hover:text-red-400 hover:bg-red-500/20' : 'text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10'
          )}
          aria-label="Delete task"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;
