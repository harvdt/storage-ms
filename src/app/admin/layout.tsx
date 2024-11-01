import SideBarAdmin from '@/components/admin/SideBarAdmin';
import TopBar from '@/components/global/TopBar';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='min-h-screen bg-gradient-to-r from-secondary to-main'>
        <TopBar />
        <main className='flex px-6 py-10'>
          <SideBarAdmin />
          {children}
        </main>
      </body>
    </html>
  );
}
