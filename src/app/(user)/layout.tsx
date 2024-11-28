import TopBar from '@/components/global/TopBar';
import SideBar from '@/components/user/SideBar';

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='min-h-screen bg-gradient-to-r from-secondary to-main'>
        <TopBar />
        <main className='mx-4 mt-8'>
          <div className='flex gap-6'>
            <div className='w-40 flex-shrink-0'>
              <SideBar />
            </div>
            <div className='min-w-0 flex-1'>{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
