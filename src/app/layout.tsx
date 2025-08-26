import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import '../styles/clerk.css';

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

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
    <ClerkProvider
      signInUrl={`/sign-in`}
      signUpUrl={`/sign-up`}
      signInFallbackRedirectUrl={`${appUrl}/dashboard`}
      signUpFallbackRedirectUrl={`${appUrl}/dashboard`}
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
        <body className={`${poppins.variable} font-sans antialiased`}>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
