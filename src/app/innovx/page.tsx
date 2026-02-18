'use client';

import React from 'react';
import { CompanyEntryPage } from '@/components/CompanyEntryPage';

export default function InnovxEntryPage() {
  return (
    <CompanyEntryPage
      title="InnovX - Innovation Accelerator"
      subtitle="Explore industry trends, innovation roadmaps, and student project ideas"
      targetRoute="innovx"
      accentClass="from-purple-50 to-purple-100"
    />
  );
}
