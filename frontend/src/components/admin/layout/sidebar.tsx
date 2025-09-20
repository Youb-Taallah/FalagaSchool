import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Home, MessageSquareText, Users, GraduationCap, MonitorPlay  } from 'lucide-react';
import { cn } from '../../utils';
import { SidebarItem } from '../../student/layout/sidebar-item';
// import { getInitials } from '../utils';
import images from '../../../utils/images';
import { Link } from 'react-router-dom';

interface SidebarProps {
  onCollapse?: (collapsed: boolean) => void;
}

export function Sidebar({ onCollapse }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Check screen size on mount and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      const isSmall = window.innerWidth < 1024; // 1024px is the default lg breakpoint in Tailwind
      setIsSmallScreen(isSmall);
      
      // If screen is small, force expanded sidebar
      if (isSmall && isCollapsed) {
        setIsCollapsed(false);
        onCollapse?.(false);
      }
    };

    // Initial check
    checkScreenSize();

    // Add resize listener
    window.addEventListener('resize', checkScreenSize);
    
    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [isCollapsed, onCollapse]);

  const toggleSidebar = () => {
    // Only allow collapsing if not on a small screen
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
        <SidebarItem 
          icon={<Home size={20} />} 
          label="Dashboard"
          to="/admin" 
          isCollapsed={isCollapsed} 
        />
        <SidebarItem 
          icon={<Users size={20} />}
          label="Instructors" 
          to="/admin/instructors" 
          isCollapsed={isCollapsed} 
        />
        <SidebarItem 
          icon={<GraduationCap size={20} />}
          label="Students" 
          to="/admin/students"
          isCollapsed={isCollapsed} 
        />
        <SidebarItem 
          icon={<MonitorPlay size={20} />}
          label="Live Sessions" 
          to="/admin/live-sessions" 
          isCollapsed={isCollapsed} 
        />
        <SidebarItem 
          icon={<MessageSquareText size={20} />}
          label="Requests" 
          to="/admin/requests" 
          isCollapsed={isCollapsed} 
        />
      </nav>
      </div>

      <div className={cn(
        "border-t border-gray-200 p-4",
        "flex items-center",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        {/* <div className="flex items-center gap-2">
          <Avatar 
            src={student?.avatar} 
            initials={student?.name ? getInitials(student.name) : "??"}
            className="w-8 h-8 text-xs"
          />
          <div className={cn(
            "overflow-hidden",
            "transition-all duration-300 delay-100 ease-in-out",
            isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          )}>
            <p className="text-sm font-medium truncate">
              {student?.name || "Guest User"}
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}