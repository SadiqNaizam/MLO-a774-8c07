import React from 'react';
import { cn } from '@/lib/utils';
import TopHeader from '../Dashboard/TopHeader';

interface HeaderProps {
  onToggleSidebar: () => void;
  pageTitle?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  pageTitle,
  className,
}) => {
  return (
    <TopHeader
      onToggleSidebar={onToggleSidebar}
      pageTitle={pageTitle}
      className={className}
    />
  );
};

export default Header;
