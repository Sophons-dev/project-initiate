import { DashboardContent } from '@/features/dashboard/components/dashboard-content';
import { DashboardHero } from '@/features/dashboard/components/dashboard-hero';
import { useUser } from '@auth0/nextjs-auth0';

export default function Dashboard() {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Main Content */}
      <main>
        <DashboardHero />
        <DashboardContent />
      </main>
    </div>
  );
}
