import { OnboardingGuard } from '@/components/auth/onboarding-guard';
import { Footer } from '@/components/layout/footer';
import { MainNavbar } from '@/components/layout/main-navbar';

export default function OnboardedLayout({ children }: { children: React.ReactNode }) {
  return (
    <OnboardingGuard>
      <main className='flex flex-col min-h-screen'>
        <MainNavbar />

        <div className='flex-1 mt-15'>{children}</div>

        <Footer />
      </main>
    </OnboardingGuard>
  );
}
