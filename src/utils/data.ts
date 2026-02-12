import companiesShort from '@/data/company_short.json';
import companiesFull from '@/data/company_full.json';

export interface CompanyShort {
  company_id?: number;
  id?: string;
  name: string;
  short_name: string;
  logo_url: string;
  category: string;
  employee_size: string;
  operating_countries: string;
  office_locations: string;
  yoy_growth_rate: string | number;
}

export interface CompanyFull extends CompanyShort {
  [key: string]: any;
}

// Normalize company ID
const normalizeCompany = (company: any): CompanyShort & { id: string } => ({
  ...company,
  id: company.id || `comp_${company.company_id}`,
});

export const getCompaniesShort = (): (CompanyShort & { id: string })[] => {
  const companies = Array.isArray(companiesShort) ? companiesShort : [companiesShort];
  return companies.map(normalizeCompany);
};

export const getCompaniesFull = (): (CompanyFull & { id: string })[] => {
  const companies = Array.isArray(companiesFull) ? companiesFull : [companiesFull];
  return companies.map(normalizeCompany);
};

export const getCompanyById = (id: string): (CompanyFull & { id: string }) | undefined => {
  const company = getCompaniesFull().find((c) => c.id === id || c.id === id.replace('comp_', ''));
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
  // Categorize by employee size for dashboard
  const marquee = companies.filter((c) => {
    const size = c.employee_size.toLowerCase();
    return size.includes('thousand') || size.includes('million') || parseInt(size) > 100000;
  });
  
  const parseGrowth = (rate: string | number): number => {
    if (typeof rate === 'number') return rate;
    return parseFloat(rate.toString().replace('%', '')) || 0;
  };
  
  const superDream = companies.filter((c) => parseGrowth(c.yoy_growth_rate) > 15);
  const dream = companies.filter((c) => {
    const growth = parseGrowth(c.yoy_growth_rate);
    return growth > 10 && growth <= 15;
  });
  const regular = companies.filter((c) => parseGrowth(c.yoy_growth_rate) <= 10);

  return { marquee, superDream, dream, regular };
};

export const getStatistics = (companies: (CompanyShort & { id: string })[]) => {
  const parseGrowth = (rate: string | number): number => {
    if (typeof rate === 'number') return rate;
    return parseFloat(rate.toString().replace('%', '')) || 0;
  };
  
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

// Mock skills data generator
export const generateMockSkills = (): Record<string, Record<BloomLevel, number>> => {
  const skills = [
    'Python',
    'Java',
    'TypeScript',
    'System Design',
    'Data Structures',
    'Machine Learning',
    'Cloud Architecture',
    'DevOps',
  ];

  const skillsMap: Record<string, Record<BloomLevel, number>> = {};

  skills.forEach((skill) => {
    skillsMap[skill] = {
      CU: Math.floor(Math.random() * 10) + 1,
      AP: Math.floor(Math.random() * 10) + 1,
      AN: Math.floor(Math.random() * 10) + 1,
      EV: Math.floor(Math.random() * 10) + 1,
      CR: Math.floor(Math.random() * 10) + 1,
    };
  });

  return skillsMap;
};

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
