'use client';

import React, { useMemo } from 'react';
import { Layout } from '@/components';
import SkillHoverCard from '@/components/SkillHoverCard';
import hiringRoundsMaster from '@/data/Hiring_rounds.json';

interface HiringSkillSet {
  skill_set_code: string;
  typical_questions: string;
}

interface HiringRound {
  skill_sets: HiringSkillSet[];
}

interface HiringRole {
  role_title: string;
  hiring_rounds: HiringRound[];
}

interface HiringEntry {
  company_name: string;
  job_role_details: HiringRole[];
}

interface SkillCompany {
  company_name: string;
  roles: string[];
  level?: string;
}

interface SkillData {
  code: string;
  count: number;
  example: string;
  companies: SkillCompany[];
}

const getDemandLabel = (ratio: number) => {
  if (ratio >= 0.7) return { label: 'High', variant: 'primary' as const };
  if (ratio >= 0.4) return { label: 'Medium', variant: 'accent' as const };
  return { label: 'Low', variant: 'secondary' as const };
};

export default function HiringSkillSetPage() {
  const data = useMemo(() => {
    const entries = hiringRoundsMaster as HiringEntry[];
    const skillCounts = new Map<string, number>();
    const skillExamples = new Map<string, string>();
    const skillCompanies = new Map<string, SkillCompany[]>();
    let totalRoles = 0;
    let totalRounds = 0;
    let totalSkills = 0;

    entries.forEach((entry) => {
      entry.job_role_details?.forEach((role) => {
        totalRoles += 1;
        role.hiring_rounds?.forEach((round) => {
          totalRounds += 1;
          round.skill_sets?.forEach((skill) => {
            totalSkills += 1;
            const code = skill.skill_set_code?.trim();
            if (!code) return;

            // Count occurrences
            skillCounts.set(code, (skillCounts.get(code) || 0) + 1);

            // Store example
            if (!skillExamples.has(code) && skill.typical_questions) {
              skillExamples.set(code, skill.typical_questions);
            }

            // Track companies and roles requiring this skill
            if (!skillCompanies.has(code)) {
              skillCompanies.set(code, []);
            }

            const companies = skillCompanies.get(code) || [];
            let companyEntry = companies.find((c) => c.company_name === entry.company_name);

            if (!companyEntry) {
              companyEntry = {
                company_name: entry.company_name,
                roles: [],
              };
              companies.push(companyEntry);
            }

            if (!companyEntry.roles.includes(role.role_title)) {
              companyEntry.roles.push(role.role_title);
            }
          });
        });
      });
    });

    const skills: SkillData[] = Array.from(skillCounts.entries())
      .map(([code, count]) => ({
        code,
        count,
        example: skillExamples.get(code) || '',
        companies: (skillCompanies.get(code) || []).sort((a, b) =>
          a.company_name.localeCompare(b.company_name)
        ),
      }))
      .sort((a, b) => b.count - a.count);

    const maxCount = skills[0]?.count || 1;

    return {
      skills,
      maxCount,
      totalRoles,
      totalRounds,
      totalSkills,
      companyCount: entries.length,
    };
  }, []);

  return (
    <Layout>
      <div className="space-y-8 px-8 py-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Hiring Skill Demand</h1>
          <p className="text-slate-600">Aggregate view of the most requested skill sets across hiring rounds.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wide">Companies</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">{data.companyCount}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wide">Roles</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">{data.totalRoles}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wide">Rounds</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">{data.totalRounds}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wide">Skill Mentions</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">{data.totalSkills}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Skill Demand</h2>
              <p className="text-sm text-slate-600">Based on all hiring rounds in the dataset.</p>
            </div>
            <span className="text-xs text-slate-500">Top signals across companies</span>
          </div>

          <div className="space-y-4">
            {data.skills.map((skill) => {
              const demand = getDemandLabel(skill.count / data.maxCount);
              return (
                <SkillHoverCard
                  key={skill.code}
                  skill_code={skill.code}
                  count={skill.count}
                  maxCount={data.maxCount}
                  example={skill.example}
                  companies={skill.companies}
                  demandLabel={demand.label}
                  demandVariant={demand.variant}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
