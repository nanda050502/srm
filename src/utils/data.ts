import companiesShort from '@/data/company_short.json';
import companiesFull from '@/data/company_full.json';
import innovxMaster from '@/data/innovx_master.json';
import hiringRoundsMaster from '@/data/Hiring_rounds.json';

export interface CompanyShort {
  company_id?: number;
  id?: string;
  name: string;
  short_name: string;
  logo_url: string;
  category: string;
  company_category?: 'Marquee' | 'Super Dream' | 'Dream' | 'Regular';
  employee_size?: string;
  operating_countries?: string;
  office_locations?: string;
  yoy_growth_rate?: string | number;
}

export interface CompanyFull extends CompanyShort {
  [key: string]: any;
}

export interface InnovxMaster {
  company_name: string;
  industry: string;
  sub_industry: string;
  core_business_model: string;
  target_market: string;
  geographic_focus: string;
}

export interface InnovxTrend {
  trend_name: string;
  trend_description: string;
  time_horizon_years: number;
  trend_drivers: string[];
  impact_areas: string[];
  strategic_importance: string;
}

export interface InnovxRoadmapItem {
  innovation_theme: string;
  problem_statement: string;
  target_customer: string;
  innovation_type: string;
  time_horizon: string;
  expected_outcome: string;
  required_capabilities: string[];
  dependent_trend_names: string[];
}

export interface InnovxCompetitor {
  competitor_name: string;
  competitor_type: string;
  core_strength: string;
  market_positioning: string;
  bet_name: string;
  bet_description: string;
  innovation_category: string;
  futuristic_level: string;
  strategic_objective: string;
  threat_level: string;
}

export interface InnovxPillar {
  cto_vision_statement: string;
  pillar_name: string;
  pillar_description: string;
  focus_area: string;
  key_technologies: string[];
  strategic_risks: string;
  strategic_assumptions: string;
}

export interface InnovxProject {
  project_name: string;
  problem_statement: string;
  target_users: string;
  innovation_objective: string;
  tier_level: string;
  differentiation_factor: string;
  aligned_pillar_names: string[];
  architecture_style: string;
  backend_technologies: string[];
  frontend_technologies: string[];
  ai_ml_technologies: string[];
  data_storage_processing: string;
  integrations_apis: string[];
  infrastructure_cloud: string;
  security_compliance: string;
  primary_use_case: string;
  secondary_use_cases: string[];
  scenario_description: string;
  user_journey_summary: string;
  business_value: string;
  success_metrics: string[];
}

export interface InnovxData {
  innovx_master: InnovxMaster;
  industry_trends: InnovxTrend[];
  innovation_roadmap: InnovxRoadmapItem[];
  competitive_landscape: InnovxCompetitor[];
  strategic_pillars: InnovxPillar[];
  innovx_projects: InnovxProject[];
}

interface InnovxMasterDataset {
  total_companies?: number;
  notes?: string;
  companies: InnovxData[];
}

export interface HiringRoundSkill {
  skill_set_code: string;
  typical_questions: string;
}

export interface HiringRoundStep {
  round_number: number;
  round_name: string;
  round_category: string;
  evaluation_type: string;
  assessment_mode: string;
  skill_sets: HiringRoundSkill[];
}

export interface HiringRole {
  opportunity_type: string;
  role_title: string;
  role_category: string;
  job_description: string;
  compensation: string;
  ctc_or_stipend: number;
  bonus: string;
  benefits_summary: string;
  hiring_rounds: HiringRoundStep[];
}

export interface HiringRoundsData {
  company_name: string;
  job_role_details: HiringRole[];
}

const parseGrowth = (rate: string | number | undefined): number => {
  if (!rate) return 0;
  if (typeof rate === 'number') return rate;
  return parseFloat(rate.toString().replace('%', '')) || 0;
};

const parseEmployeeSize = (employeeSize?: string): number => {
  if (!employeeSize) return 0;
  const normalized = employeeSize.toLowerCase().replace(/,/g, '');
  const numeric = parseFloat(normalized);
  if (normalized.includes('million')) return numeric * 1000000;
  if (normalized.includes('thousand')) return numeric * 1000;
  return parseInt(normalized.replace(/[^0-9]/g, ''), 10) || 0;
};

export const getCompanyCategory = (company: CompanyShort): CompanyShort['company_category'] => {
  const sizeValue = parseEmployeeSize(company.employee_size);
  const growth = parseGrowth(company.yoy_growth_rate);

  if (sizeValue >= 100000 || company.employee_size?.toLowerCase().includes('million')) {
    return 'Marquee';
  }
  if (growth > 15) return 'Super Dream';
  if (growth > 10) return 'Dream';
  return 'Regular';
};

// Normalize company ID - use company_id as the unique identifier
const normalizeCompany = (company: any): CompanyShort & { id: string } => {
  const normalized = {
    ...company,
    id: company.id || company.company_id?.toString() || `company_${Math.random().toString(36).substr(2, 9)}`,
  } as CompanyShort & { id: string };

  return {
    ...normalized,
    company_category: normalized.company_category || getCompanyCategory(normalized),
  };
};

