'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CustomButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const CustomButton = ({ 
  children, 
  variant = 'primary', 
  size = 'sm', 
  onClick, 
  className = '', 
  disabled = false 
}: CustomButtonProps) => {
  
  const baseStyles = "font-bold uppercase transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-br from-yellow-400 via-blue-500 to-blue-600 hover:from-yellow-300 hover:via-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl",
    secondary: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    outline: "border-2 border-white text-white hover:bg-white hover:text-blue-600"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-xs rounded-full",
    md: "px-8 py-3 text-sm rounded-full", 
    lg: "px-10 py-4 text-base rounded-full"
  };

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {/* Shimmer effect overlay */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
      )}
      
      {/* Button content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default CustomButton;