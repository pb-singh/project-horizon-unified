
import { CalendarIcon, CheckSquare, Home, List, FileText, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  todayCount: number;
}

export const BottomNavigation = ({ activeTab, onTabChange, todayCount }: BottomNavigationProps) => {
  const tabs = [
    { id: 'today', label: 'Today', icon: Home, badge: todayCount },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'lists', label: 'Lists', icon: List },
    { id: 'files', label: 'Files', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 safe-area-pb">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map(({ id, label, icon: Icon, badge }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={cn(
              "flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors relative min-w-0",
              activeTab === id 
                ? "text-blue-600 bg-blue-50" 
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {badge && badge > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {badge > 99 ? '99' : badge}
                </div>
              )}
            </div>
            <span className="text-xs font-medium truncate">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
