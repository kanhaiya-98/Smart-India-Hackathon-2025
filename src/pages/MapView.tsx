import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockIssues } from '@/data/mockData';
import {
  Map,
  Filter,
  Layers,
  Navigation,
  MapPin,
  AlertTriangle,
  Eye,
  EyeOff
} from 'lucide-react';

export default function MapView() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showClusters, setShowClusters] = useState(true);

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => setMapLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredIssues = mockIssues.filter(issue => {
    const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || issue.priority === selectedPriority;
    return matchesCategory && matchesPriority;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#2563eb';
      case 'low': return '#6b7280';
      default: return '#6b7280';
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
          <h1 className="text-3xl font-bold">Map View</h1>
          <p className="text-muted-foreground">
            Visualize civic issues by location with interactive mapping and heat maps.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Navigation className="mr-2 h-4 w-4" />
            My Location
          </Button>
          <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Report Issue Here
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Controls */}
        <div className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Map Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="infrastructure">🛣️ Infrastructure</SelectItem>
                    <SelectItem value="utilities">⚡ Utilities</SelectItem>
                    <SelectItem value="sanitation">🗑️ Sanitation</SelectItem>
                    <SelectItem value="safety">🚨 Safety</SelectItem>
                    <SelectItem value="environment">🌱 Environment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Priority</label>
                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="urgent">🔴 Urgent</SelectItem>
                    <SelectItem value="high">🟠 High</SelectItem>
                    <SelectItem value="medium">🔵 Medium</SelectItem>
                    <SelectItem value="low">⚪ Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Map Layers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Heat Map</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHeatmap(!showHeatmap)}
                  className={showHeatmap ? 'text-primary' : 'text-muted-foreground'}
                >
                  {showHeatmap ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Issue Clusters</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowClusters(!showClusters)}
                  className={showClusters ? 'text-primary' : 'text-muted-foreground'}
                >
                  {showClusters ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground mb-2">Showing {filteredIssues.length} issues</p>
                <div className="space-y-1">
                  {['urgent', 'high', 'medium', 'low'].map(priority => {
                    const count = filteredIssues.filter(i => i.priority === priority).length;
                    return (
                      <div key={priority} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: getPriorityColor(priority) }}
                          />
                          <span className="capitalize">{priority}</span>
                        </div>
                        <span className="text-muted-foreground">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Issue Details Panel */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Selected Issue</CardTitle>
              <CardDescription>Click on a map marker to view details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No issue selected</p>
                <p className="text-xs">Click on a marker to see issue details</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Container */}
        <div className="lg:col-span-3">
          <Card className="shadow-card h-[600px]">
            <CardContent className="p-0 h-full">
              <div className="relative h-full bg-gradient-to-br from-civic-blue/10 to-civic-green/10 rounded-lg overflow-hidden">
                {!mapLoaded ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-pulse-glow mb-4">
                        <Map className="h-16 w-16 mx-auto text-primary" />
                      </div>
                      <p className="text-lg font-medium">Loading Interactive Map...</p>
                      <p className="text-sm text-muted-foreground">Initializing mapping services</p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full relative">
                    {/* Mock Map Interface */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                      {/* Map Controls */}
                      <div className="absolute top-4 right-4 z-10 space-y-2">
                        <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
                          <Navigation className="h-4 w-4" />
                        </Button>
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 space-y-1">
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-lg">+</Button>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-lg">-</Button>
                        </div>
                      </div>

                      {/* Mock Issue Markers */}
                      <div className="absolute inset-0">
                        {filteredIssues.map((issue, index) => {
                          const x = 20 + (index * 60) % 80;
                          const y = 15 + ((index * 40) % 70);
                          
                          return (
                            <motion.div
                              key={issue.id}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="absolute cursor-pointer group"
                              style={{ left: `${x}%`, top: `${y}%` }}
                            >
                              <div 
                                className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-medium transform group-hover:scale-110 transition-transform"
                                style={{ backgroundColor: getPriorityColor(issue.priority) }}
                              >
                                {getCategoryIcon(issue.category)}
                              </div>
                              
                              {/* Tooltip */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-black/90 text-white p-2 rounded-lg text-xs whitespace-nowrap">
                                  <div className="font-medium">{issue.title}</div>
                                  <div className="text-gray-300">{issue.location.address}</div>
                                  <div className="flex gap-1 mt-1">
                                    <Badge 
                                      variant="outline" 
                                      className="text-xs px-1 py-0"
                                      style={{ borderColor: getPriorityColor(issue.priority), color: getPriorityColor(issue.priority) }}
                                    >
                                      {issue.priority}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Heatmap Overlay */}
                      {showHeatmap && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.6 }}
                          className="absolute inset-0 bg-gradient-radial from-red-500/20 via-yellow-500/10 to-transparent"
                        />
                      )}

                      {/* Map Attribution */}
                      <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
                        © Civic Portal Map Services
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Map Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Issues on Map', value: filteredIssues.length, color: 'text-primary' },
          { label: 'High Priority Areas', value: '3', color: 'text-destructive' },
          { label: 'Response Teams Active', value: '8', color: 'text-success' },
          { label: 'Average Response Time', value: '4.2h', color: 'text-civic-blue' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
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
    </div>
  );
}