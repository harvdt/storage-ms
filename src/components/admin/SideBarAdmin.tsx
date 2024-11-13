'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsBagCheckFill } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { FaCircleInfo } from 'react-icons/fa6';
import { MdInventory } from 'react-icons/md';

import { cn } from '@/lib/utils';

const SideBarAdmin = () => {
  const path = usePathname();

  return (
    <div className={cn('relative rounded-lg', 'flex flex-col gap-y-6')}>
      <Link
        href='/admin/home'
        className={cn(
          'group relative w-full rounded-lg bg-white py-2 shadow-light',
          'flex items-center gap-x-2 overflow-hidden pl-2 pr-8',
          'font-lexend font-bold',
          path === '/admin/home'
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
        href='/admin/items'
        className={cn(
          'group relative w-full rounded-lg bg-white py-2 shadow-light',
          'flex items-center gap-x-2 overflow-hidden pl-2 pr-8',
          'font-lexend font-bold',
          path.startsWith('/admin/items')
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
        href='/admin/transaction'
        className={cn(
          'group relative w-full rounded-lg bg-white py-2 shadow-light',
          'flex items-center gap-x-2 overflow-hidden pl-2 pr-8',
          'font-lexend font-bold',
          path === '/admin/transaction'
            ? 'bg-gradient-to-r from-main to-secondary text-white shadow-bold'
            : 'text-black',
          'transition-all duration-300 ease-in-out',
        )}
      >
        <BsBagCheckFill className={cn('z-10 group-hover:text-white')} />
        <span className={cn('z-10 group-hover:text-white')}>Transaction</span>
        <div className='absolute inset-0 bg-third opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'></div>
      </Link>

      <Link
        href='/admin/info'
        className={cn(
          'group relative w-full rounded-lg bg-white py-2 shadow-light',
          'flex items-center gap-x-2 overflow-hidden pl-2 pr-8',
          'font-lexend font-bold',
          path === '/admin/info'
            ? 'bg-gradient-to-r from-main to-secondary text-white shadow-bold'
            : 'text-black',
          'transition-all duration-300 ease-in-out',
        )}
      >
        <FaCircleInfo className={cn('z-10 group-hover:text-white')} />
        <span className={cn('z-10 group-hover:text-white')}>Info</span>
        <div className='absolute inset-0 bg-third opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'></div>
      </Link>
    </div>
  );
};

export default SideBarAdmin;
