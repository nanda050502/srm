'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Layout, CompanyCard } from '@/components';
import { getCompaniesFull } from '@/utils/data';
import { Input } from '@/components/UI';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function CompaniesPage() {
  const companies = getCompaniesFull();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const categoryParam = searchParams.get('category') || 'all';
    setSelectedCategory(categoryParam);
  }, [searchParams]);

  const filteredCompanies = useMemo(() => {
    let results = companies;

    if (selectedCategory !== 'all') {
      results = results.filter(
        (c) => c.company_category?.toLowerCase().replace(/\s+/g, '-') === selectedCategory
      );
    }

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      results = results.filter(
        (c) =>
          c.name.toLowerCase().includes(lowerQuery) ||
          c.short_name.toLowerCase().includes(lowerQuery)
      );
    }

    return results;
  }, [companies, searchQuery, selectedCategory]);

  const categories = ['all', 'marquee', 'super-dream', 'dream', 'regular'];

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Layout>
      <div className="space-y-8 px-8 py-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Companies</h1>
          <p className="text-slate-600">Explore {companies.length} recruiting partners</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Search</label>
            <Input
              icon={<Search className="h-4 w-4" />}
              type="text"
              placeholder="Search company by name (e.g., Google, Infosys, Amazon)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, index) => (
                <button
                  key={`category-${index}-${cat}`}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
                  }`}
                >
                  {cat === 'all' ? 'All Categories' : cat.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="text-sm text-slate-600">
            Showing {filteredCompanies.length} of {companies.length} companies
          </div>
          <div className="text-xs text-slate-500">
            Active filter: {selectedCategory === 'all' ? 'All Companies' : selectedCategory.replace('-', ' ')}
          </div>
        </div>

        {/* Companies Grid */}
        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.id} {...company} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <p className="text-lg text-slate-600">No companies found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
