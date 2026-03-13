'use client';

import React from 'react';
import { FileUp, Link2, Plus } from 'lucide-react';
import { AdminGuard } from '@/components/AdminGuard';
import { AdminLayout } from '@/components/AdminLayout';

const resources = [
  { id: 'r1', title: 'Aptitude Preparation Handbook', type: 'PDF', category: 'Aptitude', link: '/resources/aptitude.pdf' },
  { id: 'r2', title: 'Top Coding Practice Sheet', type: 'Link', category: 'Coding', link: 'https://leetcode.com' },
  { id: 'r3', title: 'Behavioral Interview Tips', type: 'PDF', category: 'Interview', link: '/resources/interview-tips.pdf' },
  { id: 'r4', title: 'System Design Starter Kit', type: 'Link', category: 'Skill Learning', link: 'https://roadmap.sh/system-design' },
];

export default function AdminResourcesPage() {
  return (
    <AdminGuard>
      <AdminLayout>
        <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Content & Resource Management</h1>
              <p className="text-sm sm:text-base text-slate-600">Maintain preparation assets including PDFs, coding links, and interview guidance.</p>
            </div>
            <button
              onClick={() => alert('Add Resource form coming soon!')}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Resource
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {resources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{resource.title}</h3>
                    <p className="text-xs text-slate-600">{resource.category}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">{resource.type}</span>
                </div>
                <p className="text-sm text-slate-700 break-all">{resource.link}</p>
                <div className="mt-auto pt-4 flex gap-2">
                  <button onClick={() => alert(`Upload file for: ${resource.title}`)} className="px-3 py-2 bg-slate-100 rounded-lg text-sm hover:bg-slate-200 inline-flex items-center gap-1.5">
                    <FileUp className="h-4 w-4" />
                    Upload
                  </button>
                  <button onClick={() => alert(`Update link for: ${resource.title}`)} className="px-3 py-2 bg-slate-100 rounded-lg text-sm hover:bg-slate-200 inline-flex items-center gap-1.5">
                    <Link2 className="h-4 w-4" />
                    Update Link
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
