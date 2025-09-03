import { Footer } from '@/components/layout/footer';
import { MainNavbar } from '@/components/layout/main-navbar';
import { requireOnboarded } from '@/lib/auth/require-onboarded';
// import { requireOnboarded } from '@/lib/auth/require-onboarded';

export default async function OnboardedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: uncomment this when onboarding in backend is ready
  await requireOnboarded();

  return (
    <main className='flex flex-col min-h-screen'>
      <MainNavbar />

      <div className='flex-1 mt-15'>{children}</div>

      <Footer />
    </main>
  );
}
