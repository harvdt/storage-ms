import { FaWarehouse } from 'react-icons/fa';

import { cn } from '@/lib/utils';

interface StorageCardProps {
  name: string;
  location: string;
}

const StorageCard = ({ name, location }: StorageCardProps) => (
  <div
    className={cn(
      'flex h-24 w-64 items-center justify-center rounded-lg bg-gradient-to-b from-main to-secondary',
      'transform transition-all hover:scale-[0.98]',
    )}
  >
    <FaWarehouse size={56} className={cn('text-white')} />
    <div className={cn('mx-4')}>
      <p className={cn('font-lexend text-xl font-bold text-white')}>{name}</p>
      <p className={cn('font-lexend text-white')}>{location}</p>
    </div>
  </div>
);

export default StorageCard;
