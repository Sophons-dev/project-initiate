import { requireAuth } from '@/lib/auth/require-auth';

export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  await requireAuth();
  return <>{children}</>;
}
