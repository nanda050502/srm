'use client';

import React from 'react';
import { Brain, LineChart, Rocket, Target } from 'lucide-react';
import { Layout } from '@/components';

export default function InsightsPage() {
  const insights = [
    {
      title: 'Rising Stars in Tech',
      description: 'Companies with exceptional growth rates outperforming industry averages',
      metrics: ['15%+ YoY Growth', '50K+ Headcount', 'Global Expansion'],
      icon: <Rocket className="h-8 w-8 text-blue-700" />,
    },
    {
      title: 'Skill Gap Analysis',
      description: 'Identify the most sought-after technical skills across premium companies',
      metrics: ['ML & AI', 'Cloud Architecture', 'Full-Stack Development'],
      icon: <Brain className="h-8 w-8 text-blue-700" />,
    },
    {
      title: 'Interview Insights',
      description: 'Understand what top companies are looking for in candidates',
      metrics: ['5-6 Rounds Average', 'System Design Focus', 'Leadership Assessment'],
      icon: <Target className="h-8 w-8 text-blue-700" />,
    },
    {
      title: 'Career Progression',
      description: 'Track typical career growth paths at leading companies',
      metrics: ['Clear Progression', 'Internal Mobility', 'Executive Pipeline'],
      icon: <LineChart className="h-8 w-8 text-blue-700" />,
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen px-8 py-8 flex flex-col gap-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Insights</h1>
          <p className="text-slate-600">Placement intelligence and market trends</p>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((insight, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">{insight.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{insight.title}</h3>
              <p className="text-slate-600 text-sm mb-4">{insight.description}</p>
              <div className="flex flex-wrap gap-2">
                {insight.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-xs font-medium"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder Content */}
        <div className="mt-auto bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-slate-200 p-12 text-center">
          <p className="text-lg text-slate-600 mb-2">More insights coming soon</p>
          <p className="text-sm text-slate-500">
            We're analyzing placement data to bring you deeper insights and trends
          </p>
        </div>
      </div>
    </Layout>
  );
}
