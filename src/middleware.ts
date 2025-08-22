import type { NextRequest } from 'next/server';
import { auth0 } from './lib/auth/auth0';

// const auth0 = new Auth0Client({
//   domain: process.env.AUTH0_DOMAIN,
//   secret: process.env.AUTH0_SECRET,
//   clientId: process.env.AUTH0_CLIENT_ID,
//   clientSecret: process.env.AUTH0_CLIENT_SECRET,
//   appBaseUrl: process.env.APP_BASE_URL || 'http://localhost:3000',
// });

export async function middleware(request: NextRequest) {
  return await auth0.middleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
