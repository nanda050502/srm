import React, { useState } from 'react';
import Link from 'next/link';

interface CompanyCardProps {
  id: string;
  name: string;
  short_name: string;
  logo_url: string;
  category: string;
  company_category?: string;
  incorporation_year?: number;
  nature_of_company?: string;
  headquarters_address?: string;
  headquarters?: string;
  employee_size?: string;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
  id,
  name,
  short_name,
  logo_url,
  category,
  company_category,
  incorporation_year,
  nature_of_company,
  headquarters_address,
  headquarters,
  employee_size,
}) => {
  const getLogoUrl = (value: string) => {
    if (!value || typeof value !== 'string') return '';
    // Remove quotes if present
    const cleaned = value.replace(/^['"]|['"]$/g, '').trim();
    if (!cleaned.startsWith('http')) return '';
    return cleaned;
  };

  const normalizedLogo = getLogoUrl(logo_url);
  const [imageError, setImageError] = useState(!normalizedLogo);

  const initials = short_name.substring(0, 2).toUpperCase();
  const colors = ['bg-blue-600', 'bg-slate-700', 'bg-emerald-600', 'bg-amber-600', 'bg-indigo-600', 'bg-rose-600'];
  const colorIndex = short_name.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];

  const headquartersValue = headquarters_address || headquarters;

  return (
    <Link href={`/companies/${id}`}>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300 overflow-hidden cursor-pointer group h-full">
        <div className="p-5 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="w-14 h-14 rounded-lg bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
              {imageError ? (
                <div className={`w-full h-full ${bgColor} flex items-center justify-center`}>
                  <span className="text-white font-bold text-base">{initials}</span>
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={normalizedLogo}
                  alt={name}
                  className="w-10 h-10 object-contain"
                  onError={() => setImageError(true)}
                />
              )}
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 uppercase tracking-wide">{category}</p>
              {company_category && (
                <p className="text-xs font-semibold text-blue-700 mt-1">{company_category}</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {name}
            </h3>
            {incorporation_year && (
              <p className="text-xs text-slate-600">Established: {incorporation_year}</p>
            )}
          </div>

          <div className="space-y-2 text-sm text-slate-700">
            {nature_of_company && (
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wide text-slate-500">Nature</span>
                <span className="font-semibold text-slate-800">{nature_of_company}</span>
              </div>
            )}
            {employee_size && (
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wide text-slate-500">Employees</span>
                <span className="font-semibold text-slate-800">{employee_size}</span>
              </div>
            )}
            {headquartersValue && (
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wide text-slate-500">HQ</span>
                <span className="font-semibold text-slate-800">{headquartersValue}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
