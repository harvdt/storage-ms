import Image from 'next/image';
import React from 'react';

import { cn } from '@/lib/utils';

import { Item } from '../../../utils/types/api';

type ItemProps = {
  item: Item;
};

const ItemCard = ({ item }: ItemProps) => (
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
      alt={item.name}
      className='object-contain'
    />
    <p className={cn('font-lexend font-bold')}>{item.name}</p>
    <p className={cn('font-lexend text-sm')}>{item.quantity}</p>
  </div>
);

export default ItemCard;
