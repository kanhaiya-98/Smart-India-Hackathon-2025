import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { API_BASE_URL } from '@/lib/utils';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Download,
  Calendar,
  Clock,
  Users,
  Target,
  Award
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area
} from 'recharts';

const monthlyData = [
  { month: 'Jan', issues: 145, resolved: 132, satisfaction: 4.5 },
  { month: 'Feb', issues: 139, resolved: 128, satisfaction: 4.6 },
  { month: 'Mar', issues: 162, resolved: 148, satisfaction: 4.4 },
  { month: 'Apr', issues: 156, resolved: 142, satisfaction: 4.7 },
  { month: 'May', issues: 148, resolved: 140, satisfaction: 4.8 },
  { month: 'Jun', issues: 156, resolved: 147, satisfaction: 4.7 }
];

const satisfactionTrend = [
  { month: 'Jan', rating: 4.5 },
  { month: 'Feb', rating: 4.6 },
  { month: 'Mar', rating: 4.4 },
  { month: 'Apr', rating: 4.7 },
  { month: 'May', rating: 4.8 },
  { month: 'Jun', rating: 4.7 }
];

// Static chart data used only for visualization; KPIs come from backend
const responseTimeData = [
  { month: 'Jan', time: 5.2 },
  { month: 'Feb', time: 4.8 },
  { month: 'Mar', time: 4.5 },
  { month: 'Apr', time: 4.2 },
  { month: 'May', time: 4.0 },
  { month: 'Jun', time: 4.2 }
];

const categoryData = [
  { category: 'Infrastructure', count: 45, color: '#2563eb' },
  { category: 'Utilities', count: 38, color: '#059669' },
  { category: 'Sanitation', count: 32, color: '#dc2626' },
  { category: 'Safety', count: 28, color: '#7c3aed' },
  { category: 'Environment', count: 13, color: '#ea580c' }
];

const departmentPerformance = [
  { department: 'Public Works', resolved: 34, pending: 8, efficiency: 81 },
  { department: 'Utilities', resolved: 28, pending: 12, efficiency: 70 },
  { department: 'Sanitation', resolved: 26, pending: 6, efficiency: 81 },
  { department: 'Safety', resolved: 22, pending: 8, efficiency: 73 },
  { department: 'Environment', resolved: 8, pending: 5, efficiency: 62 }
];

export default function Analytics() {
  const [stats, setStats] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/analytics/dashboard`);
        const data = await res.json();
        setStats(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);
  const kpiCards = [
    {
      title: 'Resolution Rate',
      value: stats ? `${Math.round((stats.resolvedIssues / Math.max(stats.totalIssues, 1)) * 100)}%` : '—',
      change: '+2.1%',
      trend: 'up',
      description: 'Issues resolved this month',
      icon: Target,
      color: 'text-success'
    },
    {
      title: 'Avg Response Time',
      value: stats ? `${stats.averageResponseTime}h` : '—',
      change: '-18min',
      trend: 'up',
      description: 'Time to first response',
      icon: Clock,
      color: 'text-primary'
    },
    {
      title: 'Citizen Satisfaction',
      value: stats ? `${stats.citizenSatisfaction}/5` : '—',
      change: '+0.2',
      trend: 'up',
      description: 'Average rating',
      icon: Award,
      color: 'text-warning'
    },
    {
      title: 'Active Officers',
      value: stats?.activeOfficers ?? '—',
      change: '+3',
      trend: 'up',
      description: 'On duty personnel',
      icon: Users,
      color: 'text-civic-blue'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into civic service performance and trends.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-card transition-all duration-300 border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <div className={`p-2 rounded-lg bg-${kpi.color.split('-')[1]}/10`}>
                  <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center gap-2 text-xs">
                  <Badge 
                    variant={kpi.trend === 'up' ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {kpi.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {kpi.change}
                  </Badge>
                  <span className="text-muted-foreground">{kpi.description}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issues Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Issues & Resolution Trend</CardTitle>
              <CardDescription>Monthly comparison of reported vs resolved issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="issues" 
                      stackId="1"
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary) / 0.3)"
                      name="Reported Issues"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="resolved" 
                      stackId="2"
                      stroke="hsl(var(--success))" 
                      fill="hsl(var(--success) / 0.3)"
                      name="Resolved Issues"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Citizen Satisfaction */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Citizen Satisfaction Trend</CardTitle>
              <CardDescription>Average satisfaction rating over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={satisfactionTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[4.0, 5.0]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="rating" 
                      stroke="hsl(var(--warning))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--warning))', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="lg:col-span-2"
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Resolution efficiency by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentPerformance.map((dept, index) => (
                  <div key={dept.department} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="font-medium">{dept.department}</div>
                        <Badge variant="outline">{dept.efficiency}% efficiency</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {dept.resolved} resolved, {dept.pending} pending
                      </div>
                    </div>
                    <Progress value={dept.efficiency} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Issue Categories</CardTitle>
              <CardDescription>Distribution by type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="count"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-2">
                {categoryData.map((category) => (
                  <div key={category.category} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      />
                      <span>{category.category}</span>
                    </div>
                    <span className="font-medium">{category.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Response Time Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Response Time Analysis</CardTitle>
            <CardDescription>Average response times by month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="time" 
                    fill="hsl(var(--civic-blue))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card className="shadow-card text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">{stats?.totalIssues ?? '—'}</div>
              <div className="text-sm text-muted-foreground">Total Issues This Month</div>
              <div className="text-xs text-success mt-1">+12% from last month</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <Card className="shadow-card text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-success mb-2">
                {stats ? Math.round((stats.resolvedIssues / Math.max(stats.totalIssues, 1)) * 100) : '—'}%
              </div>
              <div className="text-sm text-muted-foreground">Resolution Rate</div>
              <div className="text-xs text-success mt-1">Above target of 90%</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Card className="shadow-card text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-warning mb-2">{stats ? `${stats.averageResponseTime}h` : '—'}</div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
              <div className="text-xs text-success mt-1">25% improvement</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}