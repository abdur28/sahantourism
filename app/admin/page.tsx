'use client';

import { useState } from 'react';
import { 
  Users, 
  MapPin, 
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Mock data
const dashboardStats = [
  {
    title: 'Total Bookings',
    value: '2,547',
    change: '+12.5%',
    trend: 'up',
    icon: Calendar,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Active Customers',
    value: '1,892',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    title: 'Revenue (USD)',
    value: '$147,520',
    change: '+15.8%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    title: 'Destinations',
    value: '24',
    change: '+3 new',
    trend: 'up',
    icon: MapPin,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  }
];

const recentBookings = [
  {
    id: 'BK-001',
    customer: 'Ahmed Hassan',
    email: 'ahmed@email.com',
    destination: 'Mogadishu City Tour',
    date: '2024-12-15',
    status: 'confirmed',
    amount: '$980',
    guests: 4
  },
  {
    id: 'BK-002',
    customer: 'Sarah Johnson',
    email: 'sarah@email.com',
    destination: 'Somaliland Adventure',
    date: '2024-12-18',
    status: 'pending',
    amount: '$2,300',
    guests: 2
  },
  {
    id: 'BK-003',
    customer: 'Mohamed Ali',
    email: 'mohamed@email.com',
    destination: 'Kismayo Beach Package',
    date: '2024-12-20',
    status: 'confirmed',
    amount: '$1,200',
    guests: 6
  },
  {
    id: 'BK-004',
    customer: 'Lisa Chen',
    email: 'lisa@email.com',
    destination: 'Puntland Cultural Tour',
    date: '2024-12-22',
    status: 'cancelled',
    amount: '$850',
    guests: 3
  }
];

const quickActions = [
  {
    title: 'Add New Package',
    description: 'Create a new tour package',
    icon: Plus,
    color: 'bg-blue-600',
    action: 'create-package'
  },
  {
    title: 'View Inquiries',
    description: 'Check new customer inquiries',
    icon: Eye,
    color: 'bg-green-600',
    action: 'view-inquiries'
  },
  {
    title: 'Export Reports',
    description: 'Download booking reports',
    icon: Download,
    color: 'bg-purple-600',
    action: 'export-reports'
  },
  {
    title: 'Manage Destinations',
    description: 'Add or edit destinations',
    icon: MapPin,
    color: 'bg-orange-600',
    action: 'manage-destinations'
  }
];

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { variant: 'default' as const, color: 'bg-green-100 text-green-800' },
      pending: { variant: 'secondary' as const, color: 'bg-yellow-100 text-yellow-800' },
      cancelled: { variant: 'destructive' as const, color: 'bg-red-100 text-red-800' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <Badge className={`${config.color} hover:${config.color}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredBookings = recentBookings.filter(booking => {
    const matchesSearch = booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your tourism business.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            New Booking
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => {
          const IconComponent = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <div className={`flex items-center gap-1 mt-2 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      <TrendIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">{stat.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="p-6 h-auto flex-col items-start text-left hover:bg-gray-50 border-gray-200"
                    >
                      <div className={`p-2 rounded-lg ${action.color} mb-3`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{action.title}</DialogTitle>
                    </DialogHeader>
                    <div className="py-6">
                      <p className="text-gray-600 mb-4">This feature is under development.</p>
                      <Button className="w-full">Coming Soon</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Recent Bookings
            </CardTitle>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-mono text-sm">{booking.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{booking.customer}</p>
                        <p className="text-sm text-gray-500">{booking.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{booking.destination}</TableCell>
                    <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        {booking.guests}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{booking.amount}</TableCell>
                    <TableCell>
                      {getStatusBadge(booking.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredBookings.length === 0 && (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No bookings found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'New booking received', time: '2 minutes ago', type: 'booking' },
                { action: 'Customer inquiry from website', time: '15 minutes ago', type: 'inquiry' },
                { action: 'Payment confirmed for BK-001', time: '1 hour ago', type: 'payment' },
                { action: 'New review submitted', time: '3 hours ago', type: 'review' },
                { action: 'Package updated: Mogadishu Tour', time: '5 hours ago', type: 'update' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'booking' ? 'bg-blue-500' :
                    activity.type === 'inquiry' ? 'bg-yellow-500' :
                    activity.type === 'payment' ? 'bg-green-500' :
                    activity.type === 'review' ? 'bg-purple-500' :
                    'bg-gray-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'Payment pending', message: '3 bookings awaiting payment confirmation', priority: 'high' },
                { title: 'Low inventory', message: 'Mogadishu tour slots running low', priority: 'medium' },
                { title: 'New message', message: '2 unread customer messages', priority: 'low' },
                { title: 'Review requested', message: 'Customer feedback needed for recent trip', priority: 'low' }
              ].map((notification, index) => (
                <div key={index} className={`p-3 rounded-lg border-l-4 ${
                  notification.priority === 'high' ? 'bg-red-50 border-red-500' :
                  notification.priority === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                  'bg-blue-50 border-blue-500'
                }`}>
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}