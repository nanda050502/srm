import React, { useState } from 'react';
import {
  Brain,
  Briefcase,
  ClipboardList,
  Cpu,
  Leaf,
  Shield,
  Target,
  Users,
  Wallet,
} from 'lucide-react';
import { Tabs, Chip } from '../UI';
import { CompanyFull, BLOOM_LEVELS, generateMockSkills, getBloomDescription } from '@/utils/data';

interface CompanyTabsProps {
  company: CompanyFull;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function CompanyTabs({ company, activeTab, onTabChange }: CompanyTabsProps) {
  const [selectedSkills, setSelectedSkills] = useState<(typeof BLOOM_LEVELS)[number]>('CU');
  const mockSkills = generateMockSkills();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <ClipboardList className="h-4 w-4" /> },
    { id: 'business', label: 'Business & Market', icon: <Briefcase className="h-4 w-4" /> },
    { id: 'leadership', label: 'Leadership', icon: <Users className="h-4 w-4" /> },
    { id: 'financials', label: 'Financials', icon: <Wallet className="h-4 w-4" /> },
    { id: 'technology', label: 'Technology', icon: <Cpu className="h-4 w-4" /> },
    { id: 'culture', label: 'Culture & Work Life', icon: <Leaf className="h-4 w-4" /> },
    { id: 'risk', label: 'Risk & ESG', icon: <Shield className="h-4 w-4" /> },
    { id: 'strategy', label: 'Strategy', icon: <Target className="h-4 w-4" /> },
    { id: 'skills', label: 'Skills (Bloom Taxonomy)', icon: <Brain className="h-4 w-4" /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <Section title="Company Overview">
              <InfoGrid
                data={{
                  'Founded': company.founded_year?.toString(),
                  'Headquarters': company.headquarters,
                  'Company Stage': company.company_stage,
                  'Industry': company.industry_segment,
                  'Sub-segment': company.sub_segment,
                  'Business Model': company.business_model,
                }}
              />
            </Section>

            {company.acquisition_history && (
              <Section title="Acquisitions">
                <p className="text-slate-700">{company.acquisition_history}</p>
              </Section>
            )}

            <Section title="Geographic Presence">
              <InfoGrid
                data={{
                  'Geographic Coverage': company.geographic_presence,
                  'Regional HQs': company.regional_hq,
                }}
              />
            </Section>
          </div>
        );

      case 'business':
        return (
          <div className="space-y-6">
            <Section title="Market Information">
              <InfoGrid
                data={{
                  'Key Markets': company.key_markets,
                  'Customer Base': company.customer_base_size?.toString(),
                  'Competitive Advantages': company.competitive_advantages,
                }}
              />
            </Section>

            {company.product_portfolio_count && (
              <Section title="Product Portfolio">
                <InfoGrid
                  data={{
                    'Total Products': company.product_portfolio_count.toString(),
                    'Flagship Products': company.flagship_products,
                    'Recent Launches': company.recent_launches,
                    'Development Cycle': company.product_development_cycle,
                  }}
                />
              </Section>
            )}

            <Section title="Customer Metrics">
              <InfoGrid
                data={{
                  'Net Promoter Score': company.net_promoter_score?.toString(),
                  'Customer Retention': `${company.customer_retention_rate}%`,
                  'Satisfaction Score': company.customer_satisfaction_score?.toString(),
                }}
              />
            </Section>
          </div>
        );

      case 'leadership':
        return (
          <div className="space-y-6">
            <Section title="Executive Leadership">
              <InfoGrid
                data={{
                  'CEO': company.ceo_name,
                  'CFO': company.cfo_name,
                  'CTO': company.cto_name,
                  'Board Members': company.board_members?.toString(),
                }}
              />
            </Section>

            {company.key_executives && (
              <Section title="Key Executives">
                <p className="text-slate-700">{company.key_executives}</p>
              </Section>
            )}

            <Section title="Governance">
              <InfoGrid
                data={{
                  'Organizational Structure': company.organizational_structure,
                  'Corporate Governance': company.corporate_governance,
                  'Decision Making': company.decision_making_process,
                }}
              />
            </Section>
          </div>
        );

