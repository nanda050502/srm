import React, { useEffect } from 'react';
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
import { CompanyFull, getHiringRoundsData } from '@/utils/data';

interface CompanyTabsProps {
  company: CompanyFull;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function CompanyTabs({ company, activeTab, onTabChange }: CompanyTabsProps) {
  const hiringData = getHiringRoundsData(company.name);

  const hasValue = (value: unknown) => value !== undefined && value !== null && value !== '';
  const hasAny = (values: unknown[]) => values.some(hasValue);

  const tabConfig = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <ClipboardList className="h-4 w-4" />,
      hasData: () => true,
    },
    {
      id: 'business',
      label: 'Business & Market',
      icon: <Briefcase className="h-4 w-4" />,
      hasData: () =>
        hasAny([
          company.key_markets,
          company.customer_base_size,
          company.competitive_advantages,
          company.product_portfolio_count,
        ]),
    },
    {
      id: 'leadership',
      label: 'Leadership',
      icon: <Users className="h-4 w-4" />,
      hasData: () => hasAny([company.ceo_name, company.key_executives, company.corporate_governance]),
    },
    {
      id: 'financials',
      label: 'Financials',
      icon: <Wallet className="h-4 w-4" />,
      hasData: () => hasAny([company.revenue_usd, company.market_cap_usd, company.profitability_status]),
    },
    {
      id: 'technology',
      label: 'Technology',
      icon: <Cpu className="h-4 w-4" />,
      hasData: () => hasAny([company.technical_stack, company.data_infrastructure, company.ai_capability_level]),
    },
    {
      id: 'culture',
      label: 'Culture & Work Life',
      icon: <Leaf className="h-4 w-4" />,
      hasData: () => hasAny([company.employee_size, company.workplace_culture, company.remote_work_policy]),
    },
    {
      id: 'risk',
      label: 'Risk & ESG',
      icon: <Shield className="h-4 w-4" />,
      hasData: () => hasAny([company.esg_rating, company.risk_management_framework, company.compliance_certifications]),
    },
    {
      id: 'strategy',
      label: 'Strategy',
      icon: <Target className="h-4 w-4" />,
      hasData: () => hasAny([company.strategic_focus_areas, company.growth_trajectory, company.future_outlook]),
    },
    {
      id: 'skills',
      label: 'Hiring Focus',
      icon: <Brain className="h-4 w-4" />,
      hasData: () => true,
    },
  ];

  const tabs = tabConfig.filter((tab) => tab.hasData()).map(({ id, label, icon }) => ({ id, label, icon }));

  useEffect(() => {
    if (!tabs.find((tab) => tab.id === activeTab)) {
      onTabChange(tabs[0]?.id || 'overview');
    }
  }, [activeTab, onTabChange, tabs]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {company.overview_text && (
              <Section title="About the Company">
                <p className="text-slate-700 leading-relaxed">{company.overview_text}</p>
              </Section>
            )}

            <Section title="Company Overview">
              <InfoGrid
                data={{
                  'Founded': (company.incorporation_year || company.founded_year)?.toString(),
                  'Headquarters': company.headquarters_address || company.headquarters,
                  'Company Stage': company.company_stage,
                  'Industry': company.industry_segment,
                  'Sub-segment': company.sub_segment,
                  'Business Model': company.business_model,
                }}
              />
            </Section>

            {company.vision_statement && (
              <Section title="Vision">
                <p className="text-slate-700 leading-relaxed">{company.vision_statement}</p>
              </Section>
            )}

            {company.mission_statement && (
              <Section title="Mission">
                <p className="text-slate-700 leading-relaxed">{company.mission_statement}</p>
              </Section>
            )}

            {company.core_values && (
              <Section title="Core Values">
                <div className="flex flex-wrap gap-2">
                  {company.core_values.split(';').map((value) => (
                    <span key={value} className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm font-medium text-blue-900">
                      {value.trim()}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {company.core_value_proposition && (
              <Section title="Core Value Proposition">
                <div className="flex flex-wrap gap-2">
                  {company.core_value_proposition.split(';').map((value) => (
                    <span key={value} className="px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-sm font-medium text-green-900">
                      {value.trim()}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {company.unique_differentiators && (
              <Section title="Unique Differentiators">
                <div className="flex flex-wrap gap-2">
                  {company.unique_differentiators.split(';').map((value) => (
                    <span key={value} className="px-3 py-2 bg-indigo-50 border border-indigo-200 rounded-lg text-sm font-medium text-indigo-900">
                      {value.trim()}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {company.acquisition_history && (
              <Section title="Acquisitions">
                <p className="text-slate-700">{company.acquisition_history}</p>
              </Section>
            )}
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
                  'Customer Retention': company.customer_retention_rate ? `${company.customer_retention_rate}%` : undefined,
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
                  'CEO': company.ceo_name,
                  'Board Members': company.board_members,
                  'Key Leadership': company.key_leaders,
                  'Decision Access Level': company.decision_maker_access,
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
                    : undefined,
                  'Annual Revenue': company.annual_revenue,
                  'Annual Profit': company.annual_profit,
                  'Profitability': company.profitability_status,
                }}
              />
            </Section>

            <Section title="Revenue Breakdown">
              <InfoGrid
                data={{
                  'Revenue Mix': company.revenue_mix,
                  'Financial Health': company.financial_health,
                  'Total Capital Raised': company.total_capital_raised,
                }}
              />
            </Section>

            <Section title="Financial Metrics">
              <InfoGrid
                data={{
                  'YoY Growth': company.yoy_growth_rate ? `${company.yoy_growth_rate}%` : undefined,
                  'Market Share': company.market_share_percentage,
                  'Profitability Status': company.profitability_status,
                  'Financial Health': company.financial_health,
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
                  'Blockchain': company.blockchain_initiatives,
                  'Quantum Computing': company.quantum_computing_involvement,
                  'IoT': company.iot_ecosystem,
                  'AR/VR': company.ar_vr_investments,
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
                  'Employee Turnover': company.employee_turnover,
                }}
              />
            </Section>

            <Section title="Work Culture">
              <InfoGrid
                data={{
                  'Culture Summary': company.work_culture_summary,
                  'Feedback Culture': company.feedback_culture,
                  'Learning Culture': company.learning_culture,
                }}
              />
            </Section>

            <Section title="Diversity & Inclusion">
              <InfoGrid
                data={{
                  'DEI Score & Areas': company.diversity_inclusion_score,
                  'Diversity Metrics': company.diversity_metrics,
                }}
              />
            </Section>

            <Section title="Benefits & Development">
              <InfoGrid
                data={{
                  'Lifestyle & Wellness Benefits': company.lifestyle_benefits,
                  'Training Spend': company.training_spend,
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

      case 'skills': {
        const roles = hiringData?.job_role_details || [];
        const totalRounds = roles.reduce((sum, role) => sum + (role.hiring_rounds?.length || 0), 0);
        const skillCounts = new Map<string, number>();

        roles.forEach((role) => {
          role.hiring_rounds?.forEach((round) => {
            round.skill_sets?.forEach((skill) => {
              if (!skill.skill_set_code) return;
              const code = skill.skill_set_code.trim();
              if (!code) return;
              skillCounts.set(code, (skillCounts.get(code) || 0) + 1);
            });
          });
        });

        const topSkills = Array.from(skillCounts.entries())
          .map(([code, count]) => ({ code, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 8);

        return (
          <div className="space-y-6">
            <Section title="Hiring Focus Snapshot">
              {!hiringData ? (
                <div className="bg-white border border-slate-200 rounded-xl p-6 text-center text-slate-600">
                  No hiring rounds data available for this company yet.
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-500">Roles</p>
                      <p className="text-2xl font-bold text-slate-900 mt-2">{roles.length}</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-500">Rounds</p>
                      <p className="text-2xl font-bold text-slate-900 mt-2">{totalRounds}</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-500">Top Skills</p>
                      <p className="text-sm font-semibold text-slate-900 mt-2">{topSkills.length} categories</p>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <p className="text-sm font-semibold text-slate-900 mb-3">Most Requested Skill Sets</p>
                    <div className="flex flex-wrap gap-2">
                      {topSkills.map((skill) => (
                        <Chip key={skill.code} label={`${skill.code} (${skill.count})`} variant="secondary" />
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <p className="text-sm font-semibold text-slate-900 mb-3">Roles Covered</p>
                    <div className="flex flex-wrap gap-2">
                      {roles.slice(0, 6).map((role) => (
                        <Chip key={role.role_title} label={role.role_title} variant="primary" />
                      ))}
                      {roles.length > 6 && (
                        <Chip label={`+${roles.length - 6} more`} variant="accent" />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Section>
          </div>
        );
      }

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
