'use client';

import React from 'react';
import { CheckCheck, Database, ShieldCheck } from 'lucide-react';
import { AdminGuard } from '@/components/AdminGuard';
import { AdminLayout } from '@/components/AdminLayout';

export default function AdminSettingsPage() {
  return (
    <AdminGuard>
      <AdminLayout>
        <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Data Verification & Settings</h1>
            <p className="text-sm sm:text-base text-slate-600">Verify company data, maintain hiring process quality, and control module governance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-blue-700" />
                Verification Queue
              </h2>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2"><CheckCheck className="h-4 w-4 mt-0.5 text-emerald-600" /> Mark profile data as verified after manual review.</li>
                <li className="flex items-start gap-2"><CheckCheck className="h-4 w-4 mt-0.5 text-emerald-600" /> Flag outdated hiring processes for update requests.</li>
                <li className="flex items-start gap-2"><CheckCheck className="h-4 w-4 mt-0.5 text-emerald-600" /> Enforce mandatory fields for company and drive entries.</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-700" />
                Data Integrity Controls
              </h2>
              <div className="space-y-3 text-sm text-slate-700">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  Auto-flag duplicate company entries
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  Require admin approval for interview experiences
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  Weekly data quality audit reminders
                </label>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
