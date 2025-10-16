import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Settings,
  Filter,
  Mail as MarkAsUnreadIcon,
  Archive,
  X
} from 'lucide-react';

const notifications = [
  {
    id: '1',
    type: 'urgent',
    title: 'Critical Infrastructure Issue',
    message: 'Water main break reported on 5th Avenue requires immediate attention',
    time: '2 minutes ago',
    read: false,
    icon: AlertTriangle,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10'
  },
  {
    id: '2',
    type: 'success',
    title: 'Issue Resolution Confirmed',
    message: 'Pothole repair on Main Street has been completed and verified',
    time: '15 minutes ago',
    read: false,
    icon: CheckCircle,
    color: 'text-success',
    bgColor: 'bg-success/10'
  },
  {
    id: '3',
    type: 'assignment',
    title: 'New Issue Assignment',
    message: 'Street light repair has been assigned to your department',
    time: '1 hour ago',
    read: true,
    icon: Users,
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    id: '4',
    type: 'pending',
    title: 'Pending Approval Required',
    message: 'Sanitation request needs supervisor approval before proceeding',
    time: '2 hours ago',
    read: true,
    icon: Clock,
    color: 'text-warning',
    bgColor: 'bg-warning/10'
  },
  {
    id: '5',
    type: 'urgent',
    title: 'High Priority Alert',
    message: 'Multiple reports of traffic light malfunction at Central intersection',
    time: '3 hours ago',
    read: false,
    icon: AlertTriangle,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10'
  },
  {
    id: '6',
    type: 'success',
    title: 'Citizen Feedback Received',
    message: 'Positive feedback received for recent park maintenance work',
    time: '5 hours ago',
    read: true,
    icon: CheckCircle,
    color: 'text-success',
    bgColor: 'bg-success/10'
  }
];

const alertSettings = [
  { id: 'urgent', label: 'Urgent Issues', description: 'High priority issues requiring immediate attention', enabled: true },
  { id: 'assignments', label: 'New Assignments', description: 'Issues assigned to your department', enabled: true },
  { id: 'resolutions', label: 'Issue Resolutions', description: 'Completed and verified issues', enabled: false },
  { id: 'feedback', label: 'Citizen Feedback', description: 'Reviews and comments from citizens', enabled: true },
  { id: 'deadlines', label: 'Deadline Reminders', description: 'Upcoming deadlines for pending issues', enabled: true },
  { id: 'reports', label: 'Daily Reports', description: 'Daily summary reports and statistics', enabled: false }
];

export default function Notifications() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [settings, setSettings] = useState(alertSettings);

  const filteredNotifications = notifications.filter(notification => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'unread') return !notification.read;
    if (selectedFilter === 'urgent') return notification.type === 'urgent';
    return notification.type === selectedFilter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const updateSetting = (id: string, enabled: boolean) => {
    setSettings(prev => prev.map(setting => 
      setting.id === id ? { ...setting, enabled } : setting
    ));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with real-time alerts and system notifications.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="destructive" className="text-sm">
            {unreadCount} unread
          </Badge>
          <Button variant="outline">
            <Archive className="mr-2 h-4 w-4" />
            Archive All
          </Button>
          <Button variant="outline">
            <MarkAsUnreadIcon className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
        </div>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Alert Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          {/* Filters */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'all', label: 'All', count: notifications.length },
                  { value: 'unread', label: 'Unread', count: unreadCount },
                  { value: 'urgent', label: 'Urgent', count: notifications.filter(n => n.type === 'urgent').length },
                  { value: 'assignment', label: 'Assignments', count: notifications.filter(n => n.type === 'assignment').length },
                  { value: 'success', label: 'Resolved', count: notifications.filter(n => n.type === 'success').length }
                ].map(filter => (
                  <Button
                    key={filter.value}
                    variant={selectedFilter === filter.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedFilter(filter.value)}
                    className="flex items-center gap-2"
                  >
                    {filter.label}
                    <Badge variant="secondary" className="text-xs">
                      {filter.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.map((notification, index) => {
              const Icon = notification.icon;
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`shadow-card hover:shadow-elegant transition-all duration-300 ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${notification.bgColor} shrink-0`}>
                          <Icon className={`h-5 w-5 ${notification.color}`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className={`font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {notification.title}
                            </h3>
                            <div className="flex items-center gap-2 shrink-0">
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary rounded-full" />
                              )}
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <p className={`text-sm mb-3 ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {notification.time}
                            </span>
                            
                            <div className="flex gap-2">
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${notification.color} border-current`}
                              >
                                {notification.type}
                              </Badge>
                              
                              {notification.type === 'urgent' && (
                                <Button size="sm" className="h-6 px-2 text-xs bg-destructive hover:bg-destructive/90">
                                  Take Action
                                </Button>
                              )}
                              
                              {notification.type === 'assignment' && (
                                <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                                  View Details
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {filteredNotifications.length === 0 && (
            <Card className="shadow-card">
              <CardContent className="p-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No notifications found</h3>
                <p className="text-muted-foreground">
                  No notifications match your current filter criteria.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Alert Preferences</CardTitle>
              <CardDescription>
                Customize which notifications you receive and how you want to be notified.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {settings.map((setting, index) => (
                <motion.div
                  key={setting.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="font-medium">{setting.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {setting.description}
                    </div>
                  </div>
                  <Switch
                    checked={setting.enabled}
                    onCheckedChange={(enabled) => updateSetting(setting.id, enabled)}
                  />
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>
                Choose how you want to receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { channel: 'Email', description: 'Receive notifications via email', enabled: true },
                { channel: 'SMS', description: 'Get text messages for urgent issues', enabled: false },
                { channel: 'Push Notifications', description: 'Browser push notifications', enabled: true },
                { channel: 'Desktop Alerts', description: 'System desktop notifications', enabled: false }
              ].map((channel, index) => (
                <motion.div
                  key={channel.channel}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="font-medium">{channel.channel}</div>
                    <div className="text-sm text-muted-foreground">
                      {channel.description}
                    </div>
                  </div>
                  <Switch defaultChecked={channel.enabled} />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}