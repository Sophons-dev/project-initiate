import { handleAuth, handleLogin } from '@auth0/nextjs-auth0/edge';

export const GET = handleAuth({
  login: handleLogin(req => {
    return {
      returnTo: '/dashboard',
    };
  }),
});
