'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Building2,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Lightbulb,
  Target,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'Companies', href: '/companies', icon: <Building2 className="h-5 w-5" /> },
  { label: 'Hiring Skill Set', href: '/hiring-skill-set', icon: <BarChart3 className="h-5 w-5" /> },
  { label: 'Hiring Process', href: '/hiring-process', icon: <Target className="h-5 w-5" /> },
  { label: 'INNOVX', href: '/innovx', icon: <Lightbulb className="h-5 w-5" /> },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const isSubRoute = navItems.some(
      (item) => pathname.startsWith(`${item.href}/`) && pathname !== item.href
    );
    if (isSubRoute) {
      setIsOpen(false);
    }
  }, [pathname]);

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } bg-gradient-to-b from-slate-50 to-white border-r border-slate-200 transition-all duration-300 sticky top-0 h-screen overflow-y-auto shadow-sm`}
    >
      <div className={`p-4 flex items-center ${isOpen ? 'justify-between' : 'justify-center'}`}>
        <img
          src="/logos/srm-logo.png"
          alt="SRM Logo"
          className={isOpen ? 'h-12 w-auto object-contain' : 'h-10 w-auto object-contain'}
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-blue-700 hover:text-blue-900 transition-colors flex-shrink-0"
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
      </div>

      <nav className="px-3 py-6">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 group ${
                  isActive ? 'bg-blue-100 text-blue-900' : 'text-slate-700 hover:bg-blue-50 hover:text-blue-900'
                }`}
              >
                <span className={`text-blue-700 ${isActive ? 'text-blue-900' : 'group-hover:text-blue-900'}`}>
                  {item.icon}
                </span>
                {isOpen && <span className="font-medium text-sm">{item.label}</span>}
              </Link>
            </li>
          );
          })}
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-200 bg-gradient-to-t from-slate-50 to-transparent">
        {isOpen && (
          <div className="text-xs text-slate-600">
            <p className="font-semibold mb-1">SRM Placements</p>
            <p>Company Intelligence Platform</p>
          </div>
        )}
      </div>
    </aside>
  );
};
