'use server';

import { Auth0Client } from '@auth0/nextjs-auth0/server';

const appBaseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.APP_BASE_URL || 'http://localhost:3000';

// Initialize the Auth0 client
export const auth0 = new Auth0Client({
  domain: process.env.AUTH0_DOMAIN,
  secret: process.env.AUTH0_SECRET,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  appBaseUrl,
});
