import type { Metadata } from 'next';
import { DM_Serif_Display, Lexend } from 'next/font/google';

import './globals.css';

import { cn } from '@/utils/lib/cn';

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-lexend',
});

const dm_serif_display = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm_serif_display',
});

export const metadata: Metadata = {
  title: 'OSMS',
  description: 'Office Storage Management System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          `${lexend.variable} ${dm_serif_display.variable}`,
          'bg-gradient-to-r from-secondary to-main',
        )}
      >
        {children}
      </body>
    </html>
  );
}
