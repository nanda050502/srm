'use client';

import React, { useState } from 'react';
import { User, Settings, LogOut } from 'lucide-react';

export const UserAccountBadge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="fixed top-2 right-4 z-[9999]"
      style={{ position: 'fixed', top: '0.5rem', right: '1rem' }}
    >
      {/* User Badge Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center border-2 border-white"
        style={{ width: '48px', height: '48px' }}
        aria-label="User account"
      >
        <User className="h-6 w-6" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 -z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {/* User Info Section */}
            <div className="p-4 bg-gradient-to-br from-blue-50 to-slate-50 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center font-semibold text-lg">
                  JD
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 truncate">John Doe</p>
                  <p className="text-sm text-slate-600 truncate">john.doe@example.com</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  // Add account settings navigation here
                }}
                className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-blue-50 transition-colors flex items-center gap-3"
              >
                <User className="h-4 w-4 text-blue-600" />
                <span>My Account</span>
              </button>
              
              <button
                onClick={() => {
                  setIsOpen(false);
                  // Add settings navigation here
                }}
                className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-blue-50 transition-colors flex items-center gap-3"
              >
                <Settings className="h-4 w-4 text-blue-600" />
                <span>Settings</span>
              </button>

              <div className="border-t border-slate-200 my-2"></div>

              <button
                onClick={() => {
                  setIsOpen(false);
                  // Add logout logic here
                }}
                className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
