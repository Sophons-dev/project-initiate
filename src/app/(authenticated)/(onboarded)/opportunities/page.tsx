'use client';

import {
  OpportunitiesContent,
  OpportuntiesHero,
} from '@/features/opportunities/components';

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
