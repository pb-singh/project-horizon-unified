
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Plus, UserPlus, AtSign } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

interface TeamMembersProps {
  taskId?: string;
}

export const TeamMembers = ({ taskId }: TeamMembersProps) => {
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const teamMembers: TeamMember[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: '2', name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Member' },
    { id: '3', name: 'Mike Chen', email: 'mike@example.com', role: 'Member' }
  ];

  const handleInvite = () => {
    if (inviteEmail.trim()) {
      console.log('Inviting:', inviteEmail);
      setInviteEmail('');
      setShowInvite(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Team Members</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowInvite(!showInvite)}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Invite
        </Button>
      </div>

      {showInvite && (
        <div className="flex gap-2">
          <Input
            placeholder="Enter email address..."
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleInvite} size="sm">
            Send
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {teamMembers.map((member) => (
          <div key={member.id} className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback>
                {member.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-medium text-sm">{member.name}</div>
              <div className="text-xs text-gray-600">{member.email}</div>
            </div>
            <Badge variant="secondary" className="text-xs">
              {member.role}
            </Badge>
          </div>
        ))}
      </div>

      <div className="flex -space-x-2">
        {teamMembers.slice(0, 3).map((member) => (
          <Avatar key={member.id} className="w-8 h-8 border-2 border-white">
            <AvatarFallback className="text-xs">
              {member.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        ))}
        {teamMembers.length > 3 && (
          <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
            <span className="text-xs text-gray-600">+{teamMembers.length - 3}</span>
          </div>
        )}
      </div>
    </div>
  );
};
