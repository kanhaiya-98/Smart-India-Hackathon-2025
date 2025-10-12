import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { API_BASE_URL } from '@/lib/utils';
import {
  Search,
  Filter,
  MapPin,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  UserCheck,
  AlertTriangle
} from 'lucide-react';

export default function Issues() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newIssue, setNewIssue] = useState({
    title: '',
    description: '',
    category: 'infrastructure',
    priority: 'medium',
    reporterName: '',
    reporterEmail: '',
    reporterPhone: '',
    address: ''
  });

  const fetchIssues = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/issues`);
        const data = await res.json();
        setIssues(data);
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => { fetchIssues(); }, []);

  const createIssue = async () => {
    setIsCreating(true);
    try {
      await fetch(`${API_BASE_URL}/issues`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newIssue.title,
          description: newIssue.description,
          category: newIssue.category,
          priority: newIssue.priority,
          location: { address: newIssue.address, coordinates: [0, 0] },
          reporter: { name: newIssue.reporterName, email: newIssue.reporterEmail, phone: newIssue.reporterPhone }
        })
      });
      await fetchIssues();
      setNewIssue({ title: '', description: '', category: 'infrastructure', priority: 'medium', reporterName: '', reporterEmail: '', reporterPhone: '', address: '' });
    } finally {
      setIsCreating(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`${API_BASE_URL}/issues/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchIssues();
  };

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || issue.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || issue.priority === priorityFilter;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-civic-blue text-white';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-success text-success-foreground';
      case 'in_progress': return 'bg-civic-blue text-white';
      case 'acknowledged': return 'bg-warning text-warning-foreground';
      case 'pending': return 'bg-muted text-muted-foreground';
      case 'rejected': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'infrastructure': return '🛣️';
      case 'utilities': return '⚡';
      case 'sanitation': return '🗑️';
      case 'safety': return '🚨';
      case 'environment': return '🌱';
      default: return '📝';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Issues Management</h1>
          <p className="text-muted-foreground">
            Monitor, assign, and resolve civic issues reported by citizens.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300" onClick={createIssue} disabled={isCreating}>
            <AlertTriangle className="mr-2 h-4 w-4" />
            {isCreating ? 'Creating...' : 'New Issue'}
          </Button>
        </div>
      </div>

      {/* Quick Create Issue Form */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Create New Issue</CardTitle>
          <CardDescription>Fill details and click New Issue to submit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <Input placeholder="Title" value={newIssue.title} onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })} />
            <Input placeholder="Description" value={newIssue.description} onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })} />
            <Input placeholder="Address" value={newIssue.address} onChange={(e) => setNewIssue({ ...newIssue, address: e.target.value })} />
            <Select value={newIssue.category} onValueChange={(v) => setNewIssue({ ...newIssue, category: v })}>
              <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="sanitation">Sanitation</SelectItem>
                <SelectItem value="safety">Safety</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
              </SelectContent>
            </Select>
            <Select value={newIssue.priority} onValueChange={(v) => setNewIssue({ ...newIssue, priority: v })}>
              <SelectTrigger><SelectValue placeholder="Priority" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Reporter Name" value={newIssue.reporterName} onChange={(e) => setNewIssue({ ...newIssue, reporterName: e.target.value })} />
            <Input placeholder="Reporter Email" value={newIssue.reporterEmail} onChange={(e) => setNewIssue({ ...newIssue, reporterEmail: e.target.value })} />
            <Input placeholder="Reporter Phone" value={newIssue.reporterPhone} onChange={(e) => setNewIssue({ ...newIssue, reporterPhone: e.target.value })} />
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="sanitation">Sanitation</SelectItem>
                <SelectItem value="safety">Safety</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="acknowledged">Acknowledged</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setCategoryFilter('all');
              setStatusFilter('all');
              setPriorityFilter('all');
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {loading ? 'Loading issues…' : `Showing ${filteredIssues.length} of ${issues.length} issues`}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Sort by Priority</Button>
          <Button variant="outline" size="sm">Sort by Date</Button>
        </div>
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues.map((issue, index) => (
          <motion.div
            key={issue._id || issue.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{getCategoryIcon(issue.category)}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{issue.title}</h3>
                      <p className="text-muted-foreground mb-3">{issue.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {issue.location.address}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {new Date(issue.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {issue.reporter.name}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 items-end">
                    <div className="flex gap-2">
                      <Badge variant="outline" className={getPriorityColor(issue.priority)}>
                        {issue.priority}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(issue.status)}>
                        {issue.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    {issue.department && (
                      <Badge variant="secondary">{issue.department}</Badge>
                    )}
                  </div>
                </div>

                {/* Issue Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4 text-sm">
                    {issue.assignedTo && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <UserCheck className="h-4 w-4" />
                        Assigned to {issue.assignedTo}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{issue.reporter.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{issue.reporter.email}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {issue.status === 'pending' && (
                      <>
                        <Button size="sm" variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
                          <XCircle className="mr-1 h-4 w-4" />
                          Reject
                        </Button>
                        <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground" onClick={() => updateStatus(issue._id || issue.id, 'acknowledged')}>
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Accept
                        </Button>
                      </>
                    )}
                    {issue.status === 'acknowledged' && (
                      <Button size="sm" className="bg-civic-blue hover:bg-civic-blue/90 text-white" onClick={() => updateStatus(issue._id || issue.id, 'in_progress')}>
                        <UserCheck className="mr-1 h-4 w-4" />
                        Assign
                      </Button>
                    )}
                    {issue.status === 'in_progress' && (
                      <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground" onClick={() => updateStatus(issue._id || issue.id, 'resolved')}>
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Mark Resolved
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredIssues.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="p-12 text-center">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No issues found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters to find issues.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}