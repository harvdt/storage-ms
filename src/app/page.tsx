import Link from 'next/link';

import { cn } from '@/lib/utils';

export default function Index() {
  return (
    <main className='flex min-h-screen items-center justify-center'>
      <div className='flex h-[32rem] w-[28rem] flex-col items-center rounded-xl bg-white'>
        <p className='pt-10 text-center font-dm_serif_display text-4xl text-main [text-shadow:_5px_5px_4px_rgb(0_0_0_/_0.25)]'>
          Halo,
        </p>
        <p className='px-16 text-center font-dm_serif_display text-4xl text-main [text-shadow:_5px_5px_4px_rgb(0_0_0_/_0.25)]'>
          Selamat Datang di OSMS
        </p>

        <div className='mt-8 flex items-center px-10'>
          <div className='h-3 w-3 rounded-full bg-main'></div>
          <div className='h-[2px] w-96 rounded-br-lg rounded-tr-lg bg-main'></div>
        </div>

        <div className='mt-12 flex flex-col items-center justify-center gap-y-10'>
          <Link
            href='/home'
            className={cn(
              'h-12 w-60 rounded-lg bg-gradient-to-r from-main to-secondary [box-shadow:_0px_4px_4px_rgb(0_0_0_/_0.50)]',
              'flex items-center justify-center font-lexend text-lg text-white',
            )}
          >
            User
          </Link>

          <Link
            href='/login'
            className={cn(
              'h-12 w-60 rounded-lg bg-gradient-to-r from-main to-secondary [box-shadow:_0px_4px_4px_rgb(0_0_0_/_0.50)]',
              'flex items-center justify-center font-lexend text-lg text-white',
            )}
          >
            Admin
          </Link>
        </div>
      </div>
    </main>
  );
}
