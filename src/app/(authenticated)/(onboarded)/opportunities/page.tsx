'use client';

import { OpportunitiesContent } from '@/features/opportunities/components/opportunities-content';
import { OpportuntiesHero } from '@/features/opportunities/components/opportunities-hero';

export default function OpportunitiesPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Main Content */}
      <main>
        <OpportuntiesHero />
        <OpportunitiesContent />
      </main>
    </div>
  );
}