      case 'financials':
        return (
          <div className="space-y-6">
            <Section title="Financial Overview">
              <InfoGrid
                data={{
                  'Market Cap': company.market_cap_usd
                    ? `$${(parseInt(company.market_cap_usd) / 1000000000000).toFixed(1)}T`
                    : 'N/A',
                  'Revenue': company.revenue_usd
                    ? `$${(parseInt(company.revenue_usd) / 1000000000).toFixed(1)}B`
                    : 'N/A',
                  'Profitability': company.profitability_status,
                  'Financial Health': company.financial_health,
                }}
              />
            </Section>

            <Section title="Financial Metrics">
              <InfoGrid
                data={{
                  'Operating Margin': `${company.operating_margin}%`,
                  'Net Profit Margin': `${company.net_profit_margin}%`,
                  'Debt-to-Equity': company.debt_equity_ratio?.toString(),
                  'Cash Reserves': company.cash_reserves_usd
                    ? `$${(parseInt(company.cash_reserves_usd) / 1000000000).toFixed(1)}B`
                    : 'N/A',
                }}
              />
            </Section>

            <Section title="Investment & Spending">
              <InfoGrid
                data={{
                  'R&D Spending': company.research_development_spending
                    ? `$${(parseInt(company.research_development_spending) / 1000000000).toFixed(1)}B`
                    : 'N/A',
                  'CapEx': company.capital_expenditure
                    ? `$${(parseInt(company.capital_expenditure) / 1000000000).toFixed(1)}B`
                    : 'N/A',
                  'Credit Rating': company.credit_rating,
                }}
              />
            </Section>
          </div>
        );

      case 'technology':
        return (
          <div className="space-y-6">
            <Section title="Technology Stack">
              {company.technical_stack && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {company.technical_stack.split(';').map((tech: string) => (
                    <Chip key={tech.trim()} label={tech.trim()} variant="primary" />
                  ))}
                </div>
              )}
              <InfoGrid
                data={{
                  'Data Infrastructure': company.data_infrastructure,
                  'ML Frameworks': company.ml_frameworks_used,
                  'DevOps Tools': company.devops_tools,
                  'Database Tech': company.database_technologies,
                }}
              />
            </Section>

            <Section title="Innovation">
              <InfoGrid
                data={{
                  'Innovation Labs': company.innovation_labs,
                  'AI Capability': company.ai_capability_level,
                  'Patent Portfolio': company.patent_portfolio,
                  'Annual Publications': company.research_publications,
                }}
              />
            </Section>

