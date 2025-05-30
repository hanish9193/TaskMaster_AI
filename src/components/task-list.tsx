
"use client";

import type { FC } from 'react';
import TaskItem from './task-item';
import type { Task } from '@/types/task';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  theme?: 'light' | 'dark'; // To adjust child components
}

const TaskList: FC<TaskListProps> = ({ tasks, onToggleComplete, onDelete, theme = 'light' }) => {
  if (tasks.length === 0) {
    return (
        <div className={cn(
            "text-center mt-12 mb-8 p-8 border-2 border-dashed rounded-lg flex flex-col items-center space-y-4",
            theme === 'dark' 
                ? "text-gray-400 border-white/20 bg-white/5" 
                : "text-muted-foreground themed-element border-border/20 bg-background/20"
        )}>
             <Sparkles className={cn("h-12 w-12 mb-2", theme === 'dark' ? "text-gray-500" : "text-primary/40")} strokeWidth={1.5}/>
            <p className={cn("text-lg font-semibold", theme === 'dark' ? "text-gray-300" : "text-foreground/70")}>All tasks cleared!</p>
            <p className={cn("text-sm", theme === 'dark' ? "text-gray-400" : "text-muted-foreground")}>Ready to add a new goal with priority and due date?</p>
        </div>
    );
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    if (a.dueDate && b.dueDate) {
      if (a.dueDate !== b.dueDate) {
        return a.dueDate - b.dueDate;
      }
    } else if (a.dueDate) {
      return -1;
    } else if (b.dueDate) {
      return 1;
    }
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="space-y-3 mt-6">
      {sortedTasks.map((task, index) => (
        <div 
            key={task.id} 
            className="animate-blur-fade-in" 
            style={{animationDelay: `${index * 0.07}s`}}
        >
            <TaskItem
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              theme={theme} // Pass the theme to TaskItem
            />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
