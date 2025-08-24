'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Calendar,
  MapPin,
  Users,
  MessageSquare,
  FileText,
  Settings,
  BarChart3,
  Camera,
  DollarSign,
  Bell,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const menuItems = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    ]
  },
  {
    title: 'Bookings',
    items: [
      { name: 'All Bookings', href: '/admin/bookings', icon: Calendar, badge: '12' },
      { name: 'Payments', href: '/admin/payments', icon: DollarSign },
    ]
  },
  {
    title: 'Content',
    items: [
      { name: 'Destinations', href: '/admin/destinations', icon: MapPin },
      { name: 'Packages', href: '/admin/packages', icon: FileText },
      { name: 'Gallery', href: '/admin/gallery', icon: Camera },
    ]
  },
  {
    title: 'Management',
    items: [
      { name: 'Customers', href: '/admin/customers', icon: Users },
      { name: 'Promotions', href: '/admin/promotions', icon: Bell },
      { name: 'Settings', href: '/admin/settings', icon: Settings },
    ]
  }
];

interface AdminSidebarProps {
  className?: string;
}

export default function AdminSidebar({ className }: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`bg-white border-r border-gray-200 flex flex-col shadow-sm ${className}`}
    >

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6">
        <div className="px-3 space-y-8">
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {!isCollapsed && (
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-3 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {section.title}
                </motion.h3>
              )}
              
              <ul className="space-y-1">
                {section.items.map((item, itemIndex) => {
                  const IconComponent = item.icon;
                  const active = isActive(item.href);
                  
                  return (
                    <li key={itemIndex}>
                      <Link
                        href={item.href}
                        className={`
                          group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                          ${active 
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                          }
                        `}
                      >
                        <IconComponent className={`
                          flex-shrink-0 w-5 h-5 transition-colors duration-200
                          ${active ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-600'}
                        `} />
                        
                        <AnimatePresence mode="wait">
                          {!isCollapsed && (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{ duration: 0.2 }}
                              className="ml-3 flex items-center justify-between flex-1"
                            >
                              <span>{item.name}</span>
                              {item.badge && (
                                <Badge 
                                  variant="secondary" 
                                  className="ml-auto bg-blue-100 text-blue-800 text-xs"
                                >
                                  {item.badge}
                                </Badge>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        {/* Tooltip for collapsed state */}
                        {isCollapsed && (
                          <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap">
                            {item.name}
                            {item.badge && (
                              <span className="ml-2 bg-blue-500 px-1.5 py-0.5 rounded-full text-xs">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-3 border-t border-gray-200">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} p-3 rounded-lg bg-gray-50`}>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@sahantourism.com</p>
              </motion.div>
            )}
          </AnimatePresence>
    
        </div>
      </div>
    </motion.aside>
  );
}