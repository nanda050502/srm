import React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, action }) => {
  return (
    <div className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-sm">
      <div className="px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
          {subtitle && <p className="text-sm text-slate-600 mt-1">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
};

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: 'up' | 'down';
  trendValue?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  icon,
  description,
  trend,
  trendValue,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-2">{label}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
          {description && <p className="text-xs text-slate-500 mt-2">{description}</p>}
        </div>
        <span className="text-blue-700">{icon}</span>
      </div>
      {trend && trendValue && (
        <div className={`mt-4 text-sm font-semibold ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? <ArrowUpRight className="inline h-4 w-4" /> : <ArrowDownRight className="inline h-4 w-4" />} {trendValue}
        </div>
      )}
    </div>
  );
};

interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const SectionCard: React.FC<SectionCardProps> = ({ children, className = '', hover = false }) => {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 shadow-sm ${
        hover ? 'hover:shadow-lg hover:border-slate-300 transition-all duration-300 cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
