import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Search,
  UserPlus,
  Filter,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Users as UsersIcon,
  MoreHorizontal,
  Edit,
  Trash2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const staticUsers = [
  {
    id: '1',
    name: 'Kanhaiya Gupta',
    email: 'kanha.gupta@civic.gov',
    phone: '9326650454',
    role: 'admin',
    department: 'Administration',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z',
    issuesAssigned: 0,
    issuesResolved: 156,
    avatar: 'SC'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    email: 'michael.rodriguez@civic.gov',
    phone: '+1-555-0102',
    role: 'department_officer',
    department: 'Public Works',
    status: 'active',
    lastLogin: '2024-01-15T09:15:00Z',
    issuesAssigned: 12,
    issuesResolved: 89,
    avatar: 'MR'
  },
  {
    id: '3',
    name: 'Alex Kumar',
    email: 'alex.kumar@civic.gov',
    phone: '+1-555-0103',
    role: 'field_worker',
    department: 'Sanitation',
    status: 'active',
    lastLogin: '2024-01-15T08:45:00Z',
    issuesAssigned: 8,
    issuesResolved: 67,
    avatar: 'AK'
  },
  {
    id: '4',
    name: 'Jessica Liu',
    email: 'jessica.liu@civic.gov',
    phone: '+1-555-0104',
    role: 'department_officer',
    department: 'Utilities',
    status: 'active',
    lastLogin: '2024-01-14T16:20:00Z',
    issuesAssigned: 15,
    issuesResolved: 72,
    avatar: 'JL'
  },
  {
    id: '5',
    name: 'David Park',
    email: 'david.park@civic.gov',
    phone: '+1-555-0105',
    role: 'field_worker',
    department: 'Infrastructure',
    status: 'inactive',
    lastLogin: '2024-01-12T14:30:00Z',
    issuesAssigned: 3,
    issuesResolved: 45,
    avatar: 'DP'
  },
  {
    id: '6',
    name: 'Emma Wilson',
    email: 'emma.wilson@civic.gov',
    phone: '+1-555-0106',
    role: 'department_officer',
    department: 'Environment',
    status: 'active',
    lastLogin: '2024-01-15T11:00:00Z',
    issuesAssigned: 6,
    issuesResolved: 38,
    avatar: 'EW'
  }
];

import { API_BASE_URL } from '@/lib/utils';

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [users, setUsers] = useState<any[]>(staticUsers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/users`);
        const data = await res.json();
        setUsers(data);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || user.department === departmentFilter;
    
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-destructive text-destructive-foreground';
      case 'department_officer': return 'bg-primary text-primary-foreground';
      case 'field_worker': return 'bg-success text-success-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'inactive': return 'bg-muted text-muted-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4" />;
      case 'department_officer': return <UsersIcon className="h-4 w-4" />;
      case 'field_worker': return <MapPin className="h-4 w-4" />;
      default: return <UsersIcon className="h-4 w-4" />;
    }
  };

  const departments = Array.from(new Set(users.map(user => user.department).filter(Boolean)));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Manage system users, roles, and permissions across all departments.
          </p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
          <UserPlus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Search & Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="department_officer">Department Officer</SelectItem>
                <SelectItem value="field_worker">Field Worker</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setRoleFilter('all');
              setStatusFilter('all');
              setDepartmentFilter('all');
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: users.length, color: 'text-primary' },
          { label: 'Active Users', value: users.filter(u => u.status === 'active').length, color: 'text-success' },
          { label: 'Admins', value: users.filter(u => u.role === 'admin').length, color: 'text-destructive' },
          { label: 'Field Workers', value: users.filter(u => u.role === 'field_worker').length, color: 'text-civic-blue' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="shadow-card">
              <CardContent className="p-4 text-center">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {loading ? 'Loading users…' : `Showing ${filteredUsers.length} of ${users.length} users`}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Sort by Name</Button>
          <Button variant="outline" size="sm">Sort by Department</Button>
        </div>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-primary text-white font-medium">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{user.name}</h3>
                        <Badge variant="outline" className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {user.phone}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Last login: {new Date(user.lastLogin).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right space-y-1">
                      <div className="flex items-center gap-2">
                        {getRoleIcon(user.role)}
                        <Badge variant="outline" className={getRoleColor(user.role)}>
                          {user.role.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {user.department}
                      </div>
                    </div>
                    
                    <div className="text-right space-y-1">
                      <div className="text-sm">
                        <span className="font-medium">{user.issuesResolved}</span> resolved
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">{user.issuesAssigned}</span> assigned
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="mr-2 h-4 w-4" />
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="p-12 text-center">
            <UsersIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No users found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters to find users.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}