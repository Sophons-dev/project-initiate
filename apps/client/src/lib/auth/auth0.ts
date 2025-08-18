'use server';

import { Auth0Client } from '@auth0/nextjs-auth0/server';

// Initialize the Auth0 client
export const auth0 = new Auth0Client({
  domain: process.env.AUTH0_DOMAIN,
  secret: process.env.AUTH0_SECRET,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  appBaseUrl: process.env.APP_BASE_URL,
});

console.log(process.env.AUTH0_DOMAIN);
console.log(process.env.AUTH0_SECRET);
console.log(process.env.AUTH0_CLIENT_ID);
console.log(process.env.AUTH0_CLIENT_SECRET);
console.log(process.env.APP_BASE_URL);
