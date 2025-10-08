import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  AlertTriangle,
  Map,
  BarChart3,
  Bell,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield
} from 'lucide-react';

const navItems = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: LayoutDashboard, 
    path: '/dashboard',
    badge: null
  },
  { 
    id: 'issues', 
    label: 'Issues', 
    icon: AlertTriangle, 
    path: '/issues',
    badge: '23'
  },
  { 
    id: 'map', 
    label: 'Map View', 
    icon: Map, 
    path: '/map',
    badge: null
  },
  { 
    id: 'analytics', 
    label: 'Analytics', 
    icon: BarChart3, 
    path: '/analytics',
    badge: null
  },
  { 
    id: 'notifications', 
    label: 'Notifications', 
    icon: Bell, 
    path: '/notifications',
    badge: '5'
  },
  { 
    id: 'users', 
    label: 'Users', 
    icon: Users, 
    path: '/users',
    badge: null,
    adminOnly: true
  },
  { 
    id: 'settings', 
    label: 'Settings', 
    icon: Settings, 
    path: '/settings',
    badge: null
  }
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { user } = useAuth();
  const location = useLocation();

  const filteredNavItems = navItems.filter(item => 
    !item.adminOnly || user?.role === 'admin'
  );

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 }
  };

  const itemVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -10 }
  };

  return (
    <motion.aside
      initial={collapsed ? "collapsed" : "expanded"}
      animate={collapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-card border-r border-border h-full flex flex-col shadow-card"
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <motion.div
              variants={itemVariants}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2"
            >
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-sm">Civic Portal</h2>
                <p className="text-xs text-muted-foreground">Admin Dashboard</p>
              </div>
            </motion.div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="p-2 hover:bg-muted rounded-lg"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {filteredNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <NavLink key={item.id} to={item.path}>
                {({ isActive: navIsActive }) => (
                  <motion.div
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      navIsActive || isActive
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <Icon className={cn(
                      "h-5 w-5 transition-colors",
                      navIsActive || isActive ? "text-primary" : ""
                    )} />
                    
                    {!collapsed && (
                      <>
                        <motion.span
                          variants={itemVariants}
                          transition={{ delay: 0.1 }}
                          className="flex-1"
                        >
                          {item.label}
                        </motion.span>
                        
                        {item.badge && (
                          <Badge 
                            variant={navIsActive || isActive ? "default" : "secondary"}
                            className="text-xs px-2 py-0.5"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </motion.div>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className={cn(
          "flex items-center gap-3 p-3 rounded-lg bg-muted/50",
          collapsed && "justify-center"
        )}>
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-medium">
            {user?.avatar || user?.name?.charAt(0) || 'U'}
          </div>
          
          {!collapsed && (
            <motion.div
              variants={itemVariants}
              transition={{ delay: 0.1 }}
              className="flex-1 min-w-0"
            >
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {user?.role?.replace('_', ' ')}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}