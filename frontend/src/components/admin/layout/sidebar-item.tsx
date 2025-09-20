import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isCollapsed?: boolean;
}

export function SidebarItem({ icon, label, to, isCollapsed = false }: SidebarItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center py-3 px-2 mb-1 rounded-lg transition-all duration-200",
        "hover:bg-gray-100",
        isActive 
          ? "bg-blue-50 text-blue-700 font-medium" 
          : "text-gray-600",
        isCollapsed && "px-2"
      )}
    >
      <span className={cn(
        "inline-flex items-center justify-center",
        isActive && "text-blue-600", 
        isCollapsed ? "w-8 h-6" : "mr-3 w-5 h-6"
      )}>
        {icon}
      </span>
      <span className={cn(
        "text-sm font-medium whitespace-nowrap",
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
      )}>
        {label}
      </span>
    </Link>
  );
}