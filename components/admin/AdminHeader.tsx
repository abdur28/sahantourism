'use client';

import { useState } from 'react';
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  Menu,
  Plus,
  ChevronDown,
  Globe,
  Moon,
  Sun,
  MessageSquare,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: 'booking',
    title: 'New booking received',
    message: 'Ahmed Hassan booked Mogadishu City Tour for 4 guests',
    time: '2 minutes ago',
    read: false,
    icon: Calendar,
    color: 'text-blue-600'
  },
  {
    id: 2,
    type: 'inquiry',
    title: 'New customer inquiry',
    message: 'Sarah Johnson asked about Somaliland Adventure package',
    time: '15 minutes ago',
    read: false,
    icon: MessageSquare,
    color: 'text-green-600'
  },
  {
    id: 3,
    type: 'alert',
    title: 'Payment confirmation needed',
    message: 'Booking BK-002 requires payment verification',
    time: '1 hour ago',
    read: true,
    icon: AlertCircle,
    color: 'text-orange-600'
  },
  {
    id: 4,
    type: 'success',
    title: 'Package updated successfully',
    message: 'Mogadishu Tour package has been updated with new pricing',
    time: '3 hours ago',
    read: true,
    icon: CheckCircle,
    color: 'text-green-600'
  }
];

// Mock search data
const searchData = [
  { type: 'booking', name: 'Booking BK-001', href: '/admin/bookings/1' },
  { type: 'customer', name: 'Ahmed Hassan', href: '/admin/customers/1' },
  { type: 'package', name: 'Mogadishu City Tour', href: '/admin/packages/1' },
  { type: 'destination', name: 'Somaliland', href: '/admin/destinations/1' },
];

interface AdminHeaderProps {
  className?: string;
}

export default function AdminHeader({ className }: AdminHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredSearch = searchData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'booking': return Calendar;
      case 'customer': return User;
      case 'package': return Globe;
      case 'destination': return Globe;
      default: return Search;
    }
  };

  const formatTimeAgo = (timeString: string) => {
    return timeString;
  };

  return (
    <header className={`bg-white border-b border-gray-200 px-6 py-4 ${className}`}>
      <div className="flex items-center justify-between">
              {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/admin" className="inline-flex items-center text-gray-700 hover:text-blue-600">
                Admin
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <a href="#" className="ml-1 text-gray-700 hover:text-blue-600 md:ml-2">Dashboard</a>
              </div>
            </li>
          </ol>
        </nav>
      </div>

        {/* Right side - Actions & Profile */}
        <div className="flex items-center gap-3">
          {/* Quick Add Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Quick Add</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Create New</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Calendar className="mr-2 h-4 w-4" />
                New Booking
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Globe className="mr-2 h-4 w-4" />
                Add Package
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Add Customer
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Globe className="mr-2 h-4 w-4" />
                Add Destination
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu open={notificationOpen} onOpenChange={setNotificationOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="relative p-2">
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {unreadCount} new
                  </Badge>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <DropdownMenuItem key={notification.id} className="p-3 cursor-pointer">
                      <div className="flex gap-3 w-full">
                        <div className={`p-2 rounded-lg bg-gray-50 ${notification.color}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full ml-2" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-2 mb-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            {formatTimeAgo(notification.time)}
                          </div>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  );
                })}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-sm text-blue-600 cursor-pointer">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Button variant="outline" size="sm" className="p-2">
            <Settings className="w-4 h-4" />
          </Button>

        </div>
      </div>
    </header>
  );
}