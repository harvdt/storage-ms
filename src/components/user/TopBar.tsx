import { BsCart3 } from 'react-icons/bs';

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

      <button className={cn('flex items-center justify-center')}>
        <BsCart3 className={cn('text-main')} size={24} />
      </button>
    </div>
  );
};

export default TopBar;
