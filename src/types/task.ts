
export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in-progress' | 'completed';
  tags: string[];
  subtasks: Subtask[];
  createdAt: Date;
  updatedAt: Date;
  listId?: string;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskList {
  id: string;
  name: string;
  color: string;
  taskCount: number;
}
