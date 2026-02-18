'use client';

import React from 'react';
import { use } from 'react';
import { Layout } from '@/components';
import { getCompanyById } from '@/utils/data';
import Link from 'next/link';
import CompanyContextHeader from '@/components/CompanyDetail/CompanyContextHeader';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CompanySkillPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const company = getCompanyById(resolvedParams.id);

  if (!company) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg text-slate-600">Company not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-8 py-8 space-y-6">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Link href={`/companies/${company.id}`} className="text-blue-700 hover:underline">{company.name}</Link>
          <span>/</span>
          <span>Hiring Skill Sets</span>
        </div>

        <CompanyContextHeader company={company} active="skills" />

        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Hiring Skill Sets</h1>
          <p className="text-slate-600">Skill level matrix has been removed.</p>
        </div>
      </div>
    </Layout>
  );
}
