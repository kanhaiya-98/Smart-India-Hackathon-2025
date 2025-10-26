import { Issue, DashboardStats, User } from './types';

export const issues: Issue[] = [
  {
    id: '1',
    title: 'Pothole on Main Street',
    description: 'Large pothole causing traffic issues and potential vehicle damage.',
    category: 'infrastructure',
    priority: 'high',
    status: 'in_progress',
    location: { address: '123 Main Street, Downtown', coordinates: [40.7128, -74.006] },
    reporter: { name: 'John Smith', email: 'john.smith@email.com', phone: '+1-555-0123' },
    assignedTo: 'Michael Rodriguez',
    department: 'Public Works',
    images: ['pothole1.jpg'],
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-01-15T10:15:00Z'
  }
];

export const users: User[] = [
  { id: '1', name: 'Kanhaiya Gupta', email: 'kanha.gupta@civic.gov', phone: '9326650454', role: 'admin', department: 'Administration', status: 'active', lastLogin: '2024-01-15T10:30:00Z', issuesAssigned: 0, issuesResolved: 156, avatar: 'SC' },
  { id: '2', name: 'Michael Rodriguez', email: 'michael.rodriguez@civic.gov', phone: '+1-555-0102', role: 'department_officer', department: 'Public Works', status: 'active', lastLogin: '2024-01-15T09:15:00Z', issuesAssigned: 12, issuesResolved: 89, avatar: 'MR' }
];

export const dashboardStats: DashboardStats = {
  totalIssues: 156,
  pendingIssues: 23,
  inProgressIssues: 45,
  resolvedIssues: 88,
  averageResponseTime: 4.2,
  citizenSatisfaction: 4.7
};


