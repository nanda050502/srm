'use client';

import React, { useState } from 'react';
import { Building2, Crown, FileText, Flame, Globe, LineChart, Rocket, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Layout, MetricCard } from '@/components';
import { GlobalSearch } from '@/components/Search';
import { getCompaniesShort, categorizeCompanies, getStatistics } from '@/utils/data';

export default function Dashboard() {
  const router = useRouter();
  const companies = getCompaniesShort();
  const { marquee, superDream, dream, regular } = categorizeCompanies(companies);
  const stats = getStatistics(companies);

  const handleSearch = (companyId: string) => {
    router.push(`/company/${companyId}`);
  };

  const searchableCompanies = companies.map((c) => ({
    id: c.id,
    name: c.name,
    short_name: c.short_name,
  }));

  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-8 py-16">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Discover Your Dream Company
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Explore company intelligence, skills requirements, and placement insights powered by real data.
              </p>
            </div>

            {/* Hero Search Bar */}
            <div className="bg-white bg-opacity-95 rounded-2xl p-2 shadow-2xl">
              <GlobalSearch companies={searchableCompanies} onSelect={handleSearch} />
            </div>

            <div className="text-sm text-blue-100">
              <p>Search across {companies.length} companies and their placement insights</p>
            </div>
          </div>
        </section>

        {/* Summary Cards Section */}
        <section className="px-8 py-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Intelligence at a Glance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <MetricCard label="Total Companies" value={stats.total} icon={<Building2 className="h-7 w-7" />} />
            <MetricCard label="Marquee Companies" value={marquee.length} icon={<Crown className="h-7 w-7" />} />
            <MetricCard label="Super Dream Companies" value={superDream.length} icon={<Rocket className="h-7 w-7" />} />
            <MetricCard label="Dream Companies" value={dream.length} icon={<Star className="h-7 w-7" />} />
            <MetricCard label="Regular Companies" value={regular.length} icon={<FileText className="h-7 w-7" />} />
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              label="Average Growth Rate"
              value={`${stats.avgGrowth}%`}
              icon={<LineChart className="h-7 w-7" />}
              trend="up"
              trendValue="+2.5% YoY"
            />
            <MetricCard
              label="Highest Growth"
              value={`${stats.maxGrowth}%`}
              icon={<Flame className="h-7 w-7" />}
              description="Peak company performance"
            />
            <MetricCard
              label="Countries Covered"
              value="50+"
              icon={<Globe className="h-7 w-7" />}
              description="Global placement opportunities"
            />
          </div>
        </section>

        {/* Company Categories Overview */}
        <section className="px-8 py-8 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Marquee Companies</h3>
            <p className="text-sm text-slate-600 mb-4">
              Industry leaders with massive workforce and global presence
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {marquee.map((company) => (
                <CompanyQuickCard key={company.id} company={company} onSelect={handleSearch} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Super Dream Companies</h3>
            <p className="text-sm text-slate-600 mb-4">
              High-growth companies with exceptional expansion (growth rate {'>'}15%)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {superDream.map((company) => (
                <CompanyQuickCard key={company.id} company={company} onSelect={handleSearch} />
              ))}
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <section className="bg-slate-100 px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Explore?</h3>
            <p className="text-slate-600 mb-6">
              Visit our All Companies section to discover detailed insights about each organization or use Skill Set Analytics to compare across companies.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => router.push('/companies')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Explore All Companies
              </button>
              <button
                onClick={() => router.push('/analytics')}
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold border border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Skill Analytics
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

interface CompanyQuickCardProps {
  company: any;
  onSelect: (id: string) => void;
}

const CompanyQuickCard: React.FC<CompanyQuickCardProps> = ({ company, onSelect }) => {
  const [imageError, setImageError] = React.useState(!company.logo_url);
  const initials = company.short_name.substring(0, 2).toUpperCase();
  const colors = ['bg-blue-600', 'bg-slate-700', 'bg-emerald-600', 'bg-amber-600', 'bg-indigo-600', 'bg-rose-600'];
  const colorIndex = company.short_name.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <button
      onClick={() => onSelect(company.id)}
      className="bg-white rounded-xl border border-slate-200 p-4 text-left hover:shadow-lg hover:border-blue-300 transition-all duration-300 group"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
          {imageError ? (
            <div className={`w-full h-full ${bgColor} flex items-center justify-center rounded-lg`}>
              <span className="text-white font-bold text-xs">{initials}</span>
            </div>
          ) : (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={company.logo_url}
                alt={company.name}
                className="w-10 h-10 object-contain"
                onError={() => setImageError(true)}
              />
            </>
          )}
        </div>
        <div>
          <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{company.name}</p>
          <p className="text-xs text-slate-600">{company.category}</p>
        </div>
      </div>
      <p className="text-sm text-slate-600 mb-2">{company.employee_size}</p>
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-green-600">{company.yoy_growth_rate}%</span>
        <span className="text-xs text-slate-600">YoY growth</span>
      </div>
    </button>
  );
};
