import { Navbar } from '@/components/shared/home-navbar';
import { Footer } from '@/components/shared/footer';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex flex-col min-h-screen'>
      <Navbar />

      <div className='flex-1 mt-25'>{children}</div>

      <Footer />
    </main>
  );
}
