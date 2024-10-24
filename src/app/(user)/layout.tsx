import SideBar from '@/components/user/SideBar';
import TopBar from '@/components/user/TopBar';

import { cn } from '../../../utils/lib/cn';

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
          <SideBar></SideBar>
          {children}
        </main>
      </body>
    </html>
  );
}
