import { auth0 } from './auth0';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

/**
 * Require authentication
 * @param redirectTo - The URL to redirect to if the user is not authenticated
 * @returns The session if the user is authenticated
 */
export async function requireAuth(redirectTo?: string) {
  const session = await auth0.getSession();

  if (!session) {
    if (redirectTo) {
      redirect(redirectTo);
    }

    const headersList = await headers();
    const currentPath = headersList.get('x-invoke-path') || '/';
    redirect(`${redirectTo}?returnTo=${encodeURIComponent(currentPath)}`);
  }

  return session;
}
