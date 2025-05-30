
export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  priority: 'high' | 'medium' | 'low';
  dueDate: number | null; // Store as timestamp, null if not set
}
