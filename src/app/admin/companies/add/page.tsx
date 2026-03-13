'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Bot,
  Building2,
  CheckCircle2,
  Globe,
  Loader2,
  Plus,
  Save,
  Trash2,
} from 'lucide-react';
import { AdminGuard } from '@/components/AdminGuard';
import { AdminLayout } from '@/components/AdminLayout';

const NATURE_OPTIONS = ['Product Company', 'Service Company', 'Hybrid', 'Public Sector', 'Startup', 'Other'];

const CATEGORY_OPTIONS = [
  'Software / SaaS / Cloud',
  'Finance / FinTech',
  'IT Services / Consulting',
  'Enterprise',
  'Healthcare / HealthTech',
  'EdTech',
  'Cybersecurity',
  'E-Commerce / Retail',
  'Manufacturing',
  'Infrastructure / Energy',
  'Other',
];

const EMPLOYEE_SIZE_OPTIONS = [
  '1–50',
  '51–200',
  '201–500',
  '501–1,000',
  '1,001–5,000',
  '5,001–10,000',
  '10,001–50,000',
  '50,000+',
];

const GENERATED_FIELD_COUNT = 163;

type GeneratedFieldKey = `parameter_${string}`;

type OrchestrationStatus = 'idle' | 'running' | 'completed';

interface FormState {
  companyName: string;
  shortName: string;
  websiteUrl: string;
  logo: string;
  yearOfIncorporation: string;
  companyHeadquarters: string;
  countriesOperatingIn: string;
  natureOfCompany: string;
  categoryIndustry: string;
  servicesProductsOfferings: string;
  employeeSize: string;
  ceoName: string;
  linkedInProfileUrl: string;
}

interface HiringRound {
  id: string;
  roundName: string;
  mode: string;
  difficulty: string;
  notes: string;
}

const EMPTY_FORM: FormState = {
  companyName: '',
  shortName: '',
  websiteUrl: '',
  logo: '',
  yearOfIncorporation: '',
  companyHeadquarters: '',
  countriesOperatingIn: '',
  natureOfCompany: '',
  categoryIndustry: '',
  servicesProductsOfferings: '',
  employeeSize: '',
  ceoName: '',
  linkedInProfileUrl: '',
};

interface FieldError {
  [key: string]: string;
}

function validate(form: FormState): FieldError {
  const errors: FieldError = {};
  if (!form.companyName.trim()) errors.companyName = 'Company Name is required.';
  if (!form.shortName.trim()) errors.shortName = 'Short Name is required.';
  if (!form.websiteUrl.trim()) errors.websiteUrl = 'Website URL is required.';
  if (!form.logo.trim()) errors.logo = 'Logo is required.';
  if (!form.yearOfIncorporation.trim()) errors.yearOfIncorporation = 'Year of Incorporation is required.';
  if (!/^\d{4}$/.test(form.yearOfIncorporation.trim())) {
    errors.yearOfIncorporation = 'Enter a valid 4-digit year.';
  }
  if (!form.companyHeadquarters.trim()) errors.companyHeadquarters = 'Company Headquarters is required.';
  if (!form.countriesOperatingIn.trim()) errors.countriesOperatingIn = 'Countries Operating In is required.';
  if (!form.natureOfCompany.trim()) errors.natureOfCompany = 'Nature of Company is required.';
  if (!form.categoryIndustry.trim()) errors.categoryIndustry = 'Category / Industry is required.';
  if (!form.servicesProductsOfferings.trim()) errors.servicesProductsOfferings = 'Services / Products / Offerings is required.';
  if (!form.employeeSize.trim()) errors.employeeSize = 'Employee Size is required.';
  if (!form.ceoName.trim()) errors.ceoName = 'CEO Name is required.';
  if (!form.linkedInProfileUrl.trim()) errors.linkedInProfileUrl = 'LinkedIn Profile URL is required.';
  return errors;
}

function getGeneratedFieldMeta() {
  return Array.from({ length: GENERATED_FIELD_COUNT }, (_, i) => {
    const index = i + 1;
    const key = `parameter_${String(index).padStart(3, '0')}` as GeneratedFieldKey;
    return {
      key,
      label: `Generated Parameter ${index}`,
    };
  });
}

function generateParameterValue(index: number, form: FormState): string {
  const templates = [
    `Insight ${index}: ${form.companyName} demand signal aligns with ${form.categoryIndustry} hiring windows.`,
    `Insight ${index}: Candidate readiness for ${form.shortName} should prioritize role-aligned projects.`,
    `Insight ${index}: Interview complexity trend inferred from ${form.natureOfCompany} operating model.`,
    `Insight ${index}: Geo signal indicates stronger funnel from ${form.companyHeadquarters}.`,
    `Insight ${index}: Talent strategy references ${form.servicesProductsOfferings.slice(0, 90)}.`,
    `Insight ${index}: Leadership context grounded by ${form.ceoName} and company growth profile.`,
    `Insight ${index}: Eligibility assumptions tuned for employee size band ${form.employeeSize}.`,
    `Insight ${index}: Expansion coverage for ${form.countriesOperatingIn} affects round sequencing.`,
  ];
  return templates[(index - 1) % templates.length];
}

