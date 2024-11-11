import { FaUser } from 'react-icons/fa';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
const TopBar = () => {
  return (
    <div className='flex justify-between bg-white px-6 py-1'>
      <div>
        <p className='font-lexend text-xl font-bold text-black'>OSMS</p>

        <p className='-mt-2 font-lexend text-sm text-black'>
          Office Storage Management System
        </p>
      </div>

      <Avatar>
        <AvatarImage src='https://gitub.com/shadcn.png' />
        <AvatarFallback className='bg-black'>
          <FaUser className='text-white' />
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default TopBar;
