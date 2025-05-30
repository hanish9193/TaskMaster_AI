
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Task } from '@/types/task';
import AiCompanion from '@/components/ai-companion';
import TaskList from '@/components/task-list';
import AddTaskForm from '@/components/add-task-form';
import RespectMeter from '@/components/respect-meter';
import { generateTaskResponse, type GenerateTaskResponseInput } from '@/ai/flows/generate-task-response';
import { generateOnboardingMessage, type GenerateOnboardingMessageInput } from '@/ai/flows/generate-onboarding-message';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

const MAX_RESPECT = 10;
const MIN_RESPECT = 0;
const INITIAL_RESPECT = 5;

// Respect value constants
const RESPECT_PRIORITY_HIGH = 1.5;
const RESPECT_PRIORITY_MEDIUM = 1.0;
const RESPECT_PRIORITY_LOW = 0.5;
const RESPECT_DELETION_PENALTY_INCOMPLETE_NOT_OVERDUE = 0.25; // Small penalty for deleting non-overdue incomplete tasks

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [respectLevel, setRespectLevel] = useState<number>(INITIAL_RESPECT);
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(true);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>('User'); // Default user name
  const { toast } = useToast();

  const getRespectValueByPriority = useCallback((priority: 'high' | 'medium' | 'low', isPenalty: boolean): number => {
    let baseRespect: number;
    switch (priority) {
      case 'high':
        baseRespect = RESPECT_PRIORITY_HIGH;
        break;
      case 'medium':
        baseRespect = RESPECT_PRIORITY_MEDIUM;
        break;
      case 'low':
        baseRespect = RESPECT_PRIORITY_LOW;
        break;
      default:
        baseRespect = RESPECT_PRIORITY_MEDIUM;
    }
    return isPenalty ? -baseRespect : baseRespect;
  }, []);


  const fetchOnboardingMessage = useCallback(async (name: string) => {
    setIsLoadingAi(true);
    try {
      const input: GenerateOnboardingMessageInput = { userName: name };
      const result = await generateOnboardingMessage(input);
      setAiMessage(result.message);
    } catch (error) {
      console.error("Error fetching onboarding message:", error);
      setAiMessage("Hey there! Ready to tackle some tasks? Let's do this... or not, your choice I guess.");
      toast({
        title: "AI Comms Offline",
        description: "Couldn't generate onboarding message. Using default greeting!",
        variant: "destructive",
      });
    } finally {
      setIsLoadingAi(false);
    }
  }, [toast]);

  const fetchAiResponse = useCallback(async (lastTaskCompletedSuccessfully: boolean | null, currentRespect: number, currentTasks: Task[]) => {
    setIsLoadingAi(true);
    // Clamp respect level before sending to AI
    if (currentRespect < MIN_RESPECT || currentRespect > MAX_RESPECT) {
      console.warn("Respect level out of bounds for AI fetch, clamping:", currentRespect);
      currentRespect = Math.max(MIN_RESPECT, Math.min(MAX_RESPECT, currentRespect));
    }

    try {
      const totalTasks = currentTasks.length;
      const completedTasks = currentTasks.filter(task => task.completed).length;
      const taskCompletionRate = totalTasks > 0 ? completedTasks / totalTasks : 0;

      const input: GenerateTaskResponseInput = {
        respectLevel: currentRespect,
        taskCompletionRate: taskCompletionRate,
        lastTaskCompleted: lastTaskCompletedSuccessfully === null ? false : lastTaskCompletedSuccessfully,
      };
      const result = await generateTaskResponse(input);
      setAiMessage(result.response);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiMessage("Hmm, something went wrong in my circuits. Try again?");
      toast({
        title: "AI Glitch",
        description: "Couldn't generate AI response. My apologies!",
        variant: "destructive",
      });
    } finally {
      setIsLoadingAi(false);
    }
  }, [toast]);

  useEffect(() => {
    let loadedRespect = INITIAL_RESPECT;
    let loadedTasks: Task[] = [];
    let loadedUserName = 'User';
    let visitedBeforeFlag = false;

    if (typeof window !== 'undefined') {
      try {
        const savedTasks = localStorage.getItem('tasks');
        const savedRespect = localStorage.getItem('respectLevel');
        const savedUserName = localStorage.getItem('userName');
        const visited = localStorage.getItem('visitedBefore');

        if (savedTasks) {
          loadedTasks = JSON.parse(savedTasks);
        }
        if (savedRespect) {
          const respectNum = parseFloat(savedRespect);
          // Ensure loaded respect is within bounds
          if (respectNum >= MIN_RESPECT && respectNum <= MAX_RESPECT) {
            loadedRespect = respectNum;
          } else {
            // If out of bounds, reset to initial and save
            localStorage.setItem('respectLevel', String(INITIAL_RESPECT));
          }
        }
        if (savedUserName) {
          loadedUserName = savedUserName;
        }
        if (visited === 'true') {
          visitedBeforeFlag = true;
        }
      } catch (error) {
        console.error("Failed to load initial state from localStorage:", error);
        toast({
          title: "Storage ReadError",
          description: "Could not load saved data. Starting with defaults.",
          variant: "destructive",
        });
        // Clear potentially corrupted localStorage
        localStorage.removeItem('tasks');
        localStorage.removeItem('respectLevel');
        localStorage.removeItem('userName');
        localStorage.removeItem('visitedBefore');
      }
    }

    setTasks(loadedTasks);
    setRespectLevel(loadedRespect);
    setUserName(loadedUserName);

    if (!visitedBeforeFlag && typeof window !== 'undefined') {
      fetchOnboardingMessage(loadedUserName);
      localStorage.setItem('visitedBefore', 'true');
    } else if (loadedTasks.length > 0 || loadedRespect !== INITIAL_RESPECT) {
      // If not first visit but data exists, get a regular AI response
      fetchAiResponse(null, loadedRespect, loadedTasks);
    } else {
      // Fallback to onboarding if no tasks and default respect, even if visited before (e.g., after clearing data)
      fetchOnboardingMessage(loadedUserName);
    }
    setIsInitialLoading(false);
  }, [fetchOnboardingMessage, fetchAiResponse, toast]);


  useEffect(() => {
    if (isInitialLoading || typeof window === 'undefined') return;
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      localStorage.setItem('respectLevel', String(respectLevel));
      localStorage.setItem('userName', userName);
    } catch (error) {
      console.error("Failed to save state to localStorage:", error);
      toast({
        title: "Save Error",
        description: "Could not save your progress this time.",
        variant: "destructive",
      });
    }
  }, [tasks, respectLevel, userName, isInitialLoading, toast]);

  const handleAddTask = (text: string, priority: 'high' | 'medium' | 'low', dueDate: Date | null) => {
    const newTask: Task = {
      id: typeof crypto !== 'undefined' ? crypto.randomUUID() : String(Date.now()), // More robust ID generation
      text,
      completed: false,
      createdAt: Date.now(),
      priority,
      dueDate: dueDate ? dueDate.getTime() : null,
    };
    const nextTasks = [...tasks, newTask];
    setTasks(nextTasks);
    fetchAiResponse(null, respectLevel, nextTasks);
    toast({
      title: "Task Added!",
      description: `"${text}" is now on your list. Priority: ${priority}. ${dueDate ? 'Due: ' + dueDate.toLocaleDateString() : ''}`,
    });
  };

  const handleToggleComplete = useCallback((id: string) => {
    let taskJustCompleted = false;
    let respectChange = 0;
    let currentTask: Task | undefined;

    const nextTasks = tasks.map(task => {
      if (task.id === id) {
        currentTask = task;
        taskJustCompleted = !task.completed;

        if (taskJustCompleted) {
          const isOverdue = task.dueDate && task.dueDate < Date.now() && !task.completed;
          if (isOverdue) {
            respectChange = getRespectValueByPriority(task.priority, true);
            toast({ title: "Task Completed Late", description: `"${task.text}" was overdue. Respect decreased.`, variant: "destructive" });
          } else {
            respectChange = getRespectValueByPriority(task.priority, false);
            toast({ title: "Task Completed!", description: `Great job on "${task.text}"! Respect increased.` });
          }
        } else {
          respectChange = getRespectValueByPriority(task.priority, true);
          toast({ title: "Task Marked Incomplete", description: `"${task.text}" is back on the list. Respect adjusted.` });
        }
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    if (!currentTask) {
      console.warn("Task not found for toggle:", id);
      return;
    }

    const nextRespectLevel = Math.max(MIN_RESPECT, Math.min(MAX_RESPECT, respectLevel + respectChange));
    setTasks(nextTasks);
    setRespectLevel(nextRespectLevel);
    const aiFeedbackSuccess = taskJustCompleted && !(currentTask.dueDate && currentTask.dueDate < Date.now() && !currentTask.completed);
    fetchAiResponse(aiFeedbackSuccess, nextRespectLevel, nextTasks);
  }, [tasks, respectLevel, fetchAiResponse, toast, getRespectValueByPriority]);

  const handleDeleteTask = useCallback((id: string) => {
    let respectChange = 0;
    const taskToDelete = tasks.find(task => task.id === id);

    if (!taskToDelete) {
      console.warn("Task not found for delete:", id);
      return;
    }

    if (!taskToDelete.completed) {
      if (taskToDelete.dueDate && taskToDelete.dueDate < Date.now()) {
        respectChange = getRespectValueByPriority(taskToDelete.priority, true);
        toast({ title: "Overdue Task Deleted", description: `"${taskToDelete.text}" removed. Respect decreased.`, variant: "destructive"});
      } else {
        respectChange = -RESPECT_DELETION_PENALTY_INCOMPLETE_NOT_OVERDUE;
        toast({ title: "Task Deleted", description: `"${taskToDelete.text}" removed. A small respect adjustment.`});
      }
    } else {
      toast({ title: "Completed Task Deleted", description: `"${taskToDelete.text}" cleared from history.`});
    }

    const nextTasks = tasks.filter(task => task.id !== id);
    let nextRespectLevel = respectLevel;
    if (respectChange !== 0) {
        nextRespectLevel = Math.max(MIN_RESPECT, Math.min(MAX_RESPECT, respectLevel + respectChange));
    }

    setTasks(nextTasks);
    if (respectChange !== 0) {
        setRespectLevel(nextRespectLevel);
    }
    fetchAiResponse(false, nextRespectLevel, nextTasks);
  }, [tasks, respectLevel, fetchAiResponse, toast, getRespectValueByPriority]);


   if (isInitialLoading) {
    return (
      <div className="flex flex-col items-center min-h-screen p-6 md:p-10 lg:p-16 text-foreground pt-24 md:pt-28 lg:pt-32">
        <header className="w-full max-w-6xl mb-10 md:mb-16 text-center z-10">
          <Skeleton className="h-12 w-3/5 mx-auto mb-5 bg-muted/40 rounded-lg" />
          <Skeleton className="h-6 w-2/5 mx-auto bg-muted/40 rounded" />
        </header>
        <main className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 z-10">
          {/* Left Column Skeleton: Focus Zone */}
          <Card className="md:col-span-2 bg-muted/20 p-0 shadow-xl rounded-2xl"> {/* Adjusted skeleton for Focus Zone */}
            <CardHeader className="pt-8 pb-6 bg-transparent">
              <Skeleton className="h-8 w-1/2 mx-auto bg-muted/50 rounded" />
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col gap-4 items-center mb-8">
                <Skeleton className="h-12 w-full bg-muted/40 rounded-lg" />
                <div className="flex gap-3 w-full">
                    <Skeleton className="h-10 flex-grow bg-muted/40 rounded-lg" />
                    <Skeleton className="h-10 w-28 bg-muted/40 rounded-lg" />
                </div>
                <Skeleton className="h-10 w-full bg-muted/50 rounded-lg" />
              </div>
              <div className="space-y-4 mt-6">
                <Skeleton className="h-16 w-full rounded-xl bg-muted/40" />
                <Skeleton className="h-16 w-full rounded-xl bg-muted/40" />
                <Skeleton className="h-16 w-full rounded-xl bg-muted/40" />
              </div>
            </CardContent>
          </Card>

          {/* Right Column Skeletons: AI Companion and Respect Meter */}
          <div className="md:col-span-1 space-y-8">
            <Card className="themed-card p-0"> {/* AI Companion skeleton uses themed-card */}
              <CardHeader className="flex flex-row items-center space-x-4 p-6 bg-transparent">
                <Skeleton className="h-20 w-20 rounded-full bg-muted/50 flex-shrink-0" />
                <div className="flex-grow space-y-3"> <Skeleton className="h-6 w-3/4 bg-muted/50 rounded" /></div>
              </CardHeader>
              <CardContent className="p-6"><div className="min-h-[100px] p-5 themed-element rounded-xl flex items-center justify-center bg-secondary/40"><div className="space-y-3 w-full"><Skeleton className="h-5 w-full bg-muted/50 rounded" /><Skeleton className="h-5 w-4/5 bg-muted/50 rounded" /></div></div></CardContent>
            </Card>
            <Card className="themed-card p-6"> {/* Respect Meter skeleton uses themed-card */}
              <Skeleton className="h-6 w-1/2 mx-auto mb-4 bg-muted/50 rounded" />
              <div className="flex justify-between items-center mb-3"><Skeleton className="h-5 w-1/3 bg-muted/50 rounded" /><Skeleton className="h-5 w-1/4 bg-muted/50 rounded" /></div>
              <Skeleton className="h-4 w-full rounded-full bg-muted/50 mb-3" />
              <div className="flex justify-between text-xs text-muted-foreground/70 mt-3"><Skeleton className="h-4 w-1/6 bg-muted/50 rounded" /><Skeleton className="h-4 w-1/6 bg-muted/50 rounded" /><Skeleton className="h-4 w-1/6 bg-muted/50 rounded" /></div>
            </Card>
          </div>
        </main>
        <footer className="mt-24 text-center text-muted-foreground text-sm">
           <Skeleton className="h-5 w-1/3 mx-auto bg-muted/40 rounded" />
        </footer>
       </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-6 md:p-10 lg:p-16 text-foreground pt-24 md:pt-28 lg:pt-32">
      <header className="w-full max-w-6xl mb-10 md:mb-16 text-center z-10">
         <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3 animate-fade-in">TaskMaster Dashboard</h1>
         <p
            className="text-lg md:text-xl text-muted-foreground animate-fade-in"
            style={{animationDelay: '0.2s'}}
          >
            Welcome back, {userName}. Let&apos;s get things done, with priority!
         </p>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 z-10">
        {/* Left Column: Focus Zone (Tasks) - Now with Image Background */}
        <Card
            className="md:col-span-2 relative overflow-hidden rounded-2xl shadow-2xl animate-blur-fade-in h-full"
            style={{animationDelay: '0.4s'}}
        >
            <Image
                src="/focus-zone-background.jpg"
                alt="Focus zone background"
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 z-0"
                data-ai-hint="calm productive workspace"
                priority
            />
            {/* Blur overlay */}
            <div className="absolute inset-0 z-[1] bg-black/15 backdrop-blur-md"></div>
            
            {/* Content on top */}
            <div className="relative z-[2] text-white flex flex-col h-full">
                <CardHeader className="pt-6 pb-4 bg-transparent border-b border-white/20">
                    <CardTitle className="text-xl md:text-2xl font-semibold text-center text-white">Your Focus Zone</CardTitle>
                </CardHeader>
                <CardContent className="p-6 flex-grow flex flex-col">
                    <AddTaskForm onAddTask={handleAddTask} theme="dark" />
                    <TaskList tasks={tasks} onToggleComplete={handleToggleComplete} onDelete={handleDeleteTask} theme="dark" />
                </CardContent>
            </div>
        </Card>

        {/* Right Column: AI and Respect Meter */}
        <div className="md:col-span-1 space-y-8 flex flex-col">
          <AiCompanion
              message={aiMessage}
              isLoading={isLoadingAi}
              respectLevel={respectLevel}
              className="animate-blur-fade-in"
              style={{animationDelay: '0.6s'}}
          />
          <RespectMeter
              respectLevel={respectLevel}
              className="animate-blur-fade-in"
              style={{animationDelay: '0.8s'}}
          />
        </div>
      </main>

      <footer
        className="mt-20 mb-8 text-center text-muted-foreground text-sm animate-fade-in z-10"
        style={{animationDelay: '1s'}}
      >
        <p>&copy; {new Date().getFullYear()} TaskMaster AI. Mindfully productive.</p>
      </footer>
    </div>
  );
}