            <Section title="Emerging Technologies">
              <InfoGrid
                data={{
                  'Blockchain': company.blockchain_initiatives || 'No active initiatives',
                  'Quantum Computing': company.quantum_computing_involvement || 'Limited involvement',
                  'IoT': company.iot_ecosystem || 'No IoT focus',
                  'AR/VR': company.ar_vr_investments || 'No AR/VR investments',
                }}
              />
            </Section>
          </div>
        );

      case 'culture':
        return (
          <div className="space-y-6">
            <Section title="Workforce">
              <InfoGrid
                data={{
                  'Employee Size': company.employee_size,
                  'Hiring Plans 2024': company.hiring_plans_2024,
                  'Attrition Rate': `${company.attrition_rate}%`,
                  'Satisfaction Score': company.employee_satisfaction_score?.toString(),
                }}
              />
            </Section>

            <Section title="Work Culture">
              <InfoGrid
                data={{
                  'Workplace Culture': company.workplace_culture,
                  'Remote Work Policy': company.remote_work_policy,
                  'Office Amenities': company.office_amenities,
                }}
              />
            </Section>

            <Section title="Diversity & Inclusion">
              <InfoGrid
                data={{
                  'Women %': company.diversity_metrics?.match(/(\d+)%\s*women/)?.[1] + '%' || 'N/A',
                  'Underrepresented Minorities': company.diversity_metrics
                    ?.match(/(\d+)%\s*underrepresented/)?.[1] + '%' || 'N/A',
                }}
              />
            </Section>

            <Section title="Benefits & Development">
              <p className="text-slate-700 mb-3">{company.employee_benefits}</p>
              <InfoGrid
                data={{
                  'Training Programs': company.training_programs,
                  'Skill Development Budget': company.skill_development_budget,
                  'Mentorship': company.mentorship_programs,
                }}
              />
            </Section>
          </div>
        );

      case 'risk':
        return (
          <div className="space-y-6">
            <Section title="Risk & Compliance">
              <InfoGrid
                data={{
                  'Risk Management': company.risk_management_framework,
                  'Compliance Certifications': company.compliance_certifications,
                  'Cybersecurity Measures': company.cybersecurity_measures,
                  'Data Privacy': company.data_privacy_policy,
                }}
              />
            </Section>

            {company.crisis_history && (
              <Section title="Crisis History">
                <p className="text-slate-700">{company.crisis_history}</p>
              </Section>
            )}

            <Section title="Environmental & Social">
              <InfoGrid
                data={{
                  'ESG Rating': company.esg_rating,
                  'Sustainability Goals': company.sustainability_goals,
                  'Environmental Commitment': company.environmental_commitment,
                  'Social Initiatives': company.social_initiatives,
                }}
              />
            </Section>

            <Section title="Regulatory Challenges">
              <p className="text-slate-700">{company.regulatory_challenges || 'Standard regulatory compliance'}</p>
            </Section>
          </div>
        );

      case 'strategy':
        return (
          <div className="space-y-6">
            <Section title="Strategic Direction">
              <InfoGrid
                data={{
                  'Growth Trajectory': company.growth_trajectory,
                  'Strategic Focus Areas': company.strategic_focus_areas,
                  '5-Year Vision': company['5_year_vision'],
                  'Future Outlook': company.future_outlook,
                }}
              />
            </Section>

            <Section title="Market Position">
              <InfoGrid
                data={{
                  'Competitive Threats': company.competitive_threats,
                  'Market Opportunities': company.market_opportunities,
                  'Market Expansion Plans': company.market_expansion_plans,
                }}
              />
            </Section>

            <Section title="Innovation Strategy">
              <p className="text-slate-700">{company.innovation_strategy}</p>
            </Section>

            <Section title="Partnerships & Growth">
              <InfoGrid
                data={{
                  'Strategic Partnerships': company.strategic_partnerships,
                  'Joint Ventures': company.joint_ventures,
                  'Partnership Opportunities': company.partnership_opportunities,
                }}
              />
            </Section>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-6">
            <Section title="Bloom's Taxonomy - Skills Matrix">
              <div className="mb-4">
                <p className="text-sm text-slate-600 mb-3">Select Bloom Level:</p>
                <div className="flex gap-2 flex-wrap">
                  {BLOOM_LEVELS.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedSkills(level)}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                        selectedSkills === level
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
                      }`}
                    >
                      {level} - {getBloomDescription(level).split(' - ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 mb-4 border border-slate-200">
                <p className="text-sm text-slate-700">{getBloomDescription(selectedSkills)}</p>
              </div>

              <div className="space-y-3">
                <p className="font-semibold text-slate-900 mb-4">Skills by {selectedSkills} Level:</p>
                {Object.entries(mockSkills).map(([skill, levels]) => (
                  <div key={skill} className="bg-white border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-900">{skill}</h4>
                      <div className="text-sm font-bold text-blue-600">Level {levels[selectedSkills]}/10</div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${(levels[selectedSkills] / 10) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-600 mt-2">
                      Topics: Problem Solving, Critical Thinking, Applied Knowledge
                    </p>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200">
      <Tabs tabs={tabs} activeTab={activeTab} onChange={onTabChange} />
      <div className="p-6">{renderTabContent()}</div>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div>
    <h3 className="text-lg font-bold text-slate-900 mb-4">{title}</h3>
    {children}
  </div>
);

interface InfoGridProps {
  data: Record<string, string | undefined>;
}

const InfoGrid: React.FC<InfoGridProps> = ({ data }) => {
  const entries = Object.entries(data).filter(([, value]) => value !== undefined && value !== null);

  return (
    <div className="grid grid-cols-2 gap-4">
      {entries.map(([key, value]) => (
        <div key={key} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
          <p className="text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">{key}</p>
          <p className="text-sm text-slate-900 line-clamp-3">{value}</p>
        </div>
      ))}
    </div>
  );
};
