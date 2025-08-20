'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  glass = false,
  padding = 'md',
  onClick,
}) => {
  const baseStyles = 'rounded-lg sm:rounded-xl shadow-sm sm:shadow-md transition-all duration-300';
  
  const paddingStyles = {
    none: '',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8'
  };

  const glassStyles = glass 
    ? 'glass border border-white/20' 
    : 'bg-white border border-gray-100';

  const hoverStyles = hover 
    ? 'hover:shadow-lg sm:hover:shadow-xl hover:scale-[1.01] sm:hover:scale-[1.02] cursor-pointer' 
    : '';

  const Component = motion.div;

  return (
    <Component
      className={cn(
        baseStyles,
        glassStyles,
        paddingStyles[padding],
        hoverStyles,
        className
      )}
      onClick={onClick}
      whileHover={hover ? { y: -2 } : undefined}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </Component>
  );
};

export default Card;
