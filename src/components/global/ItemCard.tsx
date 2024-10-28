import Image from 'next/image';
import React from 'react';

import { cn } from '@/lib/utils';

type ItemProps = {
  name: string;
  storage: string;
};

const ItemCard = ({ name, storage }: ItemProps) => (
  <div
    className={cn(
      'h-40 w-40 rounded-lg',
      'flex flex-col items-center justify-center bg-gradient-to-b from-main to-secondary',
      'transform transition-all hover:scale-[0.98]',
    )}
  >
    <Image
      src='/images/pulpen.png'
      width={100}
      height={100}
      alt={name}
      className='object-contain'
    />
    <p className={cn('font-lexend font-bold text-white')}>{name}</p>
    <p className={cn('font-lexend text-sm text-white')}>{storage}</p>
  </div>
);

export default ItemCard;
