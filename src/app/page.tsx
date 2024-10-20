import Link from 'next/link';

import { cn } from '../../utils/lib/cn';

export default function Index() {
  return (
    <main className={cn('flex min-h-screen items-center justify-center')}>
      <div
        className={cn(
          'h-[32rem] w-[28rem] rounded-xl bg-white',
          'flex flex-col items-center',
        )}
      >
        <p
          className={cn(
            'text-center font-dm_serif_display text-4xl text-main',
            'pt-10 [text-shadow:_5px_5px_4px_rgb(0_0_0_/_0.25)]',
          )}
        >
          Halo,
        </p>
        <p
          className={cn(
            'text-center font-dm_serif_display text-4xl text-main',
            'px-16 [text-shadow:_5px_5px_4px_rgb(0_0_0_/_0.25)]',
          )}
        >
          Selamat Datang di OSMS
        </p>

        <div className='mt-8 flex items-center px-10'>
          <div className='h-3 w-3 rounded-full bg-main'></div>
          <div className='h-[2px] w-96 rounded-br-lg rounded-tr-lg bg-main'></div>
        </div>

        <div
          className={cn(
            'mt-12 flex flex-col items-center justify-center gap-y-10',
          )}
        >
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
