'use client';

import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { Layout } from '@/components';
import { getCompaniesShort } from '@/utils/data';
import { Chip } from '@/components/UI';

export default function HiringRoundsPage() {
  const companies = getCompaniesShort();
  const [selectedCompany, setSelectedCompany] = useState<string>(companies[0]?.id);

  const mockHiringRounds = {
    comp_001: [
      {
        role: 'Software Engineer - Backend',
        compensation: '$150k-$200k + equity',
        rounds: ['Phone Screen', 'Technical Interview', 'System Design', 'Behavioral', 'Team Match'],
        mode: 'Full-time / On-site',
        focusAreas: ['System Design', 'Scalability', 'Python', 'Cloud'],
      },
      {
        role: 'Product Manager',
        compensation: '$180k-$250k + bonus',
        rounds: ['Phone Screen', 'Case Study', 'Behavioral', 'Executive Round'],
        mode: 'Full-time / Hybrid',
        focusAreas: ['Analytics', 'User Research', 'Strategy', 'Leadership'],
      },
      {
        role: 'Data Scientist',
        compensation: '$160k-$220k + equity',
        rounds: ['Phone Screen', 'Statistics Test', 'Coding Challenge', 'ML Interview', 'Team Round'],
        mode: 'Full-time / Hybrid',
        focusAreas: ['Machine Learning', 'Python', 'SQL', 'Statistics'],
      },
    ],
    comp_002: [
      {
        role: 'Cloud Solutions Architect',
        compensation: '$170k-$230k + equity',
        rounds: ['Phone Screen', 'Technical Interview', 'Architecture Design', 'Behavioral'],
        mode: 'Full-time / Hybrid',
        focusAreas: ['Azure', 'System Architecture', 'Cloud Security', 'DevOps'],
      },
      {
        role: 'Security Engineer',
        compensation: '$155k-$215k + equity',
        rounds: ['Phone Screen', 'Security Assessment', 'Coding', 'Behavioral'],
        mode: 'Full-time / On-site',
        focusAreas: ['Cybersecurity', 'Network Security', 'Compliance', 'Penetration Testing'],
      },
    ],
    comp_003: [
      {
        role: 'Fulfillment and Logistics Manager',
        compensation: '$80k-$120k + benefits',
        rounds: ['Phone Screen', 'Behavioral', 'Operations Deep Dive'],
        mode: 'Full-time / Hybrid',
        focusAreas: ['Logistics', 'Operations', 'Analytics', 'Leadership'],
      },
      {
        role: 'Software Development Engineer III',
        compensation: '$180k-$250k + equity',
        rounds: ['Phone Screen', 'Technical 1', 'Technical 2', 'System Design', 'Behavioral'],
        mode: 'Full-time / Hybrid',
        focusAreas: ['Java', 'System Design', 'Data Structures', 'Leadership Principles'],
      },
    ],
  };

  const currentCompany = companies.find((c) => c.id === selectedCompany);
  const hiringRounds: any[] = (mockHiringRounds as any)[selectedCompany] || [];

  return (
    <Layout>
      <div className="space-y-8 px-8 py-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Hiring Rounds</h1>
          <p className="text-slate-600">Understand recruitment processes and prepare effectively</p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {/* Company Selector */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 h-fit sticky top-24">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Select Company</h2>
            <div className="space-y-2">
              {companies.map((company) => (
                <button
                  key={company.id}
                  onClick={() => setSelectedCompany(company.id)}
                  className={`w-full text-left px-3 py-3 rounded-lg transition-all border ${
                    selectedCompany === company.id
                      ? 'bg-blue-100 border-blue-300 text-blue-900'
                      : 'border-slate-200 text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <p className="font-medium text-sm">{company.short_name}</p>
                  <p className="text-xs text-slate-600">{company.category}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Hiring Rounds Details */}
          <div className="col-span-3 space-y-6">
            {currentCompany && (
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{currentCompany.name}</h2>
                <p className="text-slate-700">{hiringRounds.length} active hiring roles</p>
              </div>
            )}

            {hiringRounds.length > 0 ? (
              <div className="space-y-4">
                {hiringRounds.map((round, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-6 border-b border-slate-200">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{round.role}</h3>
                      <div className="flex items-center gap-4 flex-wrap">
                        <div>
                          <p className="text-xs text-slate-600">Compensation</p>
                          <p className="text-lg font-bold text-green-600">{round.compensation}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600">Mode</p>
                          <p className="font-semibold text-slate-900">{round.mode}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Hiring Rounds */}
                      <div>
                        <h4 className="font-bold text-slate-900 mb-3">Interview Process</h4>
                        <div className="flex flex-wrap gap-2">
                          {round.rounds.map((r: string, i: number) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-900 rounded-full border border-blue-300"
                            >
                              <span className="text-sm font-semibold">
                                {i + 1}
                              </span>
                              <span className="text-sm">{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Focus Areas */}
                      <div>
                        <h4 className="font-bold text-slate-900 mb-3">Key Focus Areas</h4>
                        <div className="flex flex-wrap gap-2">
                          {round.focusAreas.map((area: string) => (
                            <Chip key={area} label={area} variant="primary" />
                          ))}
                        </div>
                      </div>

                      {/* Preparation Tips */}
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-sm font-semibold text-green-900 mb-2 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4" />
                          Preparation Tips:
                        </p>
                        <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                          <li>Master the fundamental concepts in focus areas</li>
                          <li>Practice solving problems in rounds progression order</li>
                          <li>Review company's recent products and tech stack</li>
                          <li>Prepare stories demonstrating required skills</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
                <p className="text-lg text-slate-600">No hiring rounds data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
