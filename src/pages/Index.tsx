
import { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { TaskCard } from '@/components/TaskCard';
import { CreateTaskDialog } from '@/components/CreateTaskDialog';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CalendarIcon, Plus, Search, CheckCircle2, Clock, Flag } from 'lucide-react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isToday, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';

const Index = () => {
  const { tasks, lists, addTask, updateTask, deleteTask, getTodayTasks, getTasksByList } = useTasks();
  const [activeTab, setActiveTab] = useState('today');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const todayTasks = getTodayTasks();
  const completedThisWeek = tasks.filter(task => 
    task.status === 'completed' && 
    task.updatedAt >= startOfWeek(new Date()) && 
    task.updatedAt <= endOfWeek(new Date())
  ).length;

  const handleToggleComplete = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      updateTask(id, { 
        status: task.status === 'completed' ? 'todo' : 'completed' 
      });
    }
  };

  const handleEditTask = (task: any) => {
    console.log('Edit task:', task);
    // TODO: Implement edit dialog
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCalendarWeek = () => {
    const start = startOfWeek(selectedDate);
    const end = endOfWeek(selectedDate);
    return eachDayOfInterval({ start, end });
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => 
      task.dueDate && isSameDay(task.dueDate, date)
    );
  };

  const renderTodayView = () => (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-gray-600">
          You have {todayTasks.length} tasks due today
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{completedThisWeek}</div>
            <div className="text-sm text-gray-600">Completed this week</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">
              {tasks.filter(t => t.status !== 'completed').length}
            </div>
            <div className="text-sm text-gray-600">Pending tasks</div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Today's Tasks</h2>
        {todayTasks.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-400 mb-4">🎉</div>
              <p className="text-gray-600">No tasks due today. Great job!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {todayTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}
      </div>

      <CreateTaskDialog onCreateTask={addTask} lists={lists} />
    </div>
  );

  const renderTasksView = () => (
    <div className="space-y-4">
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 pb-4">
        <h1 className="text-xl font-bold mb-4">All Tasks</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">
                {searchQuery ? 'No tasks found matching your search.' : 'No tasks yet. Create your first task!'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEditTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>

      <div className="sticky bottom-20 right-4 float-right">
        <CreateTaskDialog 
          onCreateTask={addTask} 
          lists={lists}
          trigger={
            <Button size="lg" className="rounded-full shadow-lg">
              <Plus className="w-6 h-6" />
            </Button>
          }
        />
      </div>
    </div>
  );

  const renderCalendarView = () => (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Calendar</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            {format(selectedDate, 'MMMM yyyy')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {getCalendarWeek().map(date => {
              const dayTasks = getTasksForDate(date);
              return (
                <button
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(date)}
                  className={cn(
                    "p-2 rounded-lg text-sm transition-colors relative",
                    isToday(date) && "bg-blue-100 text-blue-700 font-semibold",
                    isSameDay(date, selectedDate) && "ring-2 ring-blue-500",
                    !isToday(date) && "hover:bg-gray-100"
                  )}
                >
                  {format(date, 'd')}
                  {dayTasks.length > 0 && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-semibold mb-3">
          Tasks for {format(selectedDate, 'MMM d, yyyy')}
        </h3>
        {getTasksForDate(selectedDate).length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-600">No tasks scheduled for this date</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {getTasksForDate(selectedDate).map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderListsView = () => (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Lists</h1>
      
      <div className="space-y-3">
        {lists.map(list => (
          <Card key={list.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: list.color }}
                  />
                  <div>
                    <h3 className="font-medium">{list.name}</h3>
                    <p className="text-sm text-gray-600">
                      {getTasksByList(list.id).length} tasks
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">
                  {getTasksByList(list.id).filter(t => t.status !== 'completed').length} active
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Create New List
      </Button>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'today': return renderTodayView();
      case 'tasks': return renderTasksView();
      case 'calendar': return renderCalendarView();
      case 'lists': return renderListsView();
      default: return renderTodayView();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto p-4">
        {renderContent()}
      </div>
      
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        todayCount={todayTasks.length}
      />
    </div>
  );
};

export default Index;
