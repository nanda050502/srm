'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Brain, Target } from 'lucide-react';
import { AdminGuard } from '@/components/AdminGuard';
import { AdminLayout } from '@/components/AdminLayout';
import { getCompanyById } from '@/utils/data';
import CompanyHero from '@/components/CompanyDetail/CompanyHero';
import CompanyTabs from '@/components/CompanyDetail/CompanyTabs';
import RightSideCards from '@/components/CompanyDetail/RightSideCards';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AdminCompanyViewPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const company = getCompanyById(resolvedParams.id);
  const [activeTab, setActiveTab] = React.useState('overview');

  if (!company) {
    return (
      <AdminGuard>
        <AdminLayout>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-4">
              <p className="text-xl text-slate-600">Company not found</p>
              <Link
                href="/admin/companies"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Companies
              </Link>
            </div>
          </div>
        </AdminLayout>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <AdminLayout>
        {/* Back nav */}
        <div className="px-4 sm:px-6 lg:px-8 py-3 border-b border-slate-200 bg-white">
          <Link
            href="/admin/companies"
            className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Companies
          </Link>
        </div>

        {/* Company overview — same as student view */}
        <div className="space-y-0">
          <CompanyHero
            company={company}
            showNavigationLinks={false}
            customNavigationLinks={
              <div className="flex w-full max-w-sm flex-row items-center justify-center gap-2">
                <Link
                  href={`/admin/hiring-processes?company=${encodeURIComponent(company.name)}`}
                  className="inline-flex flex-1 min-w-0 justify-center items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-white border border-slate-300 rounded-lg text-slate-800 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-800 transition-all"
                >
                  <Target className="h-4 w-4 text-blue-600" />
                  <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Hiring Rounds</span>
                </Link>
                <Link
                  href={`/admin/skills-intelligence?company=${encodeURIComponent(company.name)}`}
                  className="inline-flex flex-1 min-w-0 justify-center items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-white border border-slate-300 rounded-lg text-slate-800 hover:bg-purple-50 hover:border-purple-400 hover:text-purple-800 transition-all"
                >
                  <Brain className="h-4 w-4 text-purple-600" />
                  <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Hiring Skills</span>
                </Link>
              </div>
            }
          />

          <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">
            <div className="min-w-0">
              <CompanyTabs company={company} activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
            <div>
              <RightSideCards company={company} />
            </div>
          </div>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
