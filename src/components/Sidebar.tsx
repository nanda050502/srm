import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  Building2,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Lightbulb,
  Target,
  Sparkles,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'Companies', href: '/companies', icon: <Building2 className="h-5 w-5" /> },
  { label: 'Skill Set Analytics', href: '/analytics', icon: <BarChart3 className="h-5 w-5" /> },
  { label: 'Hiring Rounds', href: '/hiring-rounds', icon: <Target className="h-5 w-5" /> },
  { label: 'InnovX', href: '/innovx', icon: <Sparkles className="h-5 w-5" /> },
  { label: 'Insights', href: '/insights', icon: <Lightbulb className="h-5 w-5" /> },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Menu Button - Classic Burger */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-2 left-4 z-[9999] w-12 h-12 rounded-lg bg-white border-2 border-slate-200 hover:bg-slate-50 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center gap-1.5"
        aria-label="Toggle menu"
      >
        <span
          className={`block h-0.5 w-6 bg-blue-700 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-blue-700 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-blue-700 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          ${isOpen ? 'w-64' : 'w-20'} 
          bg-gradient-to-b from-slate-50 to-white border-r border-slate-200 
          transition-all duration-300 overflow-y-auto shadow-sm
          
          /* Mobile: Slide-in overlay */
          fixed lg:sticky top-0 h-screen z-40
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className={`p-4 flex items-center ${isOpen ? 'justify-between' : 'justify-center'}`}>
          <img
            src="/logos/srm-logo.png"
            alt="SRM Logo"
            className={`${isOpen ? 'h-10 sm:h-12' : 'h-8 sm:h-10'} w-auto object-contain`}
          />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden lg:block text-blue-700 hover:text-blue-900 transition-colors flex-shrink-0"
            aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        </div>

        <nav className="px-3 py-6">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200 group touch-manipulation"
                >
                  <span className="text-blue-700 group-hover:text-blue-900">{item.icon}</span>
                  {isOpen && <span className="font-medium text-sm">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 border-t border-slate-200 bg-gradient-to-t from-slate-50 to-transparent">
          {isOpen && (
            <div className="text-xs text-slate-600">
              <p className="font-semibold mb-1">SRM Placements</p>
              <p>Company Intelligence Platform</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
