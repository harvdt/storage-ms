import { FaWarehouse } from 'react-icons/fa';

import { Storage } from '@/types/api';

type StorageCardProps = {
  storage: Storage;
};

const StoragesCard = ({ storage }: StorageCardProps) => {
  return (
    <div className='flex aspect-[9/4] transform items-center justify-center rounded-lg bg-gradient-to-b from-main to-secondary p-4 text-white transition-transform duration-300 hover:scale-105 hover:shadow-lg'>
      <FaWarehouse className='h-12 w-12 flex-shrink-0' />
      <div className='mx-4 min-w-0'>
        <p className='truncate font-lexend text-lg font-bold md:text-xl'>
          {storage.name}
        </p>
        <p className='truncate font-lexend'>{storage.location}</p>
      </div>
    </div>
  );
};

export default StoragesCard;
