import { Footer } from '@/components/shared/footer';
import { MainNavbar } from '@/components/shared/main-navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex flex-col min-h-screen'>
      <MainNavbar />

      <div className='flex-1 mt-15'>{children}</div>

      <Footer />
    </main>
  );
}
