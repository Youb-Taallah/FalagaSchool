import React, { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { cn } from '../../utils';
import { Menu } from 'lucide-react'; // Import Menu icon for the toggle button

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const handleSidebarCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-30 lg:relative transition-transform duration-200 ease-in-out",
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        <Sidebar onCollapse={handleSidebarCollapse} />
      </aside>

      {/* Main content */}
      <main className={cn(
        "flex-1 overflow-y-auto bg-gray-50",
        isCollapsed ? "lg:pl-20" : "lg:pl-6"
      )}>
        {/* Mobile sidebar toggle button */}
        <div className="sticky top-0 z-10 lg:hidden">
          <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Open sidebar"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}