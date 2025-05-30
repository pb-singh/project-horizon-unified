
import { useState, useEffect } from 'react';
import { Task, TaskList } from '@/types/task';

const STORAGE_KEY = 'tasks_app_data';

interface TasksData {
  tasks: Task[];
  lists: TaskList[];
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [lists, setLists] = useState<TaskList[]>([
    { id: 'default', name: 'My Tasks', color: '#3B82F6', taskCount: 0 },
    { id: 'work', name: 'Work', color: '#EF4444', taskCount: 0 },
    { id: 'personal', name: 'Personal', color: '#10B981', taskCount: 0 }
  ]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed: TasksData = JSON.parse(savedData);
        setTasks(parsed.tasks.map(task => ({
          ...task,
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt)
        })));
        setLists(parsed.lists);
      } catch (error) {
        console.error('Failed to parse saved tasks:', error);
      }
    }
  }, []);

  // Save to localStorage whenever tasks or lists change
  useEffect(() => {
    const dataToSave: TasksData = { tasks, lists };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    
    // Update task counts for lists
    const updatedLists = lists.map(list => ({
      ...list,
      taskCount: tasks.filter(task => task.listId === list.id || (!task.listId && list.id === 'default')).length
    }));
    setLists(updatedLists);
  }, [tasks, lists]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setTasks(prev => [...prev, newTask]);
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const getTodayTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      const dueDate = new Date(task.dueDate);
      return dueDate >= today && dueDate < tomorrow && task.status !== 'completed';
    });
  };

  const getTasksByList = (listId: string) => {
    return tasks.filter(task => 
      task.listId === listId || (!task.listId && listId === 'default')
    );
  };

  return {
    tasks,
    lists,
    addTask,
    updateTask,
    deleteTask,
    getTodayTasks,
    getTasksByList,
    setLists
  };
};
