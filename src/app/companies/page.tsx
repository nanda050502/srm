'use client';

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Layout, CompanyCard } from '@/components';
import { getCompaniesShort, getCategoryGroup } from '@/utils/data';
import { Input } from '@/components/UI';

export default function CompaniesPage() {
  const companies = getCompaniesShort();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');

  const filteredCompanies = useMemo(() => {
    let results = companies;

    // Filter by search query
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      results = results.filter(
        (c) =>
          c.name.toLowerCase().includes(lowerQuery) ||
          c.short_name.toLowerCase().includes(lowerQuery) ||
          c.category.toLowerCase().includes(lowerQuery)
      );
    }

    // Filter by category group
    if (selectedGroup !== 'all') {
      results = results.filter((c) => getCategoryGroup(c.category) === selectedGroup);
    }

    return results;
  }, [companies, searchQuery, selectedGroup]);

  // Get unique category groups (not individual categories)
  const categoryGroups = ['all', ...new Set(companies.map((c) => getCategoryGroup(c.category)))].sort(
    (a, b) => (a === 'all' ? -1 : a.localeCompare(b))
  );

  return (
    <Layout>
      <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">All Companies</h1>
          <p className="text-sm sm:text-base text-slate-600">Explore {companies.length} premier companies hiring our graduates</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 lg:p-6 space-y-4">
          {/* Search */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">Search</label>
            <Input
              icon={<Search className="h-4 w-4" />}
              type="text"
              placeholder="Search by company name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2 sm:mb-3">Category</label>
            <div className="flex flex-wrap gap-2">
              {categoryGroups.map((group) => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-all touch-manipulation ${
                    selectedGroup === group
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
                  }`}
                >
                  {group === 'all' ? 'All Categories' : group}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs sm:text-sm text-slate-600">
            Showing {filteredCompanies.length} of {companies.length} companies
          </div>
        </div>

        {/* Companies Grid */}
        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.id} {...company} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-12 text-center">
            <p className="text-base sm:text-lg text-slate-600">No companies found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedGroup('all');
              }}
              className="mt-4 px-5 sm:px-6 py-2 sm:py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base touch-manipulation"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
