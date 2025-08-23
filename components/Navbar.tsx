
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Twitter, Youtube } from 'lucide-react';
import CustomButton from './CustomButton';
import Image from 'next/image';

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

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: 'home', href: '#home' },
    { name: 'about us', href: '#about' },
    { name: 'destination', href: '#destination' },
    { name: 'packages', href: '#packages' },
    { name: 'gallery', href: '#gallery' },
    { name: 'blogs', href: '#blogs' },
    { name: 'contact us', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Youtube, href: '#' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50">
        {/* Header Top - Hidden when scrolled on desktop, shown when scrolled on mobile */}
        <motion.div 
          className={`w-full border-b border-white/10 py-4 transition-all duration-300 ${
            isScrolled 
              ? 'lg:opacity-0 lg:-translate-y-full lg:pointer-events-none bg-white lg:bg-transparent opacity-100 translate-y-0 shadow-lg lg:shadow-none' 
              : 'opacity-100 translate-y-0 bg-transparent'
          }`}
          initial={false}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-3 items-center">
              {/* Left: Helpline Box */}
              <div className="justify-self-start">
                <Link 
                  href="tel:+01123456790" 
                  className={`flex items-center gap-3 hover:scale-105 transition-all duration-300 group ${
                    isScrolled ? 'text-slate-700 lg:text-white' : 'text-white'
                  }`}
                >
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <CustomPhoneIcon 
                    className="w-5 h-5 text-white font-bold uppercase transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed " 
                    />
                  </motion.div>
                  <div className="hidden lg:block">
                    <p className={`text-sm font-medium ${
                      isScrolled ? 'text-slate-600 lg:text-white/90' : 'text-white/90'
                    }`}>Need Help?</p>
                    <p className="text-sm font-bold">+01 (123) 4567 90</p>
                  </div>
                </Link>
              </div>

              {/* Center: Logo */}
              <div className="justify-self-center">
                <Link href="/" className="block group">
                  <motion.div 
                    className="flex flex-row items-center gap-2"
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image src="/logo.png" alt="Logo" width={100} height={100} className='w-18 h-18 object-contain' />
                    <div className='md:flex flex-col hidden'>
                        <span className="text-2xl font-bold font-montserrat text-white">
                        SAHAN
                        </span>
                        <span className="text-white/90 font-montserrat">Tourism Somalia</span>
                    </div>

                  </motion.div>
                </Link>
              </div>

              {/* Right: Search & Menu Buttons */}
              <div className="justify-self-end flex items-center gap-3">
                <motion.button 
                  className={`hover:scale-110 transition-all duration-300 p-3 rounded-xl group hidden md:block ${
                    isScrolled ? 'text-slate-700 lg:text-white hover:bg-slate-100 lg:hover:bg-white/20' : 'text-white hover:bg-white/20'
                  }`}
                  whileHover={{ rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Search"
                >
                  <CustomSearchIcon className="w-5 h-5" />
                </motion.button>
                
                <motion.button 
                  className={`hover:scale-110 transition-all duration-300 p-3 rounded-xl lg:hidden ${
                    isScrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/20'
                  }`}
                  onClick={toggleMenu}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Open Menu"
                >
                  <CustomMenuIcon className="w-6 h-6" isOpen={isMenuOpen} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Header Bottom - Moves up when scrolled on desktop, hidden on mobile when scrolled */}
        <motion.div 
          className={`w-full border-b border-white/10 transition-all duration-300 ${
            isScrolled 
              ? 'hidden lg:block lg:bg-white lg:shadow-xl lg:text-slate-800 lg:-mt-20' 
              : 'block bg-transparent text-white'
          }`}
          initial={false}
        >
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Left: Social Links */}
              <div className="hidden lg:flex items-center gap-2">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <Link
                      key={index}
                      href={social.href}
                      className={`p-2 border rounded-full transition-all duration-300 ${
                        isScrolled 
                          ? 'border-slate-300 text-slate-600 hover:bg-slate-100' 
                          : 'border-white/30 text-white hover:bg-white/20'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </Link>
                  );
                })}
              </div>
              {/* Center: Desktop Navigation */}
              <nav className="hidden lg:block">
                <ul className="flex items-center">
                  {navLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className={`px-5 py-5 text-sm font-bold uppercase transition-all duration-300 hover:scale-105 relative group ${
                          isScrolled ? 'text-slate-700 hover:text-blue-600' : 'text-white hover:text-blue-300'
                        }`}
                      >
                        {link.name}
                        <motion.div
                          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 group-hover:w-full transition-all duration-300"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Right: Book Now Button */}
              <CustomButton>Book Now</CustomButton>

              {/* Mobile Social Links - Only show when not scrolled */}
              {!isScrolled && (
                <div className="flex lg:hidden items-center gap-2 ml-4">
                  {socialLinks.slice(0, 2).map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <Link
                      key={index}
                      href={social.href}
                      className={`p-2 border rounded-full transition-all duration-300 ${
                        isScrolled 
                          ? 'border-slate-300 text-slate-600 hover:bg-slate-100' 
                          : 'border-white/30 text-white hover:bg-white/20'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </motion.div>
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
                        className="flex items-center px-6 py-4 text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 capitalize font-semibold text-base group"
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;