// Mock data for the civic admin portal

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: 'infrastructure' | 'sanitation' | 'utilities' | 'safety' | 'environment';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'acknowledged' | 'in_progress' | 'resolved' | 'rejected';
  location: {
    address: string;
    coordinates: [number, number]; // [lat, lng]
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

export interface DashboardStats {
  totalIssues: number;
  pendingIssues: number;
  inProgressIssues: number;
  resolvedIssues: number;
  averageResponseTime: number;
  citizenSatisfaction: number;
}

// Generate mock issues
export const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Pothole on Main Street',
    description: 'Large pothole causing traffic issues and potential vehicle damage.',
    category: 'infrastructure',
    priority: 'high',
    status: 'in_progress',
    location: {
      address: '123 Main Street, Downtown',
      coordinates: [40.7128, -74.0060]
    },
    reporter: {
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1-555-0123'
    },
    assignedTo: 'Michael Rodriguez',
    department: 'Public Works',
    images: ['pothole1.jpg'],
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-01-15T10:15:00Z'
  },
  {
    id: '2',
    title: 'Broken Street Light',
    description: 'Street light on Oak Avenue is not functioning, creating safety concerns.',
    category: 'utilities',
    priority: 'medium',
    status: 'pending',
    location: {
      address: '456 Oak Avenue, Residential District',
      coordinates: [40.7589, -73.9851]
    },
    reporter: {
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1-555-0456'
    },
    department: 'Electrical Services',
    createdAt: '2024-01-15T14:20:00Z',
    updatedAt: '2024-01-15T14:20:00Z'
  },
  {
    id: '3',
    title: 'Overflowing Garbage Bin',
    description: 'Public garbage bin at Central Park entrance is overflowing.',
    category: 'sanitation',
    priority: 'medium',
    status: 'resolved',
    location: {
      address: 'Central Park Entrance, 5th Ave',
      coordinates: [40.7829, -73.9654]
    },
    reporter: {
      name: 'Mike Wilson',
      email: 'mike.w@email.com',
      phone: '+1-555-0789'
    },
    assignedTo: 'Alex Kumar',
    department: 'Sanitation',
    createdAt: '2024-01-14T09:15:00Z',
    updatedAt: '2024-01-14T16:30:00Z',
    resolvedAt: '2024-01-14T16:30:00Z',
    feedback: {
      rating: 5,
      comment: 'Quick response and thorough cleanup!'
    }
  },
  {
    id: '4',
    title: 'Water Main Break',
    description: 'Emergency: Water main break causing flooding on Elm Street.',
    category: 'utilities',
    priority: 'urgent',
    status: 'acknowledged',
    location: {
      address: '789 Elm Street, Business District',
      coordinates: [40.7505, -73.9934]
    },
    reporter: {
      name: 'Emergency Services',
      email: 'emergency@city.gov',
      phone: '+1-555-0911'
    },
    assignedTo: 'Emergency Response Team',
    department: 'Water & Sewer',
    createdAt: '2024-01-15T16:45:00Z',
    updatedAt: '2024-01-15T16:50:00Z'
  },
  {
    id: '5',
    title: 'Graffiti on Public Building',
    description: 'Graffiti vandalism on city hall exterior wall.',
    category: 'environment',
    priority: 'low',
    status: 'pending',
    location: {
      address: 'City Hall, 100 Government Plaza',
      coordinates: [40.7614, -73.9776]
    },
    reporter: {
      name: 'Building Security',
      email: 'security@cityhall.gov',
      phone: '+1-555-0200'
    },
    department: 'Maintenance',
    createdAt: '2024-01-15T11:30:00Z',
    updatedAt: '2024-01-15T11:30:00Z'
  }
];

export const dashboardStats: DashboardStats = {
  totalIssues: 156,
  pendingIssues: 23,
  inProgressIssues: 45,
  resolvedIssues: 88,
  averageResponseTime: 4.2,
  citizenSatisfaction: 4.7
};

// Analytics data for charts
export const responseTimeData = [
  { month: 'Jan', time: 5.2 },
  { month: 'Feb', time: 4.8 },
  { month: 'Mar', time: 4.5 },
  { month: 'Apr', time: 4.2 },
  { month: 'May', time: 4.0 },
  { month: 'Jun', time: 4.2 }
];

export const categoryData = [
  { category: 'Infrastructure', count: 45, color: '#2563eb' },
  { category: 'Utilities', count: 38, color: '#059669' },
  { category: 'Sanitation', count: 32, color: '#dc2626' },
  { category: 'Safety', count: 28, color: '#7c3aed' },
  { category: 'Environment', count: 13, color: '#ea580c' }
];

export const departmentPerformance = [
  { department: 'Public Works', resolved: 34, pending: 8, efficiency: 81 },
  { department: 'Utilities', resolved: 28, pending: 12, efficiency: 70 },
  { department: 'Sanitation', resolved: 26, pending: 6, efficiency: 81 },
  { department: 'Safety', resolved: 22, pending: 8, efficiency: 73 },
  { department: 'Environment', resolved: 8, pending: 5, efficiency: 62 }
];