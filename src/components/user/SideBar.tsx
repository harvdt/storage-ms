'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsBagCheckFill } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { MdInventory } from 'react-icons/md';

import { cn } from '@/lib/utils';

const SideBar = () => {
  const path = usePathname();

  return (
    <div className='relative flex flex-col gap-y-6'>
      <Link
        href='/home'
        className={cn(
          'group relative w-full rounded-lg bg-white py-2 shadow-light',
          'flex items-center gap-x-2 overflow-hidden pl-2 pr-8',
          'font-lexend font-bold',
          path === '/home'
            ? 'bg-gradient-to-r from-main to-secondary text-white shadow-bold'
            : 'text-black',
          'transition-all duration-300 ease-in-out',
        )}
      >
        <FaHome className={cn('z-10 group-hover:text-white')} />
        <span className={cn('z-10 group-hover:text-white')}>Home</span>
        <div className='absolute inset-0 bg-third opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'></div>
      </Link>

      <Link
        href='/items'
        className={cn(
          'group relative w-full rounded-lg bg-white py-2 shadow-light',
          'flex items-center gap-x-2 overflow-hidden pl-2 pr-8',
          'font-lexend font-bold',
          path === '/items'
            ? 'bg-gradient-to-r from-main to-secondary text-white shadow-bold'
            : 'text-black',
          'transition-all duration-300 ease-in-out',
        )}
      >
        <MdInventory className={cn('z-10 group-hover:text-white')} />
        <span className={cn('z-10 group-hover:text-white')}>Items</span>
        <div className='absolute inset-0 bg-third opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'></div>
      </Link>

      <Link
        href='/transaction'
        className={cn(
          'group relative w-full rounded-lg py-2 shadow-light',
          'flex items-center gap-x-2 overflow-hidden bg-white pl-2 pr-8',
          'font-lexend font-bold',
          path === '/transaction'
            ? 'bg-gradient-to-r from-main to-secondary text-white shadow-bold'
            : 'text-black',
          'transition-all duration-300 ease-in-out',
        )}
      >
        <BsBagCheckFill className={cn('z-10 group-hover:text-white')} />
        <span className={cn('z-10 group-hover:text-white')}>Transaction</span>
        <div className='absolute inset-0 bg-third opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'></div>
      </Link>
    </div>
  );
};

export default SideBar;
