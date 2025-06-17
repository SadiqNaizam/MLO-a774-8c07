import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Header from './Header';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface MainAppLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, pageTitle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen bg-background text-foreground antialiased">
      {/* Desktop Static Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col md:z-20">
        {/* SidebarNav has its own bg-sidebar and border. This div is structural. */}
        <Sidebar className="border-r border-border" />
      </div>

      {/* Mobile Overlay & Drawer Sidebar */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/50"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
      <div
        className={cn(
          "md:hidden fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-sidebar text-sidebar-foreground transition-transform duration-300 ease-in-out transform",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          {/* Mobile menu title or small logo could go here */}
          <span className="text-lg font-semibold text-sidebar-primary">Menu</span>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-sidebar-foreground hover:text-sidebar-primary">
            <X className="h-6 w-6" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <Sidebar />
        </div>
      </div>

      {/* Main Content Pane */}
      <div className="flex flex-1 flex-col md:pl-64">
        {/* Header: Fixed, h-16 (4rem). TopHeader handles md:left-64 itself */}
        <Header onToggleSidebar={toggleSidebar} pageTitle={pageTitle} />
        
        {/* Scrollable Content Area */}
        {/* Top padding accounts for fixed header height (4rem) */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto" style={{ paddingTop: '4rem' }}>
          {/* Inner padding for the content area */}
          <div className="p-6">
            {/* Container for the page's primary grid layout as per requirements */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
