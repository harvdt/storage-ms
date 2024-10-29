'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsBagCheckFill } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { FaCircleInfo } from 'react-icons/fa6';
import { MdInventory } from 'react-icons/md';

import { cn } from '@/utils/lib/cn';

const SideBar = () => {
  const path = usePathname();

  return (
    <div
      className={cn(
        'relative h-[45.5rem] w-[12rem] rounded-lg',
        'flex flex-col gap-y-6',
      )}
    >
      <Link
        href='/home'
        className={cn(
          'group relative h-10 w-40 rounded-lg bg-white [box-shadow:_0px_4px_4px_rgb(0_0_0_/_0.50)]',
          'flex items-center gap-x-2 overflow-hidden px-2',
          'font-lexend font-bold',
          path === '/home'
            ? 'bg-gradient-to-r from-main to-secondary text-white [box-shadow:_0px_8px_4px_rgb(0_0_0_/_0.50)]'
            : 'text-black',
          'transition-all duration-300 ease-in-out',
        )}
      >
        <FaHome className={cn('z-10 group-hover:text-white')} />
        <span className={cn('z-10 group-hover:text-white')}>Home</span>
        <div className='absolute inset-0 bg-third opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'></div>
      </Link>

      <Link
        href='/inventory'
        className={cn(
          'group relative h-10 w-40 rounded-lg bg-white [box-shadow:_0px_4px_4px_rgb(0_0_0_/_0.50)]',
          'flex items-center gap-x-2 overflow-hidden px-2',
          'font-lexend font-bold',
          path === '/inventory'
            ? 'bg-gradient-to-r from-main to-secondary text-white [box-shadow:_0px_8px_4px_rgb(0_0_0_/_0.50)]'
            : 'text-black',
          'transition-all duration-300 ease-in-out',
        )}
      >
        <MdInventory className={cn('z-10 group-hover:text-white')} />
        <span className={cn('z-10 group-hover:text-white')}>Inventory</span>
        <div className='absolute inset-0 bg-third opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'></div>
      </Link>

      <Link
        href='/transaction'
        className={cn(
          'group relative h-10 w-40 rounded-lg [box-shadow:_0px_4px_4px_rgb(0_0_0_/_0.50)]',
          'flex items-center gap-x-2 overflow-hidden bg-white px-2',
          'font-lexend font-bold',
          path === '/transaction'
            ? 'bg-gradient-to-r from-main to-secondary text-white [box-shadow:_0px_8px_4px_rgb(0_0_0_/_0.50)]'
            : 'text-black',
          'transition-all duration-300 ease-in-out',
        )}
      >
        <BsBagCheckFill className={cn('z-10 group-hover:text-white')} />
        <span className={cn('z-10 group-hover:text-white')}>Transaction</span>
        <div className='absolute inset-0 bg-third opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'></div>
      </Link>

      <Link
        href='/info'
        className={cn(
          'group relative h-10 w-40 rounded-lg bg-white [box-shadow:_0px_4px_4px_rgb(0_0_0_/_0.50)]',
          'flex items-center gap-x-2 overflow-hidden px-2',
          'font-lexend font-bold',
          path === '/info'
            ? 'bg-gradient-to-r from-main to-secondary text-white [box-shadow:_0px_8px_4px_rgb(0_0_0_/_0.50)]'
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

export default SideBar;
