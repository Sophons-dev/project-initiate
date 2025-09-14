import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import '../styles/clerk.css';
import { Toaster } from '@/components/ui/sonner';
import { LoadingProgressProvider } from '@/providers/load-progress.provider';
import { Providers as QueryClientProvider } from '@/providers/query-client.provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import 'react-phone-input-2/lib/style.css';

export const metadata: Metadata = {
  title: 'Project Initiate',
  description: '',
};

const appUrl = process.env.NEXT_PUBLIC_APP_BASE_URL;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider>
      <ClerkProvider
        signInUrl={`/sign-in`}
        signUpUrl={`/sign-up`}
        signInFallbackRedirectUrl={`/dashboard`}
        signUpFallbackRedirectUrl={`/onboarding`}
        afterSignOutUrl={appUrl}
        appearance={{
          variables: {
            colorPrimary: '#019789',
          },
          layout: {
            socialButtonsPlacement: 'bottom',
            shimmer: true,
          },
          captcha: {
            theme: 'auto',
            size: 'flexible',
          },
          elements: {
            card: '!bg-transparent !shadow-none',
            cardBox: '!bg-transparent !shadow-none',
            input: '!p-2.5',
            formButtonPrimary: '!p-2.5',
            socialButtonsBlockButton: '!p-2.5',
          },
        }}
      >
        <html lang='en'>
          <body className={`font-sans antialiased`}>
            <LoadingProgressProvider>
              <main>{children}</main>
            </LoadingProgressProvider>
            <Toaster position='top-right' richColors theme='light' />
          </body>
        </html>
      </ClerkProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
