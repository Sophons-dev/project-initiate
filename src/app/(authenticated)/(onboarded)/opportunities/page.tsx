'use client';

import {
  OpportunitiesContent,
  OpportunitiesHero,
} from '@/features/opportunities/components';

export default function OpportunitiesPage() {
  return (
    <div className='min-h-screen'>
      {/* Main Content */}
      <main>
        <OpportunitiesHero />
        <OpportunitiesContent />
      </main>
    </div>
  );
}
