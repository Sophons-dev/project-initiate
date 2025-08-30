'use client';

import {
  OrganizationsContent,
  OrganizationsHero,
} from '@/features/organizations/components';

export default function OrganizationsPage() {
  return (
    <div className='min-h-screen'>
      {/* Main Content */}
      <main>
        <OrganizationsHero />
        <OrganizationsContent />
      </main>
    </div>
  );
}
