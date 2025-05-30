
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, CheckCircle, UserPlus, Edit } from 'lucide-react';

interface ActivityItem {
  id: string;
  user: string;
  action: 'completed' | 'commented' | 'assigned' | 'edited';
  target: string;
  timestamp: string;
  comment?: string;
}

export const ActivityFeed = () => {
  const activities: ActivityItem[] = [
    {
      id: '1',
      user: 'Mike Chen',
      action: 'completed',
      target: 'Draft press release',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      user: 'Sarah Wilson',
      action: 'commented',
      target: 'Website redesign',
      timestamp: '4 hours ago',
      comment: 'Looking great! Just need to adjust the color scheme.'
    },
    {
      id: '3',
      user: 'John Doe',
      action: 'assigned',
      target: 'Budget review',
      timestamp: '1 day ago'
    },
    {
      id: '4',
      user: 'Sarah Wilson',
      action: 'edited',
      target: 'Project timeline',
      timestamp: '2 days ago'
    }
  ];

  const getActivityIcon = (action: string) => {
    switch (action) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'commented':
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case 'assigned':
        return <UserPlus className="w-4 h-4 text-purple-500" />;
      case 'edited':
        return <Edit className="w-4 h-4 text-orange-500" />;
      default:
        return <MessageCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActionText = (activity: ActivityItem) => {
    switch (activity.action) {
      case 'completed':
        return `completed "${activity.target}"`;
      case 'commented':
        return `commented on "${activity.target}"`;
      case 'assigned':
        return `was assigned to "${activity.target}"`;
      case 'edited':
        return `edited "${activity.target}"`;
      default:
        return activity.target;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Recent Activity</h3>
      
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="text-xs">
                {activity.user.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                {getActivityIcon(activity.action)}
                <span className="text-sm">
                  <span className="font-medium">{activity.user}</span>{' '}
                  {getActionText(activity)}
                </span>
              </div>
              
              {activity.comment && (
                <div className="text-sm text-gray-600 bg-gray-50 rounded p-2">
                  "{activity.comment}"
                </div>
              )}
              
              <div className="text-xs text-gray-500">{activity.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
