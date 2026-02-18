import React, { useState } from 'react';
import Link from 'next/link';
import { Globe, Instagram, Linkedin, MapPin, Twitter, Building2, Users } from 'lucide-react';
import { Chip } from '../UI';
import { CompanyFull } from '@/utils/data';

interface CompanyHeroProps {
  company: CompanyFull;
}

export default function CompanyHero({ company }: CompanyHeroProps) {
  const [imageError, setImageError] = useState(!company.logo_url);
  const offices = (company.office_locations || '').split(';').filter((o) => o).map((o) => o.trim());
  const countries = (company.operating_countries || '').split(';').filter((c) => c).map((c) => c.trim());
  const initials = company.short_name.substring(0, 2).toUpperCase();
  const colors = ['bg-blue-600', 'bg-slate-700', 'bg-emerald-600', 'bg-amber-600', 'bg-indigo-600', 'bg-rose-600'];
  const colorIndex = company.short_name.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];
  const headquarters = company.headquarters_address || company.headquarters;
  const establishedYear = company.incorporation_year || company.founded_year;
  const employeeSize = company.employee_size;
  const websiteUrl = company.website_url || company.website;
  const contactEmail = company.primary_contact_email || company.contact_person_email;
  const contactPhone = company.primary_phone_number || company.phone;
  const companyId = company.id || company.company_id?.toString();

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 border-b border-slate-200 px-8 py-6 sticky top-0 z-30">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        <div className="flex gap-6 flex-1">
          <div className="w-28 h-28 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-md flex-shrink-0">
            {imageError ? (
              <div className={`w-full h-full ${bgColor} flex items-center justify-center rounded-2xl`}>
                <span className="text-white font-bold text-3xl">{initials}</span>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={company.logo_url}
                alt={company.name}
                className="w-24 h-24 object-contain"
                onError={() => setImageError(true)}
              />
            )}
          </div>

          <div className="flex-1">
            <div className="mb-2">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{company.category}</p>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">{company.name}</h1>
              <p className="text-slate-700">{company.short_name}</p>
            </div>

            <div className="mt-4 flex items-center gap-4 flex-wrap text-sm">
              {headquarters && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-700" />
                  <span className="text-slate-700">{headquarters}</span>
                </div>
              )}
              {establishedYear && (
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-blue-700" />
                  <span className="text-slate-700">Est. {establishedYear}</span>
                </div>
              )}
              {employeeSize && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-700" />
                  <span className="text-slate-700">{employeeSize}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {companyId && (
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href={`/companies/${companyId}/skills`}
              className="px-4 py-2 rounded-full border border-blue-600 text-blue-700 font-semibold text-sm hover:bg-blue-50 transition-colors"
            >
              Hiring Skill Sets
            </Link>
            <Link
              href={`/companies/${companyId}/process`}
              className="px-4 py-2 rounded-full border border-blue-600 text-blue-700 font-semibold text-sm hover:bg-blue-50 transition-colors"
            >
              Hiring Process
            </Link>
            <Link
              href={`/companies/${companyId}/innovx`}
              className="px-4 py-2 rounded-full border border-blue-600 text-blue-700 font-semibold text-sm hover:bg-blue-50 transition-colors"
            >
              InnovX Insights
            </Link>
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-3 flex-wrap">
        {websiteUrl && (
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 hover:bg-blue-50 hover:text-blue-800 transition-colors"
          >
            <Globe className="h-4 w-4 text-blue-700" />
            <span className="text-sm font-medium">Website</span>
          </a>
        )}
        {company.linkedin_url && (
          <a
            href={company.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 hover:bg-blue-50 hover:text-blue-800 transition-colors"
          >
            <Linkedin className="h-4 w-4 text-blue-700" />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
        )}
        {company.twitter_handle && (
          <a
            href={`https://twitter.com/${company.twitter_handle.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 hover:bg-blue-50 hover:text-blue-800 transition-colors"
          >
            <Twitter className="h-4 w-4 text-blue-700" />
            <span className="text-sm font-medium">Twitter</span>
          </a>
        )}
        {company.instagram_handle && (
          <a
            href={`https://instagram.com/${company.instagram_handle.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 hover:bg-blue-50 hover:text-blue-800 transition-colors"
          >
            <Instagram className="h-4 w-4 text-blue-700" />
            <span className="text-sm font-medium">Instagram</span>
          </a>
        )}
      </div>

      {(contactEmail || contactPhone) && (
        <div className="mt-6 pt-6 border-t border-slate-200">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Contact Information</h3>
          <div className="flex gap-6 flex-wrap">
            {contactEmail && (
              <div>
                <p className="text-xs text-slate-600 mb-1">Email</p>
                <a href={`mailto:${contactEmail}`} className="text-sm text-blue-600 hover:underline">
                  {contactEmail}
                </a>
              </div>
            )}
            {contactPhone && (
              <div>
                <p className="text-xs text-slate-600 mb-1">Phone</p>
                <a href={`tel:${contactPhone}`} className="text-sm text-blue-600 hover:underline">
                  {contactPhone}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-slate-200">
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold text-slate-700 mb-2 uppercase">Operating Countries</p>
            <div className="flex flex-wrap gap-1">
              {countries.map((country) => (
                <Chip key={country} label={country} variant="secondary" />
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-700 mb-2 uppercase">Office Locations</p>
            <div className="flex flex-wrap gap-1">
              {offices.map((office) => (
                <Chip key={office} label={office} variant="primary" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
