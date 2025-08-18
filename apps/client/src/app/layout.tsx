import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Auth0Provider } from '@auth0/nextjs-auth0';

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
    <html lang='en'>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Auth0Provider>
          <main>{children}</main>
        </Auth0Provider>
      </body>
    </html>
  );
}
