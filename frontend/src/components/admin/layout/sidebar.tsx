import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Home, MessageSquareText, Users, GraduationCap, BookOpen, MonitorPlay  } from 'lucide-react';
import { cn } from '../../utils';
import { SidebarItem } from '../../student/layout/sidebar-item';
import images from '../../../utils/images';
import { Link } from 'react-router-dom';

interface SidebarProps {
  onCollapse?: (collapsed: boolean) => void;
}

export function Sidebar({ onCollapse }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Table of sidebar items
  const sidebarItems = [
    { icon: <Home size={20} />, label: "Dashboard", to: "/admin" },
    { icon: <BookOpen size={20} />, label: "Courses", to: "/admin/courses" },
    { icon: <GraduationCap size={20} />, label: "Students", to: "/admin/students" },
    { icon: <Users size={20} />, label: "Instructors", to: "/admin/instructors" },
    { icon: <MonitorPlay size={20} />, label: "Live Sessions", to: "/admin/live-sessions" },
    { icon: <MessageSquareText size={20} />, label: "Requests", to: "/admin/requests" },
  ];

  // Check screen size on mount and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      const isSmall = window.innerWidth < 1024; 
      setIsSmallScreen(isSmall);
      
      if (isSmall && isCollapsed) {
        setIsCollapsed(false);
        onCollapse?.(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [isCollapsed, onCollapse]);

  const toggleSidebar = () => {
    if (isSmallScreen) return;
    
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapse?.(newCollapsed);
  };

  return (
    <div 
      className={cn(
        "h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between h-24 px-4 border-b border-gray-200">
        {!isCollapsed && (
          <Link to="/">
            <img src={images.public.fgLogo} alt="Falaga School" className="w-20 h-16 ml-2" />
          </Link>
        )}
        {!isSmallScreen && (
          <button 
            onClick={toggleSidebar}
            className="rounded-full p-1 hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3">
        <nav className="space-y-1">
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.label}
              to={item.to}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>
      </div>

      <div className={cn(
        "border-t border-gray-200 p-4",
        "flex items-center",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
      </div>
    </div>
  );
}
