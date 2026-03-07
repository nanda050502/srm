import companiesShort from '@/data/company_short.json';
import companiesFull from '@/data/company_full.json';
import hiringRounds from '@/data/Hiring_rounds.json';
import innovxMaster from '@/data/innovx_master.json';
import companySkillLevels from '@/data/company_skill_levels.json';

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

const normalizeCompanyId = (id: string | number | undefined): string | undefined => {
  if (id === undefined || id === null) return undefined;
  const idString = String(id).trim();
  if (!idString) return undefined;
  return idString.startsWith('comp_') ? idString : `comp_${idString}`;
};

// Normalize company ID
const normalizeCompany = (company: any): CompanyShort & { id: string } => {
  const normalizedId = normalizeCompanyId(company.id ?? company.company_id);
  return {
    ...company,
    id: normalizedId || '',
  };
};

export const getCompaniesShort = (): (CompanyShort & { id: string })[] => {
  const companies = Array.isArray(companiesShort) ? companiesShort : [companiesShort];
  return companies.map(normalizeCompany);
};

export const getCompaniesFull = (): (CompanyFull & { id: string })[] => {
  const companies = Array.isArray(companiesFull) ? companiesFull : [companiesFull];
  return companies.map(normalizeCompany);
};

export const getCompanyById = (id: string): (CompanyFull & { id: string }) | undefined => {
  const normalizedSearchId = normalizeCompanyId(id);
  return getCompaniesFull().find((company) => company.id === normalizedSearchId);
};

export const searchCompanies = (query: string): (CompanyShort & { id: string })[] => {
  const lowerQuery = query.toLowerCase();
  return getCompaniesShort().filter(
    (company) =>
      company.name.toLowerCase().includes(lowerQuery) ||
      company.short_name.toLowerCase().includes(lowerQuery)
  );
};

export const getHiringRoundsData = (companyName?: string) => {
  if (!companyName) return undefined;
  const data = Array.isArray(hiringRounds) ? hiringRounds : [hiringRounds];
  const normalizedSearch = companyName.toLowerCase().trim();
  return data.find((company: any) => 
    company.company_name?.toLowerCase().trim() === normalizedSearch
  );
};

