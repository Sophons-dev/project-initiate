'use client';

import {
  OpportunitiesContent,
  OpportuntiesHero,
} from '@/features/opportunities/components';

export default function OpportunitiesPage() {
  return (
    <div className='min-h-screen'>
      {/* Main Content */}
      <main>
        <OpportuntiesHero />
        <OpportunitiesContent />
      </main>
    </div>
  );
}
