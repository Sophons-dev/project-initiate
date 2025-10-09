'use client';

import { OrganizationsContent } from '@/features/organizations/components';

export default function OrganizationsPage() {
  return (
    <div className='min-h-screen'>
      {/* Main Content */}
      <main>
        <OrganizationsContent />
      </main>
    </div>
  );
}