export const getInnovxDataForCompany = (companyName?: string) => {
  if (!companyName) return undefined;
  const data = innovxMaster.companies || [];
  const normalizedSearch = companyName.toLowerCase().trim();
  return data.find((company: any) => 
    company.innovx_master?.company_name?.toLowerCase().trim() === normalizedSearch
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

export const formatPercentage = (value: string | number): string => {
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) return 'N/A';
    return `${value}%`;
  }

  const normalized = value.toString().trim();
  if (!normalized) return '0%';

  const lower = normalized.toLowerCase();
  if (lower === 'n/a' || lower === 'na' || lower === '-') return 'N/A';

  const numericMatch = normalized.match(/[-+]?\d*\.?\d+/);
  if (numericMatch) {
    return `${numericMatch[0]}%`;
  }

  // Fall back to de-duplicated percent symbols for unusual values.
  const compact = normalized.replace(/%+/g, '%');
  return compact.endsWith('%') ? compact : `${compact}%`;
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

// Company Skill Levels Types
export interface ProficiencyLevel {
  name: string;
  code: string;
  description: string;
}

export interface SkillDetail {
  level: number;
  proficiency_code: string;
  proficiency_name: string;
  proficiency_description: string;
}

export interface CompanySkills {
  company: string;
  skills: Record<string, SkillDetail>;
}

export interface SkillLevelsData {
  metadata: {
    description: string;
    total_companies: number;
    skill_categories: string[];
    proficiency_levels: ProficiencyLevel[];
    generated_at: string;
  };
  proficiency_levels: ProficiencyLevel[];
  companies: CompanySkills[];
}

// Get company skill levels data
export const getCompanySkillLevels = (): SkillLevelsData => {
  return companySkillLevels as SkillLevelsData;
};

// Get skill levels for a specific company
export const getCompanySkillLevel = (companyName: string): CompanySkills | undefined => {
  const data = getCompanySkillLevels();
  const normalizedSearch = companyName.toLowerCase().trim();
  return data.companies.find((c) => c.company.toLowerCase().trim() === normalizedSearch);
};

// Get average skill level across all companies for a specific skill
export const getAverageSkillLevel = (skillCategory: string): number => {
  const data = getCompanySkillLevels();
  const levels = data.companies
    .map((c) => c.skills[skillCategory]?.level)
    .filter((l) => l !== undefined);
  
  if (levels.length === 0) return 0;
  return levels.reduce((sum, l) => sum + l, 0) / levels.length;
};

// Get skill statistics across all companies
export const getSkillStatistics = () => {
  const data = getCompanySkillLevels();
  const skillStats: Record<string, {
    average: number;
    min: number;
    max: number;
    proficiencyDistribution: Record<string, number>;
  }> = {};

  data.metadata.skill_categories.forEach((skill) => {
    const levels = data.companies
      .map((c) => c.skills[skill])
      .filter((s) => s !== undefined);

    const levelValues = levels.map((s) => s.level);
    const proficiencyCodes = levels.map((s) => s.proficiency_code);

    const distribution: Record<string, number> = {};
    proficiencyCodes.forEach((code) => {
      distribution[code] = (distribution[code] || 0) + 1;
    });

    skillStats[skill] = {
      average: levelValues.reduce((sum, l) => sum + l, 0) / levelValues.length,
      min: Math.min(...levelValues),
      max: Math.max(...levelValues),
      proficiencyDistribution: distribution,
    };
  });

  return skillStats;
};

// Get companies by skill level threshold
export const getCompaniesBySkillLevel = (
  skillCategory: string,
  minLevel: number
): CompanySkills[] => {
  const data = getCompanySkillLevels();
  return data.companies.filter(
    (c) => c.skills[skillCategory]?.level >= minLevel
  );
};

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

// Category grouping by common themes
export const getCategoryGroup = (category: string): string => {
  const lowerCat = category.toLowerCase();

  if (
    lowerCat.includes('startup') ||
    lowerCat.includes('scale-up') ||
    lowerCat.includes('unicorn')
  ) {
    return 'Startup/Scale-up';
  }

  if (
    lowerCat.includes('fintech') ||
    lowerCat.includes('financial services') ||
    lowerCat.includes('banking') ||
    lowerCat.includes('investment') ||
    lowerCat.includes('wealth') ||
    lowerCat.includes('digital payments') ||
    lowerCat.includes('lending')
  ) {
    return 'Finance/FinTech';
  }

  if (
    lowerCat.includes('health') ||
    lowerCat.includes('healthcare') ||
    lowerCat.includes('insurtech') ||
    lowerCat.includes('pharma')
  ) {
    return 'Healthcare/HealthTech';
  }

  if (
    lowerCat.includes('saas') ||
    lowerCat.includes('software') ||
    lowerCat.includes('cloud') ||
    lowerCat.includes('cybersecurity') ||
    lowerCat.includes('artificial intelligence') ||
    lowerCat.includes('technology & ip')
  ) {
    return 'Software/SaaS/Cloud';
  }

  if (
    lowerCat.includes('it services') ||
    lowerCat.includes('consulting') ||
    lowerCat.includes('digital transformation')
  ) {
    return 'IT Services/Consulting';
  }

  if (
    lowerCat.includes('public') ||
    lowerCat.includes('large cap') ||
    lowerCat.includes('publicly listed')
  ) {
    return 'Public/Listed';
  }

  if (
    lowerCat.includes('edtech') ||
    lowerCat.includes('e-learning') ||
    lowerCat.includes('education')
  ) {
    return 'EdTech';
  }

  if (
    lowerCat.includes('aerospace') ||
    lowerCat.includes('logistics') ||
    lowerCat.includes('retail') ||
    lowerCat.includes('telecommunications') ||
    lowerCat.includes('travel') ||
    lowerCat.includes('grocery')
  ) {
    return 'Infrastructure/Other';
  }

  return 'Enterprise';
};
