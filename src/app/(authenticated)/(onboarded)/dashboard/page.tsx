import { DashboardContent, DashboardHero } from '@/features/dashboard/components';

export default function Dashboard() {
  return (
    <div className='min-h-screen'>
      {/* Main Content */}
      <main>
        <DashboardHero />
        <DashboardContent />
      </main>
    </div>
  );
}
