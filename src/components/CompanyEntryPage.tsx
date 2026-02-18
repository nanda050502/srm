'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Layout } from '@/components';
import { getCompaniesFull } from '@/utils/data';
import { GlobalSearch } from '@/components/Search';

interface CompanyEntryPageProps {
  title: string;
  subtitle: string;
  targetRoute: 'process' | 'innovx';
  accentClass?: string;
}

const getLogoUrl = (value: string) => {
  if (!value || typeof value !== 'string') return '';
  const cleaned = value.replace(/^['"]|['"]$/g, '').trim();
  if (!cleaned.startsWith('http')) return '';
  return cleaned;
};

interface CompanyImageState {
  [key: string]: boolean;
}

export const CompanyEntryPage: React.FC<CompanyEntryPageProps> = ({
  title,
  subtitle,
  targetRoute,
  accentClass = 'from-blue-50 to-blue-100',
}) => {
  const companies = getCompaniesFull();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [imageErrors, setImageErrors] = useState<CompanyImageState>({});

  const searchableCompanies = companies.map((company) => ({
    id: company.id,
    name: company.name,
    short_name: company.short_name,
    company_category: company.company_category,
  }));

  const filteredCompanies = useMemo(() => {
    if (!searchQuery.trim()) return companies;
    const lowerQuery = searchQuery.toLowerCase();
    return companies.filter(
      (company) =>
        company.name.toLowerCase().includes(lowerQuery) ||
        company.short_name.toLowerCase().includes(lowerQuery)
    );
  }, [companies, searchQuery]);

  const handleSelect = (companyId: string) => {
    router.push(`/companies/${companyId}/${targetRoute}`);
  };

  return (
    <Layout>
      <div className="space-y-8 px-8 py-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">{title}</h1>
          <p className="text-slate-600">{subtitle}</p>
        </div>

        <div className={`bg-gradient-to-r ${accentClass} border border-slate-200 rounded-xl p-6 space-y-4`}>
          <h2 className="text-lg font-bold text-slate-900">Find a company</h2>
          <GlobalSearch
            companies={searchableCompanies}
            onSelect={handleSelect}
            placeholder="Search company by name"
            query={searchQuery}
            onQueryChange={setSearchQuery}
          />
        </div>

        {filteredCompanies.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-10 text-center text-slate-600">
            No companies found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => {
              const logo = getLogoUrl(company.logo_url);
              const headquarters = company.headquarters_address || company.headquarters;
              const initials = company.short_name.substring(0, 2).toUpperCase();
              const logoFailed = imageErrors[company.id] || !logo;
              const colors = ['bg-blue-600', 'bg-slate-700', 'bg-emerald-600', 'bg-amber-600', 'bg-indigo-600', 'bg-rose-600'];
              const colorIndex = company.short_name.charCodeAt(0) % colors.length;
              const bgColor = colors[colorIndex];

              return (
                <Link
                  key={company.id}
                  href={`/companies/${company.id}/${targetRoute}`}
                  className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden">
                        {logoFailed ? (
                          <div className={`w-full h-full ${bgColor} flex items-center justify-center`}>
                            <span className="text-xs font-bold text-white">{initials}</span>
                          </div>
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img 
                            src={logo} 
                            alt={company.name} 
                            className="w-10 h-10 object-contain"
                            onError={() => setImageErrors(prev => ({ ...prev, [company.id]: true }))}
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{company.name}</p>
                        <p className="text-xs text-slate-600">{company.category}</p>
                      </div>
                    </div>
                    {company.company_category && (
                      <span className="px-2 py-1 text-xs font-semibold bg-slate-100 text-slate-700 rounded-full">
                        {company.company_category}
                      </span>
                    )}
                  </div>
                  {headquarters && <p className="text-xs text-slate-600 mt-4">HQ: {headquarters}</p>}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};
