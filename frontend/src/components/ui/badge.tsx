import React from 'react';
import { cn } from '../utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'default',
  className,
}: BadgeProps) {
  const variants = {
    default: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-transparent',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-transparent',
    outline: 'bg-transparent text-gray-700 border-gray-200 hover:bg-gray-50',
    success: 'bg-green-100 text-green-800 hover:bg-green-200 border-transparent',
    warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-transparent',
    danger: 'bg-red-100 text-red-800 hover:bg-red-200 border-transparent',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    default: 'text-xs px-2.5 py-0.5',
    lg: 'text-sm px-3 py-1',
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border transition-colors",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}