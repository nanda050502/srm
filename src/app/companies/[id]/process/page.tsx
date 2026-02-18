'use client';

import React, { useState } from 'react';
import { use } from 'react';
import Link from 'next/link';
import { Layout } from '@/components';
import { getCompanyById, getHiringRoundsData } from '@/utils/data';
import { Chip } from '@/components/UI';
import CompanyContextHeader from '@/components/CompanyDetail/CompanyContextHeader';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CompanyHiringProcessPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const company = getCompanyById(resolvedParams.id);
  const hiringData = getHiringRoundsData(company?.name);

  if (!company) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg text-slate-600">Company not found</p>
        </div>
      </Layout>
    );
  }

  const roles = hiringData ? hiringData.job_role_details : [];
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const activeRole = roles[Math.min(activeRoleIndex, Math.max(roles.length - 1, 0))];

  return (
    <Layout>
      <div className="px-8 py-8 space-y-6">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Link href={`/companies/${company.id}`} className="text-blue-700 hover:underline">{company.name}</Link>
          <span>/</span>
          <span>Hiring Process</span>
        </div>

        <CompanyContextHeader company={company} active="process" />

        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Hiring Process</h1>
          <p className="text-slate-600">Round-by-round selection flow</p>
        </div>

        {roles.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
            <p className="text-slate-600">No hiring rounds data available for this company yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <aside className="lg:col-span-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Roles</h2>
                  <p className="text-sm text-slate-600 mt-1">Pick a role to see its round timeline.</p>
                </div>

                <div className="space-y-3">
                  {roles.map((role, index) => {
                    const isActive = index === activeRoleIndex;
                    return (
                      <button
                        key={`${role.role_title}-${role.opportunity_type}`}
                        onClick={() => setActiveRoleIndex(index)}
                        className={`w-full text-left border rounded-xl p-4 transition-colors ${
                          isActive ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{role.role_title}</p>
                            <p className="text-xs text-slate-600 mt-1">{role.role_category}</p>
                          </div>
                          <Chip label={role.opportunity_type} variant={isActive ? 'primary' : 'secondary'} />
                        </div>
                        <p className="text-xs text-slate-500 mt-3">{role.hiring_rounds?.length || 0} rounds</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            <section className="lg:col-span-8 space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{activeRole?.role_title}</h2>
                    <p className="text-sm text-slate-600 mt-2">{activeRole?.job_description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeRole?.role_category && <Chip label={activeRole.role_category} variant="primary" />}
                    {activeRole?.opportunity_type && <Chip label={activeRole.opportunity_type} variant="secondary" />}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Compensation</p>
                    {(activeRole?.compensation || activeRole?.ctc_or_stipend) && (
                      <p className="text-sm font-semibold text-slate-900 mt-1">
                        {activeRole?.compensation}{activeRole?.compensation && activeRole?.ctc_or_stipend ? ' · ' : ''}{activeRole?.ctc_or_stipend}
                      </p>
                    )}
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Bonus</p>
                    {activeRole?.bonus && <p className="text-sm font-semibold text-slate-900 mt-1">{activeRole?.bonus}</p>}
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Benefits</p>
                    {activeRole?.benefits_summary && <p className="text-sm font-semibold text-slate-900 mt-1">{activeRole?.benefits_summary}</p>}
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">Round Timeline</h3>
                  <span className="text-sm text-slate-600">{activeRole?.hiring_rounds?.length || 0} rounds</span>
                </div>

                <div className="mt-6 space-y-6">
                  {activeRole?.hiring_rounds?.map((round, index) => (
                    <div key={`${activeRole?.role_title}-${round.round_number}`} className="relative pl-10">
                      <div className="absolute left-0 top-1.5 h-7 w-7 rounded-full bg-blue-600 text-white text-xs font-semibold flex items-center justify-center">
                        {round.round_number}
                      </div>
                      {index < (activeRole?.hiring_rounds?.length || 0) - 1 && (
                        <div className="absolute left-3 top-10 bottom-0 w-px bg-slate-200" />
                      )}

                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-sm font-semibold text-slate-900">{round.round_name}</span>
                          <Chip label={round.round_category} variant="primary" />
                          <Chip label={`${round.evaluation_type} · ${round.assessment_mode}`} variant="secondary" />
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          {round.skill_sets.map((skill) => (
                            <div key={`${round.round_number}-${skill.skill_set_code}`} className="bg-white border border-slate-200 rounded-lg p-4">
                              <p className="text-sm font-semibold text-slate-900">{skill.skill_set_code}</p>
                              <p className="text-xs text-slate-600 mt-2">{skill.typical_questions}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </Layout>
  );
}
