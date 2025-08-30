import {
  DashboardContent,
  DashboardHero,
} from '@/features/dashboard/components';

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
