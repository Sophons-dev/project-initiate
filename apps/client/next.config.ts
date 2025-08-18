import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    APP_BASE_URL: process.env.APP_BASE_URL,
    AUTH0_SECRET: process.env.AUTH0_SECRET,
  },
};

export default nextConfig;
