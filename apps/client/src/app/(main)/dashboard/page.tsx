import { DashboardContent } from './_components/dashboard-content';
import { DashboardHero } from './_components/dashboard-hero';

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
