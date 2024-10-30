import { cn } from '@/lib/utils';

import TopBar from '@/components/global/TopBar';
import SideBar from '@/components/user/SideBar';

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn('min-h-screen bg-gradient-to-r from-secondary to-main')}
      >
        <TopBar />
        <main className={cn('flex px-6 py-10')}>
          <SideBar />
          {children}
        </main>
      </body>
    </html>
  );
}
