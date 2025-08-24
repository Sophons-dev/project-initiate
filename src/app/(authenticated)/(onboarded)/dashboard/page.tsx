import { DashboardContent } from '../../../../features/dashboard/components/dashboard-content';
import { DashboardHero } from '../../../../features/dashboard/components/dashboard-hero';

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
