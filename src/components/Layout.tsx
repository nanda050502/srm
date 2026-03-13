import React from 'react';
import Image from 'next/image';
import { Sidebar } from './Sidebar';
import { UserAccountBadge } from './UserAccountBadge';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 shadow-sm z-[9998] flex items-center justify-center px-20">
        <Image
          src="/logos/srm-logo.png"
          alt="SRM Logo"
          width={120}
          height={40}
          className="h-10 w-auto object-contain"
          priority
        />
      </div>
      
      <Sidebar />
      <main className="flex-1 overflow-auto w-full pt-16 lg:pt-0">
        {children}
      </main>
      <UserAccountBadge />
    </div>
  );
};
