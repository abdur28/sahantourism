'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Calendar, Users } from 'lucide-react';

// Shadcn UI components
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import CustomButton from '../CustomButton';

const CustomPhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
    <circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.8">
      <animate attributeName="r" values="1;3;1" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite"/>
    </circle>
  </svg>
);

const CustomSearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" strokeDasharray="3 3">
      <animateTransform 
        attributeName="transform" 
        type="rotate" 
        values="0 11 11;360 11 11" 
        dur="8s" 
        repeatCount="indefinite"
      />
    </circle>
    <path d="M21 21l-4.35-4.35"/>
    <circle cx="11" cy="11" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
  </svg>
);

const CustomMenuIcon = ({ className, isOpen }: { className?: string; isOpen: boolean }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <motion.path
      d="M4 6h16"
      animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.3 }}
    />
    <motion.path
      d="M4 12h16"
      animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
    <motion.path
      d="M4 18h16"
      animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.3 }}
    />
  </svg>
);

const CustomCloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <motion.path
      d="M18 6L6 18"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.3 }}
    />
    <motion.path
      d="M6 6l12 12"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    />
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
  </svg>
);

// Mock search data
const searchData = {
  destinations: [
    { name: 'Mogadishu', country: 'Somalia', image: '/destinations/mogadishu.jpg' },
    { name: 'Hargeisa', country: 'Somalia', image: '/destinations/hargeisa.jpg' },
    { name: 'Berbera', country: 'Somalia', image: '/destinations/berbera.jpg' },
    { name: 'Kismayo', country: 'Somalia', image: '/destinations/kismayo.jpg' },
  ],
  packages: [
    { name: 'Somali Coast Adventure', duration: '7 Days', price: '$899' },
    { name: 'Historical Somalia Tour', duration: '5 Days', price: '$649' },
    { name: 'Cultural Experience Package', duration: '10 Days', price: '$1299' },
  ],
  quickLinks: [
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
    { name: 'Gallery', href: '#gallery' },
  ]
};

