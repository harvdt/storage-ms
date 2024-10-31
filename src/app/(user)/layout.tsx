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
        <main className='mx-4 mt-8 flex'>
          <SideBar />
          {children}
        </main>
      </body>
    </html>
  );
}
