import SideBarAdmin from '@/components/admin/SideBarAdmin';
import TopBar from '@/components/global/TopBar';

import { cn } from '../../../utils/lib/cn';

export default function AdminLayout({
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
          <SideBarAdmin />
          {children}
        </main>
      </body>
    </html>
  );
}
