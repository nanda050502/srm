'use client';

import React, { useState, useMemo } from 'react';
import { Lightbulb, Search } from 'lucide-react';
import { Layout } from '@/components';
import { getCompaniesShort } from '@/utils/data';
import { Button, Chip, Input } from '@/components/UI';
import { BLOOM_LEVELS } from '@/utils/data';

export default function AnalyticsPage() {
  const companies = getCompaniesShort();
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCompanies = useMemo(() => {
    if (!searchQuery) return companies;
    const lower = searchQuery.toLowerCase();
    return companies.filter(
      (c) =>
        c.name.toLowerCase().includes(lower) ||
        c.short_name.toLowerCase().includes(lower)
    );
  }, [companies, searchQuery]);

  const toggleCompany = (id: string) => {
    if (selectedCompanies.includes(id)) {
      setSelectedCompanies(selectedCompanies.filter((c) => c !== id));
    } else if (selectedCompanies.length < 5) {
      setSelectedCompanies([...selectedCompanies, id]);
    }
  };

  const getSelectedCompanyNames = () => {
    return selectedCompanies
      .map((id) => companies.find((c) => c.id === id)?.name)
      .filter((name): name is string => Boolean(name));
  };

  return (
    <Layout>
      <div className="space-y-8 px-8 py-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Skill Set Analytics</h1>
          <p className="text-slate-600">Compare skill requirements across multiple companies</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left: Company Selection */}
          <div className="col-span-1 bg-white rounded-xl border border-slate-200 p-6 h-fit sticky top-24">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Select Companies</h2>
            <p className="text-sm text-slate-600 mb-4">Choose up to 5 companies to compare</p>

            <div className="mb-4">
              <Input
                icon={<Search className="h-4 w-4" />}
                type="text"
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredCompanies.map((company) => (
                <button
                  key={company.id}
                  onClick={() => toggleCompany(company.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                    selectedCompanies.includes(company.id)
                      ? 'bg-blue-100 border border-blue-300 text-blue-900'
                      : 'border border-slate-200 text-slate-900 hover:bg-slate-50'
                  } ${selectedCompanies.length === 5 && !selectedCompanies.includes(company.id)
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                  }`}
                  disabled={selectedCompanies.length === 5 && !selectedCompanies.includes(company.id)}
                >
                  <p className="font-medium text-sm">{company.name}</p>
                  <p className="text-xs text-slate-600">{company.category}</p>
                </button>
              ))}
            </div>

            {selectedCompanies.length > 0 && (
              <button
                onClick={() => setSelectedCompanies([])}
                className="w-full mt-4 px-4 py-2 bg-slate-200 text-slate-900 rounded-lg font-medium hover:bg-slate-300 transition-colors text-sm"
              >
                Clear Selection
              </button>
            )}
          </div>

          {/* Right: Comparison Matrix */}
          <div className="col-span-2 space-y-6">
            {selectedCompanies.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <p className="text-lg text-slate-600 mb-4">Select companies to view skill comparison</p>
                <p className="text-sm text-slate-500">Choose 1-5 companies to compare their skill requirements across Bloom's Taxonomy levels</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Skills Matrix */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                          <th className="px-4 py-3 text-left font-semibold text-slate-900 w-32">Skill / Bloom</th>
                          {getSelectedCompanyNames().map((name) => (
                            <th key={name} className="px-4 py-3 text-left font-semibold text-slate-900 min-w-48">
                              <div className="truncate">{name}</div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {BLOOM_LEVELS.map((bloom) => (
                          <tr key={bloom} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 font-semibold text-slate-900 bg-slate-50">{bloom}</td>
                            {getSelectedCompanyNames().map((companyName) => (
                              <td key={companyName} className="px-4 py-3">
                                <SkillCell bloom={bloom} companyName={companyName} />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Legend */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-blue-900 mb-3">Understanding Bloom's Levels:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs font-bold text-blue-900">CU</p>
                      <p className="text-xs text-blue-800">Conceptual Understanding</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-blue-900">AP</p>
                      <p className="text-xs text-blue-800">Application</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-blue-900">AN</p>
                      <p className="text-xs text-blue-800">Analysis</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-blue-900">EV</p>
                      <p className="text-xs text-blue-800">Evaluation</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs font-bold text-blue-900">CR</p>
                      <p className="text-xs text-blue-800">Creation - Highest mastery level</p>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-green-900 mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Tip:
                  </p>
                  <p className="text-sm text-green-800">
                    Focus on skills where you can demonstrate higher Bloom levels to stand out. Companies value candidates who can apply knowledge creatively and evaluate complex problems.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

interface SkillCellProps {
  bloom: string;
  companyName: string;
}

const SkillCell: React.FC<SkillCellProps> = ({ bloom, companyName }) => {
  // Mock data - in a real app, this would come from the database
  const mockLevel = Math.floor(Math.random() * 10) + 1;
  const getColors = (level: number) => {
    if (level >= 8) return 'bg-green-100 text-green-900 border-green-300';
    if (level >= 6) return 'bg-blue-100 text-blue-900 border-blue-300';
    if (level >= 4) return 'bg-yellow-100 text-yellow-900 border-yellow-300';
    return 'bg-orange-100 text-orange-900 border-orange-300';
  };

  return (
    <div className={`border rounded-lg p-2 text-center ${getColors(mockLevel)}`}>
      <div className="font-bold text-sm">{bloom} | Lvl {mockLevel}</div>
      <div className="text-xs font-medium">
        {mockLevel >= 8 ? 'Expert' : mockLevel >= 6 ? 'Advanced' : mockLevel >= 4 ? 'Intermediate' : 'Beginner'}
      </div>
    </div>
  );
};
