import Image from 'next/image';

import { Category } from '@/types/api';

type CategoriesCardProps = {
  category: Category;
};

const CategoriesCard = ({ category }: CategoriesCardProps) => {
  return (
    <div className='flex aspect-square transform flex-col items-center justify-center rounded-lg bg-gradient-to-b from-main to-secondary p-4 text-white transition-transform duration-300 hover:scale-105 hover:shadow-lg'>
      <div className='relative aspect-square w-3/5'>
        <Image
          src='/images/pulpen.png'
          fill
          className='object-contain'
          alt={category.name}
        />
      </div>
      <p className='mt-2 line-clamp-1 text-center font-lexend font-bold'>
        {category.name}
      </p>
      <p className='line-clamp-1 text-center font-lexend text-sm'>
        {category.storage.name}
      </p>
    </div>
  );
};

export default CategoriesCard;
