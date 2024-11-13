import TopBar from '@/components/global/TopBar';
import SideBar from '@/components/user/SideBar';

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='bg-gradient-to-r from-secondary to-main'>
        <TopBar />
        <main className='mx-4 mt-8 flex justify-center gap-6'>
          <div className='flex-[0.1]'>
            <SideBar />
          </div>

          <div className='flex-[0.9]'>{children}</div>
        </main>
      </body>
    </html>
  );
}
