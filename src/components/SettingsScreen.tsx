
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Moon, Palette, Bell, Shield, HelpCircle, Calendar, Mail, MessageSquare } from 'lucide-react';

export const SettingsScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [selectedAccentColor, setSelectedAccentColor] = useState('blue');

  const accentColors = [
    { name: 'blue', color: '#3B82F6', label: 'Blue' },
    { name: 'pink', color: '#EC4899', label: 'Pink' },
    { name: 'teal', color: '#14B8A6', label: 'Teal' },
    { name: 'green', color: '#10B981', label: 'Green' },
    { name: 'orange', color: '#F59E0B', label: 'Orange' }
  ];

  const connectedApps = [
    { name: 'Google Calendar', description: 'Sync tasks with calendar', connected: true, icon: Calendar },
    { name: 'Microsoft Outlook', description: 'Email & calendar events', connected: false, icon: Mail },
    { name: 'Slack', description: 'Task notifications & alerts', connected: true, icon: MessageSquare }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Theme & Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4" />
              <span>Dark Mode</span>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>

          <div>
            <h4 className="font-medium mb-3">Accent Color</h4>
            <div className="flex gap-2">
              {accentColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedAccentColor(color.name)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedAccentColor === color.name ? 'border-gray-900' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.color }}
                  title={color.label}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connected Apps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {connectedApps.map((app, index) => {
            const Icon = app.icon;
            return (
              <div key={app.name}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-gray-600" />
                    <div>
                      <h4 className="font-medium">{app.name}</h4>
                      <p className="text-sm text-gray-600">{app.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {app.connected && <Badge variant="outline">Connected</Badge>}
                    <Button variant={app.connected ? "outline" : "default"} size="sm">
                      {app.connected ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>
                </div>
                {index < connectedApps.length - 1 && <Separator className="mt-4" />}
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Push Notifications</h4>
              <p className="text-sm text-gray-600">Receive notifications for task reminders</p>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Privacy & Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            Data Export / Import
          </Button>
          <Button variant="outline" className="w-full justify-start">
            GDPR Settings
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <HelpCircle className="w-4 h-4 mr-2" />
            Help & Support
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
