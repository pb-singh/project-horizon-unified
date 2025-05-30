
import { Task } from '@/types/task';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarIcon, Clock, Flag, MoreHorizontal } from 'lucide-react';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) => {
  const isCompleted = task.status === 'completed';
  const isOverdue = task.dueDate && isPast(task.dueDate) && !isCompleted;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDueDate = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM d');
  };

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md border-l-4",
      isCompleted && "opacity-60 bg-gray-50",
      isOverdue && "border-l-red-500 bg-red-50",
      task.priority === 'high' && !isOverdue && "border-l-red-400",
      task.priority === 'medium' && !isOverdue && "border-l-yellow-400",
      task.priority === 'low' && !isOverdue && "border-l-green-400"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={() => onToggleComplete(task.id)}
            className="mt-1"
          />
          
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "font-medium text-sm mb-1",
              isCompleted && "line-through text-gray-500"
            )}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {task.description}
              </p>
            )}
            
            <div className="flex items-center gap-2 flex-wrap">
              {task.dueDate && (
                <div className={cn(
                  "flex items-center gap-1 text-xs px-2 py-1 rounded-full",
                  isOverdue ? "text-red-700 bg-red-100" : "text-gray-600 bg-gray-100"
                )}>
                  <CalendarIcon className="w-3 h-3" />
                  {formatDueDate(task.dueDate)}
                </div>
              )}
              
              <Badge variant="outline" className={cn("text-xs", getPriorityColor(task.priority))}>
                <Flag className="w-3 h-3 mr-1" />
                {task.priority}
              </Badge>
              
              {task.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              
              {task.subtasks.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Checkbox className="w-3 h-3" />
                  {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}
                </div>
              )}
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(task)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
