import React from 'react';
import { CompanyFull } from '@/utils/data';

interface RightSideCardsProps {
  company: CompanyFull;
}

export default function RightSideCards({ company }: RightSideCardsProps) {
  const headquarters = company.headquarters_address || company.headquarters;
  const employeeCount = company.employee_size;
  const officeCount = company.office_count;
  const operatingCountries = company.operating_countries;
  const focusSectors = company.focus_sectors ? company.focus_sectors.split(';').slice(0, 3).join('; ') : undefined;
  const founded = (company.incorporation_year || company.founded_year)?.toString();
  const stage = company.company_stage;

  return (
    <div className="sticky top-24 space-y-4">
      {/* Key Metrics */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-4">
        <h4 className="font-bold text-slate-900">Quick Stats</h4>
        <div className="space-y-2.5 text-sm">
          {company.category && (
            <div className="flex justify-between">
              <span className="text-slate-600">Category</span>
              <span className="font-semibold text-slate-900">{company.category}</span>
            </div>
          )}
          {company.nature_of_company && (
            <div className="flex justify-between">
              <span className="text-slate-600">Type</span>
              <span className="font-semibold text-slate-900">{company.nature_of_company}</span>
            </div>
          )}
          {founded && (
            <div className="flex justify-between">
              <span className="text-slate-600">Founded</span>
              <span className="font-semibold text-slate-900">{founded}</span>
            </div>
          )}
          {stage && (
            <div className="flex justify-between">
              <span className="text-slate-600">Stage</span>
              <span className="font-semibold text-slate-900">{stage}</span>
            </div>
          )}
          {company.market_cap_usd && (
            <div className="flex justify-between">
              <span className="text-slate-600">Market Cap</span>
              <span className="font-semibold text-slate-900">
                ${(parseInt(company.market_cap_usd) / 1000000000000).toFixed(1)}T
              </span>
            </div>
          )}
          {employeeCount && (
            <div className="flex justify-between">
              <span className="text-slate-600">Employees</span>
              <span className="font-semibold text-slate-900">{employeeCount}</span>
            </div>
          )}
          {officeCount && (
            <div className="flex justify-between">
              <span className="text-slate-600">Offices</span>
              <span className="font-semibold text-slate-900">{officeCount}</span>
            </div>
          )}
          {operatingCountries && (
            <div className="flex justify-between">
              <span className="text-slate-600">Operating In</span>
              <span className="font-semibold text-slate-900 text-right text-xs">{operatingCountries}</span>
            </div>
          )}
          {focusSectors && (
            <div className="flex justify-between">
              <span className="text-slate-600">Focus Sectors</span>
              <span className="font-semibold text-slate-900 text-right text-xs">{focusSectors}</span>
            </div>
          )}
        </div>
      </div>

      {/* ESG Rating */}
      {company.esg_rating && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-xs font-semibold text-green-700 mb-2">ESG RATING</p>
          <p className="text-3xl font-bold text-green-900">{company.esg_rating}</p>
        </div>
      )}
    </div>
  );
}
