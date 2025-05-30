
import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { User, Edit } from 'lucide-react';

export const Topbar = () => {
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userName') || 'User';
  });
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [tempName, setTempName] = useState(userName);

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      setUserName(tempName.trim());
      localStorage.setItem('userName', tempName.trim());
      setIsEditOpen(false);
    }
  };

  const handleCancel = () => {
    setTempName(userName);
    setIsEditOpen(false);
  };

  return (
    <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-20">
      <div className="flex items-center justify-between p-4">
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-gray-900">
            {getTimeBasedGreeting()}, {userName}! 👋
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Let's make today productive
          </p>
        </div>
        
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
                  {userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Update Profile
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 pt-4">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-blue-100 text-blue-700 font-medium text-xl">
                    {tempName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input
                  id="name"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button onClick={handleSaveName} className="flex-1">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
