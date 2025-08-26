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
  description: 'Your project description here',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
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