export const getCompaniesShort = (): (CompanyShort & { id: string })[] => {
  return companiesShort.map(normalizeCompany);
};

export const getCompaniesFull = (): (CompanyFull & { id: string })[] => {
  return companiesFull.map(normalizeCompany);
};

export const getInnovxData = (): InnovxData => {
  const entries = getInnovxCompanies();
  if (!entries.length) {
    throw new Error('InnovX dataset is empty');
  }
  return entries[0];
};

const normalizeCompanyName = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/[\u2019\u2018']/g, '')
    .replace(/\b(inc|incorporated|ltd|limited|plc|corp|corporation|co|company|group|holdings|technologies|technology)\b/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

export const getInnovxCompanies = (): InnovxData[] => {
  const dataset = innovxMaster as InnovxMasterDataset;
  return (dataset.companies || []).filter(
    (entry) => entry?.innovx_master?.company_name && entry.innovx_master.company_name.trim().length > 0
  );
};

export const getInnovxDataForCompany = (companyName: string, companyShortName?: string): InnovxData | null => {
  const entries = getInnovxCompanies();
  if (!companyName) return null;

  const normalizedTarget = normalizeCompanyName(companyName);
  const normalizedShort = companyShortName ? normalizeCompanyName(companyShortName) : '';

  const exactMatch = entries.find((entry) => {
    const normalizedEntry = normalizeCompanyName(entry.innovx_master.company_name);
    return normalizedEntry === normalizedTarget || (normalizedShort && normalizedEntry === normalizedShort);
  });
  if (exactMatch) return exactMatch;

  const partialMatch = entries.find((entry) => {
    const normalizedEntry = normalizeCompanyName(entry.innovx_master.company_name);
    return (
      normalizedEntry.includes(normalizedTarget) ||
      normalizedTarget.includes(normalizedEntry) ||
      (normalizedShort && (normalizedEntry.includes(normalizedShort) || normalizedShort.includes(normalizedEntry)))
    );
  });

  return partialMatch || null;
};

export const getHiringRoundsData = (companyName?: string): HiringRoundsData | null => {
  if (!companyName) return null;
  const entries = (hiringRoundsMaster as HiringRoundsData[]).filter((entry) => entry?.company_name);
  const normalized = normalizeCompanyName(companyName);
  const directMatch = entries.find((entry) => normalizeCompanyName(entry.company_name) === normalized);
  if (directMatch) return directMatch;

  const partialMatch = entries.find((entry) => {
    const normalizedEntry = normalizeCompanyName(entry.company_name);
    return normalizedEntry.includes(normalized) || normalized.includes(normalizedEntry);
  });

  return partialMatch || null;
};

export const getCompanyById = (id: string): (CompanyFull & { id: string }) | undefined => {
  const company = getCompaniesFull().find((c) => c.id === id || c.company_id?.toString() === id);
  return company;
};

export const searchCompanies = (query: string): (CompanyShort & { id: string })[] => {
  const lowerQuery = query.toLowerCase();
  return getCompaniesShort().filter(
    (company) =>
      company.name.toLowerCase().includes(lowerQuery) ||
      company.short_name.toLowerCase().includes(lowerQuery)
  );
};

export const categorizeCompanies = (companies: (CompanyShort & { id: string })[]) => {
  const marquee = companies.filter((c) => c.company_category === 'Marquee');
  const superDream = companies.filter((c) => c.company_category === 'Super Dream');
  const dream = companies.filter((c) => c.company_category === 'Dream');
  const regular = companies.filter((c) => c.company_category === 'Regular');

  return { marquee, superDream, dream, regular };
};

export const getStatistics = (companies: (CompanyShort & { id: string })[]) => {
  const growthRates = companies.map((c) => parseGrowth(c.yoy_growth_rate));
  return {
    total: companies.length,
    avgGrowth: (growthRates.reduce((sum, c) => sum + c, 0) / companies.length).toFixed(1),
    maxGrowth: Math.max(...growthRates).toFixed(1),
  };
};

// Bloom's Taxonomy levels
export const BLOOM_LEVELS = ['CU', 'AP', 'AN', 'EV', 'CR'] as const;
export type BloomLevel = (typeof BLOOM_LEVELS)[number];

export interface SkillProficiency {
  bloom: BloomLevel;
  level: number; // 1-10
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  topics: string[];
}

export const getBloomDescription = (level: BloomLevel): string => {
  const descriptions: Record<BloomLevel, string> = {
    CU: 'Conceptual Understanding - Grasp fundamental concepts and terminology',
    AP: 'Application - Apply knowledge to solve practical problems',
    AN: 'Analysis - Break down complex problems and understand relationships',
    EV: 'Evaluation - Make informed judgments based on criteria',
    CR: 'Creation - Develop innovative solutions and frameworks',
  };
  return descriptions[level];
};
