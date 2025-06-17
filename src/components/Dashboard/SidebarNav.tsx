import React from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  FileText,
  Receipt,
  ShoppingCart,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  active?: boolean;
  isFooter?: boolean;
}

const navItemsData: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, href: '#', active: true },
  { id: 'leads', label: 'Leads', icon: Users, href: '#' },
  { id: 'customers', label: 'Customers', icon: Users, href: '#' },
  { id: 'proposals', label: 'Proposals', icon: FileText, href: '#' },
  { id: 'invoices', label: 'Invoices', icon: Receipt, href: '#' },
  { id: 'items', label: 'Items', icon: ShoppingCart, href: '#' },
  { id: 'mail', label: 'Mail', icon: Mail, href: '#' },
  { id: 'shoebox', label: 'Shoebox', icon: Archive, href: '#' },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays, href: '#' },
];

const footerNavItemsData: NavItem[] = [
  { id: 'help1', label: 'Help', icon: HelpCircle, href: '#', isFooter: true },
  { id: 'settings', label: 'Settings', icon: Settings, href: '#', isFooter: true },
  { id: 'help2', label: 'Help', icon: HelpCircle, href: '#', isFooter: true }, // Assuming this is distinct, or should be Support
];

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const renderNavItem = (item: NavItem) => {
    const IconComponent = item.icon;
    return (
      <li key={item.id}>
        <Button
          variant="ghost"
          asChild
          className={cn(
            'w-full justify-start text-sm font-medium',
            item.active
              ? 'bg-primary/10 text-primary hover:bg-primary/20'
              : 'text-sidebar-foreground hover:bg-muted/50 hover:text-foreground',
            item.isFooter ? 'text-muted-foreground hover:text-foreground' : ''
          )}
        >
          <a href={item.href}>
            <IconComponent className="mr-3 h-5 w-5" />
            {item.label}
          </a>
        </Button>
      </li>
    );
  };

  return (
    <nav className={cn('flex h-full flex-col bg-sidebar text-sidebar-foreground', className)}>
      <div className="p-4">
        {/* Placeholder for Logo, matching image Bo icon */} 
        <div className="flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-foreground text-background flex items-center justify-center rounded-full font-bold text-lg">
                BO
            </div>
            {/* <span className="font-semibold text-xl text-foreground">Logo</span> */}
        </div>
      </div>
      <ul className="flex-grow space-y-1 px-4">
        {navItemsData.map(renderNavItem)}
      </ul>
      <div className="mt-auto p-4 space-y-1 border-t border-sidebar-border">
        <ul>
            {footerNavItemsData.map(renderNavItem)}
        </ul>
      </div>
    </nav>
  );
};

export default SidebarNav;
