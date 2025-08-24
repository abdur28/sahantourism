'use client';

import { usePathname } from 'next/navigation';
import HomeNavbar from './HomeNavbar';
import Navbar from './Navbar';

const ConditionalNavbar = () => {
  const pathname = usePathname();
  
  // Use HomeNavbar for the homepage, regular Navbar for all other pages
  if (pathname === '/') {
    return <HomeNavbar />;
  }
  
  return <Navbar />;
};

export default ConditionalNavbar;