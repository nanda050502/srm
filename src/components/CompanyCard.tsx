import React, { useState } from 'react';
import Link from 'next/link';
import { Chip } from './UI';

interface CompanyCardProps {
  id: string;
  name: string;
  short_name: string;
  logo_url: string;
  category: string;
  employee_size?: string;
  office_locations?: string;
  operating_countries?: string;
  yoy_growth_rate?: string | number;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
  id,
  name,
  short_name,
  logo_url,
  category,
  employee_size,
  office_locations,
  operating_countries,
  yoy_growth_rate,
}) => {
  const [imageError, setImageError] = useState(!logo_url);
  const offices = office_locations ? office_locations.split(';').map((o) => o.trim()) : [];
  const countries = operating_countries ? operating_countries.split(';').map((c) => c.trim()) : [];
  
  // Normalize growth rate
  const normalizeGrowth = (rate: string | number) => {
    if (!rate) return '0';
    if (typeof rate === 'number') return rate.toFixed(1);
    return rate.toString().replace('%', '').trim();
  };

  const initials = short_name.substring(0, 2).toUpperCase();
  const colors = ['bg-blue-600', 'bg-slate-700', 'bg-emerald-600', 'bg-amber-600', 'bg-indigo-600', 'bg-rose-600'];
  const colorIndex = short_name.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <Link href={`/company/${id}`}>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden cursor-pointer group h-full">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 border-b border-slate-200">
          <div className="flex items-start justify-between mb-3">
            <div className="w-16 h-16 rounded-lg bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
              {imageError ? (
                <div className={`w-full h-full ${bgColor} flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{initials}</span>
                </div>
              ) : (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo_url}
                    alt={name}
                    className="w-14 h-14 object-contain"
                    onError={() => setImageError(true)}
                  />
                </>
              )}
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 uppercase tracking-wide">{category}</p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          {employee_size && <p className="text-xs text-slate-600 mt-1">{employee_size} employees</p>}
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-4">
          {/* Operating Countries */}
          {countries.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">Operating Countries</p>
              <div className="flex flex-wrap gap-1">
                {countries.slice(0, 3).map((country) => (
                  <Chip key={country} label={country} variant="secondary" />
                ))}
                {countries.length > 3 && <Chip label={`+${countries.length - 3}`} variant="secondary" />}
              </div>
            </div>
          )}

          {/* Office Locations */}
          {offices.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">Office Locations</p>
              <div className="flex flex-wrap gap-1">
                {offices.slice(0, 2).map((office) => (
                  <Chip key={office} label={office} variant="primary" />
                ))}
                {offices.length > 2 && <Chip label={`+${offices.length - 2} more`} variant="primary" />}
              </div>
            </div>
          )}

          {/* Growth Rate */}
          {yoy_growth_rate !== undefined && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
              <p className="text-xs text-green-700 font-medium">YoY Growth Rate</p>
              <p className="text-2xl font-bold text-green-900">{normalizeGrowth(yoy_growth_rate)}%</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 group-hover:bg-blue-50 transition-colors">
          <p className="text-xs font-semibold text-blue-600 group-hover:text-blue-700">Explore Profile →</p>
        </div>
      </div>
    </Link>
  );
};
