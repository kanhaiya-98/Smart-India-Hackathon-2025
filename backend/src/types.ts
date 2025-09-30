export type IssueCategory = 'infrastructure' | 'sanitation' | 'utilities' | 'safety' | 'environment';
export type IssuePriority = 'low' | 'medium' | 'high' | 'urgent';
export type IssueStatus = 'pending' | 'acknowledged' | 'in_progress' | 'resolved' | 'rejected';

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  priority: IssuePriority;
  status: IssueStatus;
  location: {
    address: string;
    coordinates: [number, number];
  };
  reporter: {
    name: string;
    email: string;
    phone: string;
  };
  assignedTo?: string;
  department?: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  feedback?: {
    rating: number;
    comment: string;
  };
}

export type UserRole = 'admin' | 'department_officer' | 'field_worker';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  avatar?: string;
  phone?: string;
  status?: 'active' | 'inactive';
  lastLogin?: string;
  issuesAssigned?: number;
  issuesResolved?: number;
}

export interface DashboardStats {
  totalIssues: number;
  pendingIssues: number;
  inProgressIssues: number;
  resolvedIssues: number;
  averageResponseTime: number;
  citizenSatisfaction: number;
}


