import React from 'react';
import { ArrowRight, Brain, Lightbulb, Target } from 'lucide-react';
import { CompanyFull } from '@/utils/data';

interface RightSideCardsProps {
  company: CompanyFull;
}

export default function RightSideCards({ company }: RightSideCardsProps) {
  const cards = [
    {
      id: 'skills',
      title: 'Skills',
      description: 'Bloom\'s Taxonomy mapping',
      icon: <Brain className="h-7 w-7 text-blue-700" />,
      color: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
    },
    {
      id: 'innovx',
      title: 'InnovX',
      description: 'Innovation projects',
      icon: <Lightbulb className="h-7 w-7 text-purple-700" />,
      color: 'from-purple-50 to-purple-100',
      borderColor: 'border-purple-200',
    },
    {
      id: 'hiring',
      title: 'Hiring Rounds',
      description: 'Job roles & process',
      icon: <Target className="h-7 w-7 text-green-700" />,
      color: 'from-green-50 to-green-100',
      borderColor: 'border-green-200',
    },
  ];

  return (
    <div className="sticky top-24 space-y-4">
      {cards.map((card) => (
        <button
          key={card.id}
          className={`w-full bg-gradient-to-br ${card.color} border ${card.borderColor} rounded-xl p-4 text-left hover:shadow-lg transition-all duration-300 group`}
        >
          <div className="flex items-start justify-between mb-3">
            <span>{card.icon}</span>
            <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </div>
          <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{card.title}</h3>
          <p className="text-xs text-slate-700">{card.description}</p>
          <p className="text-xs font-semibold text-slate-600 mt-3 group-hover:text-slate-900 transition-colors">
            Explore {card.title.toLowerCase()}
          </p>
        </button>
      ))}

      {/* Key Metrics */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
        <h4 className="font-bold text-slate-900">Quick Stats</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">Founded</span>
            <span className="font-semibold text-slate-900">{company.founded_year}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Stage</span>
            <span className="font-semibold text-slate-900">{company.company_stage}</span>
          </div>
          {company.market_cap_usd && (
            <div className="flex justify-between">
              <span className="text-slate-600">Market Cap</span>
              <span className="font-semibold text-slate-900">
                ${(parseInt(company.market_cap_usd) / 1000000000000).toFixed(1)}T
              </span>
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
