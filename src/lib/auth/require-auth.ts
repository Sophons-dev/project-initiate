import { auth0 } from './auth0';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export async function requireAuth() {
  const session = await auth0.getSession();
  if (session) return session;

  const headersList = await headers();
  const currentPath =
    headersList.get('x-current-path') ||
    headersList.get('x-pathname') ||
    headersList.get('x-invoke-path') ||
    '/dashboard';

  redirect(`/auth/login?returnTo=${encodeURIComponent(currentPath)}`);
}