const SearchComponent = ({ isMobile = false }: { isMobile?: boolean }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filteredDestinations = searchData.destinations.filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPackages = searchData.packages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredQuickLinks = searchData.quickLinks.filter(link =>
    link.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasResults = filteredDestinations.length > 0 || filteredPackages.length > 0 || filteredQuickLinks.length > 0;

  if (isMobile) {
    return (
      <div className="px-6 py-4 border-b border-slate-200">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search destinations, packages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-3 text-base border-2 border-slate-200 focus:border-blue-500 rounded-xl"
          />
          <CustomSearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 text-slate-400" />
        </div>
        
        {/* Mobile Search Results */}
        {searchQuery && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 bg-white rounded-xl border border-slate-200 shadow-lg max-h-64 overflow-y-auto"
          >
            {!hasResults ? (
              <div className="p-4 text-center text-slate-500">
                {`No results found for "${searchQuery}"`}
              </div>
            ) : (
              <div className="py-2">
                {filteredDestinations.length > 0 && (
                  <div className="px-3 py-2">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Destinations</h4>
                    {filteredDestinations.map((dest, index) => (
                      <Link key={index} href="#" className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <div>
                          <p className="font-medium text-slate-800">{dest.name}</p>
                          <p className="text-xs text-slate-500">{dest.country}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                
                {filteredPackages.length > 0 && (
                  <div className="px-3 py-2 border-t border-slate-100">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Packages</h4>
                    {filteredPackages.map((pkg, index) => (
                      <Link key={index} href="#" className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg">
                        <Calendar className="w-4 h-4 text-green-500" />
                        <div className="flex-1">
                          <p className="font-medium text-slate-800">{pkg.name}</p>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span>{pkg.duration}</span>
                            <span>•</span>
                            <span className="font-semibold text-green-600">{pkg.price}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <DropdownMenu open={isSearchOpen} onOpenChange={setIsSearchOpen}>
      <DropdownMenuTrigger asChild>
        <motion.button 
          className="hover:scale-110 transition-all duration-300 p-3 rounded-xl text-slate-700 hover:bg-slate-100"
          whileHover={{ rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Search"
        >
          <CustomSearchIcon className="w-5 h-5" />
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-96 p-0 border-0 shadow-2xl bg-white/95 backdrop-blur-xl"
        sideOffset={5}
      >
        <Command className="border-0">
          <CommandInput 
            placeholder="Search destinations, packages..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="border-0 border-b border-slate-200 rounded-none px-4 py-3"
          />
          <CommandList className="max-h-80">
            <CommandEmpty>No results found.</CommandEmpty>
            
            {filteredDestinations.length > 0 && (
              <CommandGroup heading="Destinations" className="px-2 py-3">
                {filteredDestinations.map((dest, index) => (
                  <CommandItem 
                    key={index} 
                    className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg cursor-pointer"
                    onSelect={() => setIsSearchOpen(false)}
                  >
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <div>
                      <p className="font-medium text-slate-800">{dest.name}</p>
                      <p className="text-sm text-slate-500">{dest.country}</p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            
            {filteredPackages.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <CommandGroup heading="Tour Packages" className="px-2 py-3">
                  {filteredPackages.map((pkg, index) => (
                    <CommandItem 
                      key={index} 
                      className="flex items-center gap-3 p-3 hover:bg-green-50 rounded-lg cursor-pointer"
                      onSelect={() => setIsSearchOpen(false)}
                    >
                      <Calendar className="w-4 h-4 text-green-500" />
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">{pkg.name}</p>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Users className="w-3 h-3" />
                          <span>{pkg.duration}</span>
                          <span>•</span>
                          <span className="font-semibold text-green-600">{pkg.price}</span>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
            
            {filteredQuickLinks.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <CommandGroup heading="Quick Links" className="px-2 py-3">
                  {filteredQuickLinks.map((link, index) => (
                    <CommandItem 
                      key={index}
                      onSelect={() => setIsSearchOpen(false)}
                    >
                      <Link 
                        href={link.href} 
                        className="flex items-center gap-3 p-3 w-full hover:bg-purple-50 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        <p className="font-medium text-slate-800">{link.name}</p>
                      </Link>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'home', href: '/' },
    { name: 'about us', href: '/about' },
    { name: 'destination', href: '/destinations' },
    { name: 'packages', href: '/packages' },
    { name: 'gallery', href: '/gallery' },
    { name: 'blogs', href: '/blogs' },
    { name: 'contact us', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            
            {/* Mobile/Tablet: Helpline - Logo - Menu */}
            <div className="flex lg:hidden items-center justify-between w-full">
              {/* Left: Helpline Box */}
              <Link 
                href="tel:+01123456790" 
                className="flex items-center gap-3 hover:scale-105 transition-all duration-300 group text-slate-700"
              >
                <motion.div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-xl flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <CustomPhoneIcon className="w-4 h-4 text-white" />
                </motion.div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-slate-600">Need Help?</p>
                  <p className="text-xs font-bold">+01 (123) 4567 90</p>
                </div>
              </Link>

              {/* Center: Logo */}
              <Link href="/" className="block group">
                <motion.div 
                  className="flex flex-row justify-center items-center gap-2"
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image src="/logo.png" alt="Logo" width={100} height={100} className='w-14 h-14  object-contain' />
                  <div className='hidden sm:flex flex-col'>
                    <span className="text-lg font-bold font-montserrat text-gray-900">
                      SAHAN
                    </span>
                    <span className="text-gray-700 text-xs font-montserrat">Tourism Somalia</span>
                  </div>
                </motion.div>
              </Link>

              {/* Right: Menu Button */}
              <motion.button 
                className="hover:scale-110 transition-all duration-300 p-3 rounded-xl text-slate-700 hover:bg-slate-100"
                onClick={toggleMenu}
                whileTap={{ scale: 0.9 }}
                aria-label="Open Menu"
              >
                <CustomMenuIcon className="w-6 h-6" isOpen={isMenuOpen} />
              </motion.button>
            </div>

            {/* Desktop: Logo - Navigation - (Search + Button) */}
            <div className="hidden lg:flex items-center justify-between w-full">
              {/* Left: Logo */}
              <Link href="/" className="block group">
                <motion.div 
                  className="flex flex-row justify-center items-center gap-2"
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image src="/logo.png" alt="Logo" width={100} height={100} className='w-12 h-12 object-contain' />
                  <div className='flex flex-col'>
                    <span className="text-base font-bold font-montserrat text-gray-900">
                      SAHAN
                    </span>
                    <span className="text-gray-700 text-xs font-montserrat">Tourism Somalia</span>
                  </div>
                </motion.div>
              </Link>

              {/* Center: Navigation */}
              <nav className="flex items-center">
                <ul className="flex items-center space-x-1">
                  {navLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className={`px-4 py-2 text-xs font-bold uppercase transition-all duration-300 hover:scale-105 relative group rounded-lg ${
                          isActive(link.href) 
                            ? 'text-blue-600 bg-blue-50' 
                            : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                        }`}
                      >
                        {link.name}
                        <motion.div
                          className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 group-hover:w-full transition-all duration-300"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Right: Search + Button */}
              <div className="flex items-center gap-3">
                <SearchComponent />
                <CustomButton>Book Now</CustomButton>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-gradient-to-br from-slate-900 to-slate-800 z-40 lg:hidden"
              onClick={closeMenu}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ 
                type: 'spring',
                stiffness: 300,
                damping: 30
              }}
              className="fixed top-0 right-0 w-full max-w-sm h-full bg-gradient-to-b from-white to-slate-50 z-50 overflow-y-auto lg:hidden shadow-2xl"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b-2 border-blue-100">
                <motion.div 
                  className="text-transparent bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text font-black text-xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                >
                  SAHAN
                </motion.div>
                <motion.button
                  onClick={closeMenu}
                  className="text-slate-600 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-xl"
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close Menu"
                >
                  <CustomCloseIcon className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Mobile Search */}
              <SearchComponent isMobile={true} />

              {/* Mobile Menu Links */}
              <nav className="py-6">
                <ul>
                  {navLinks.map((link, index) => (
                    <motion.li 
                      key={index} 
                      className="border-b border-slate-100"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className={`flex items-center px-6 py-4 transition-all duration-300 capitalize font-semibold text-base group ${
                          isActive(link.href)
                            ? 'text-blue-600 bg-blue-50 border-r-4 border-blue-600'
                            : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        <motion.div
                          className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity"
                          whileHover={{ scale: 1.5 }}
                        />
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Mobile Book Button */}
              <div className="p-6 border-t border-slate-200">
                <CustomButton className="w-full">Book Now</CustomButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;