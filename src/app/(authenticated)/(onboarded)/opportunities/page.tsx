'use client';

import { DashboardContent } from '@/features/dashboard/components/dashboard-content';
import { OpportuntiesHero } from '@/features/opportunities/components/opportunities-hero';

export default function OpportunitiesPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Main Content */}
      <main>
        <OpportuntiesHero />
        <DashboardContent />
      </main>
    </div>
  );
}