function createGeneratedParameterMap(form: FormState): Record<GeneratedFieldKey, string> {
  const entries = getGeneratedFieldMeta().map((field, idx) => [field.key, generateParameterValue(idx + 1, form)]);
  return Object.fromEntries(entries) as Record<GeneratedFieldKey, string>;
}

function lockClass(disabled: boolean): string {
  return disabled ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-white text-slate-800';
}

export default function AddCompanyPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldError>({});
  const [submitted, setSubmitted] = useState(false);
  const [orchestrationStatus, setOrchestrationStatus] = useState<OrchestrationStatus>('idle');
  const [generatedParameters, setGeneratedParameters] = useState<Record<GeneratedFieldKey, string>>({} as Record<GeneratedFieldKey, string>);
  const [generatedReady, setGeneratedReady] = useState(false);
  const [companyValidated, setCompanyValidated] = useState(false);
  const [hiringRounds, setHiringRounds] = useState<HiringRound[]>([]);
  const [roundsError, setRoundsError] = useState('');

  const generatedFieldMeta = useMemo(() => getGeneratedFieldMeta(), []);
  const detailsLocked = companyValidated;

  const set = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const startOrchestration = () => {
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setGeneratedReady(false);
      setCompanyValidated(false);
      return;
    }

    setOrchestrationStatus('running');
    setCompanyValidated(false);

    window.setTimeout(() => {
      setGeneratedParameters(createGeneratedParameterMap(form));
      setGeneratedReady(true);
      setOrchestrationStatus('completed');
    }, 1500);
  };

  const setGeneratedField = (field: GeneratedFieldKey, value: string) => {
    setGeneratedParameters((prev) => ({ ...prev, [field]: value }));
  };

  const validateCompanyProfile = () => {
    if (!generatedReady) return;

    const hasEmptyCritical = generatedFieldMeta.slice(0, 20).some((field) => !generatedParameters[field.key]?.trim());
    if (hasEmptyCritical) {
      setRoundsError('Please review generated fields. First 20 generated parameters must not be empty.');
      return;
    }

    setRoundsError('');
    setCompanyValidated(true);
    if (hiringRounds.length === 0) {
      setHiringRounds([
        {
          id: crypto.randomUUID(),
          roundName: '',
          mode: 'Online',
          difficulty: 'Medium',
          notes: '',
        },
      ]);
    }
  };

  const addHiringRound = () => {
    setHiringRounds((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        roundName: '',
        mode: 'Online',
        difficulty: 'Medium',
        notes: '',
      },
    ]);
  };

  const removeHiringRound = (id: string) => {
    setHiringRounds((prev) => prev.filter((round) => round.id !== id));
  };

  const setRoundField = (id: string, field: keyof HiringRound, value: string) => {
    setHiringRounds((prev) => prev.map((round) => (round.id === id ? { ...round, [field]: value } : round)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (!generatedReady) {
      setRoundsError('Run agent orchestration to generate the 163 parameters before saving.');
      return;
    }

    if (!companyValidated) {
      setRoundsError('Validate company profile before adding final submission.');
      return;
    }

    if (hiringRounds.length === 0 || hiringRounds.some((round) => !round.roundName.trim())) {
      setRoundsError('Add at least one hiring round with a round name.');
      return;
    }

    setRoundsError('');
    setSubmitted(true);
    setTimeout(() => router.push('/admin/companies'), 1500);
  };

  if (submitted) {
    return (
      <AdminGuard>
        <AdminLayout>
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                <Save className="h-8 w-8 text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Company Added!</h2>
              <p className="text-sm text-slate-600">Redirecting back to Company Management…</p>
            </div>
          </div>
        </AdminLayout>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Add Company</h1>
              <p className="text-sm text-slate-600 mt-0.5">13 grounding fields {'->'} agent orchestration {'->'} 163 review fields {'->'} hiring rounds.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
              Fill 13 grounding parameters, then run orchestration. Generated 163 fields remain editable for admin validation.
            </div>

            <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-blue-600" />
                Company Basics (1-5)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={form.companyName}
                    onChange={(e) => set('companyName', e.target.value)}
                    placeholder="e.g. Acme Corporation"
                    disabled={detailsLocked}
                    className={`w-full rounded-lg border px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 ${lockClass(detailsLocked)} ${errors.companyName ? 'border-red-400' : 'border-slate-300'}`}
                  />
                  {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Short Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={form.shortName}
                    onChange={(e) => set('shortName', e.target.value)}
                    placeholder="e.g. Acme"
                    disabled={detailsLocked}
                    className={`w-full rounded-lg border px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 ${lockClass(detailsLocked)} ${errors.shortName ? 'border-red-400' : 'border-slate-300'}`}
                  />
                  {errors.shortName && <p className="text-xs text-red-500 mt-1">{errors.shortName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Website URL <span className="text-red-500">*</span></label>
                  <input
                    type="url"
                    value={form.websiteUrl}
                    onChange={(e) => set('websiteUrl', e.target.value)}
                    placeholder="https://example.com"
                    disabled={detailsLocked}
                    className={`w-full rounded-lg border px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 ${lockClass(detailsLocked)} ${errors.websiteUrl ? 'border-red-400' : 'border-slate-300'}`}
                  />
                  {errors.websiteUrl && <p className="text-xs text-red-500 mt-1">{errors.websiteUrl}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Logo URL <span className="text-red-500">*</span></label>
                  <input
                    type="url"
                    value={form.logo}
                    onChange={(e) => set('logo', e.target.value)}
                    placeholder="https://example.com/logo.png"
                    disabled={detailsLocked}
                    className={`w-full rounded-lg border px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 ${lockClass(detailsLocked)} ${errors.logo ? 'border-red-400' : 'border-slate-300'}`}
                  />
                  {errors.logo && <p className="text-xs text-red-500 mt-1">{errors.logo}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Year of Incorporation <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    min={1800}
                    max={2100}
                    value={form.yearOfIncorporation}
                    onChange={(e) => set('yearOfIncorporation', e.target.value)}
                    placeholder="e.g. 2012"
                    disabled={detailsLocked}
                    className={`w-full rounded-lg border px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 ${lockClass(detailsLocked)} ${errors.yearOfIncorporation ? 'border-red-400' : 'border-slate-300'}`}
                  />
                  {errors.yearOfIncorporation && <p className="text-xs text-red-500 mt-1">{errors.yearOfIncorporation}</p>}
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-600" />
                Business Profile (6-10)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company Headquarters <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={form.companyHeadquarters}
                    onChange={(e) => set('companyHeadquarters', e.target.value)}
                    placeholder="e.g. Bengaluru, India"
                    disabled={detailsLocked}
                    className={`w-full rounded-lg border px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 ${lockClass(detailsLocked)} ${errors.companyHeadquarters ? 'border-red-400' : 'border-slate-300'}`}
                  />
                  {errors.companyHeadquarters && <p className="text-xs text-red-500 mt-1">{errors.companyHeadquarters}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Countries Operating In <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={form.countriesOperatingIn}
                    onChange={(e) => set('countriesOperatingIn', e.target.value)}
                    placeholder="e.g. India, USA, UAE"
                    disabled={detailsLocked}
                    className={`w-full rounded-lg border px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 ${lockClass(detailsLocked)} ${errors.countriesOperatingIn ? 'border-red-400' : 'border-slate-300'}`}
                  />
                  {errors.countriesOperatingIn && <p className="text-xs text-red-500 mt-1">{errors.countriesOperatingIn}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nature of Company <span className="text-red-500">*</span></label>
                  <select
                    value={form.natureOfCompany}
                    onChange={(e) => set('natureOfCompany', e.target.value)}
                    disabled={detailsLocked}
                    className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 ${lockClass(detailsLocked)} ${errors.natureOfCompany ? 'border-red-400' : 'border-slate-300'}`}
                  >
                    <option value="">Select nature...</option>
                    {NATURE_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.natureOfCompany && <p className="text-xs text-red-500 mt-1">{errors.natureOfCompany}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category / Industry <span className="text-red-500">*</span></label>
                  <select
                    value={form.categoryIndustry}
                    onChange={(e) => set('categoryIndustry', e.target.value)}
                    disabled={detailsLocked}
                    className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 ${lockClass(detailsLocked)} ${errors.categoryIndustry ? 'border-red-400' : 'border-slate-300'}`}
                  >
                    <option value="">Select category / industry...</option>
                    {CATEGORY_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.categoryIndustry && <p className="text-xs text-red-500 mt-1">{errors.categoryIndustry}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Services / Products / Offerings <span className="text-red-500">*</span></label>
                <textarea
                  value={form.servicesProductsOfferings}
                  onChange={(e) => set('servicesProductsOfferings', e.target.value)}
                  rows={4}
                  placeholder="Summarize core services, products, and offerings..."
                  disabled={detailsLocked}
                  className={`w-full rounded-lg border px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 ${lockClass(detailsLocked)} ${errors.servicesProductsOfferings ? 'border-red-400' : 'border-slate-300'}`}
                />
                {errors.servicesProductsOfferings && <p className="text-xs text-red-500 mt-1">{errors.servicesProductsOfferings}</p>}
              </div>
            </section>

            <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-600" />
                Leadership & Presence (11-13)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Employee Size <span className="text-red-500">*</span></label>
                  <select
                    value={form.employeeSize}
                    onChange={(e) => set('employeeSize', e.target.value)}
                    disabled={detailsLocked}
                    className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 ${lockClass(detailsLocked)} ${errors.employeeSize ? 'border-red-400' : 'border-slate-300'}`}
                  >
                    <option value="">Select size...</option>
                    {EMPLOYEE_SIZE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.employeeSize && <p className="text-xs text-red-500 mt-1">{errors.employeeSize}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">CEO Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={form.ceoName}
                    onChange={(e) => set('ceoName', e.target.value)}
                    placeholder="e.g. Jane Doe"
                    disabled={detailsLocked}
                    className={`w-full rounded-lg border px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 ${lockClass(detailsLocked)} ${errors.ceoName ? 'border-red-400' : 'border-slate-300'}`}
                  />
                  {errors.ceoName && <p className="text-xs text-red-500 mt-1">{errors.ceoName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Profile URL <span className="text-red-500">*</span></label>
                <input
                  type="url"
                  value={form.linkedInProfileUrl}
                  onChange={(e) => set('linkedInProfileUrl', e.target.value)}
                  placeholder="https://www.linkedin.com/company/..."
                  disabled={detailsLocked}
                  className={`w-full rounded-lg border px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 ${lockClass(detailsLocked)} ${errors.linkedInProfileUrl ? 'border-red-400' : 'border-slate-300'}`}
                />
                {errors.linkedInProfileUrl && <p className="text-xs text-red-500 mt-1">{errors.linkedInProfileUrl}</p>}
              </div>
            </section>

            {generatedReady && (
              <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <h2 className="text-base font-bold text-slate-800">Generated Parameters (163)</h2>
                  <button
                    type="button"
                    onClick={validateCompanyProfile}
                    disabled={companyValidated}
                    className="px-4 py-2 rounded-lg border border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 disabled:opacity-60 disabled:cursor-not-allowed text-sm font-semibold inline-flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {companyValidated ? 'Company Validated' : 'Validate Company'}
                  </button>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
                  Admin can edit any generated field before validation. After validation, company details become idle and hiring rounds can be entered below.
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[32rem] overflow-auto pr-1">
                  {generatedFieldMeta.map((field) => (
                    <div key={field.key}>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">{field.label}</label>
                      <textarea
                        rows={2}
                        value={generatedParameters[field.key] ?? ''}
                        onChange={(e) => setGeneratedField(field.key, e.target.value)}
                        disabled={detailsLocked}
                        className={`w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 ${lockClass(detailsLocked)}`}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {companyValidated && (
              <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <h2 className="text-base font-bold text-slate-800">Hiring Rounds (Post Validation)</h2>
                  <button
                    type="button"
                    onClick={addHiringRound}
                    className="px-3 py-2 rounded-lg border border-blue-300 text-blue-700 bg-blue-50 hover:bg-blue-100 text-sm font-semibold inline-flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Round
                  </button>
                </div>

                <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                  Company details are now idle (locked). Enter hiring rounds for this company in the same page.
                </div>

                <div className="space-y-3">
                  {hiringRounds.map((round, idx) => (
                    <div key={round.id} className="rounded-lg border border-slate-200 p-4 bg-slate-50 space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-800">Round {idx + 1}</p>
                        <button
                          type="button"
                          onClick={() => removeHiringRound(round.id)}
                          className="text-xs text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Round Name <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            value={round.roundName}
                            onChange={(e) => setRoundField(round.id, 'roundName', e.target.value)}
                            placeholder="e.g. Technical Interview"
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Mode</label>
                          <select
                            value={round.mode}
                            onChange={(e) => setRoundField(round.id, 'mode', e.target.value)}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
                          >
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                            <option value="Hybrid">Hybrid</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Difficulty</label>
                          <select
                            value={round.difficulty}
                            onChange={(e) => setRoundField(round.id, 'difficulty', e.target.value)}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
                          >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Notes</label>
                        <textarea
                          rows={2}
                          value={round.notes}
                          onChange={(e) => setRoundField(round.id, 'notes', e.target.value)}
                          placeholder="Round expectations, tips, cutoffs, etc."
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {roundsError && <p className="text-sm text-red-600">{roundsError}</p>}

            <div className="flex items-center justify-center gap-3 pb-8">
              <button
                type="button"
                onClick={startOrchestration}
                disabled={detailsLocked || orchestrationStatus === 'running'}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {orchestrationStatus === 'running' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bot className="h-4 w-4" />}
                {orchestrationStatus === 'running' ? 'Running Orchestration...' : 'Start Agent Orchestration'}
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save Company
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Discard
              </button>
            </div>
          </form>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
