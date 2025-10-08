import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Bell, 
  Search, 
  Settings, 
  LogOut, 
  Moon, 
  Sun,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Input } from '@/components/ui/input';

// Mock notifications data
const notifications = [
  {
    id: '1',
    type: 'urgent',
    title: 'High Priority Issue',
    message: 'Water main break reported on 5th Avenue',
    time: '2 min ago',
    icon: AlertCircle,
    color: 'text-destructive'
  },
  {
    id: '2',
    type: 'success',
    title: 'Issue Resolved',
    message: 'Pothole repair completed on Main Street',
    time: '15 min ago',
    icon: CheckCircle,
    color: 'text-success'
  },
  {
    id: '3',
    type: 'pending',
    title: 'Assignment Pending',
    message: 'Street light repair needs assignment',
    time: '1 hour ago',
    icon: Clock,
    color: 'text-warning'
  }
];

export function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search issues, locations, departments..."
              className="pl-10 bg-background/50"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="relative hover:bg-muted/50"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative hover:bg-muted/50">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-destructive">
                  {notifications.length}
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-3 border-b">
                <h3 className="font-semibold">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  You have {notifications.length} unread notifications
                </p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => {
                  const Icon = notification.icon;
                  return (
                    <DropdownMenuItem key={notification.id} className="p-3 cursor-pointer">
                      <div className="flex gap-3 w-full">
                        <Icon className={`h-5 w-5 mt-0.5 ${notification.color}`} />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  );
                })}
              </div>
              <div className="p-2 border-t">
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  View all notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-medium">
                  {user?.avatar || user?.name?.charAt(0) || 'U'}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
                <Badge variant="secondary" className="mt-1 text-xs capitalize">
                  {user?.role?.replace('_', ' ')}
                </Badge>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}