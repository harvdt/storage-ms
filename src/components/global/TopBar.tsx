import { BsCart3 } from 'react-icons/bs';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { cn } from '../../../utils/lib/cn';

const TopBar = () => {
  return (
    <div className={cn('flex justify-between bg-white px-6 py-1')}>
      <div>
        <p className={cn('font-lexend text-xl font-bold text-black')}>OSMS</p>

        <p className={cn('-mt-2 font-lexend text-sm text-black')}>
          Office Storage Management System
        </p>
      </div>

      <div className={cn('flex gap-x-4')}>
        <button className={cn('flex items-center justify-center')}>
          <BsCart3 className={cn('text-main')} size={28} />
        </button>

        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default TopBar;
