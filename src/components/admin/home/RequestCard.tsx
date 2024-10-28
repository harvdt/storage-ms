import { FaRegClock } from 'react-icons/fa';

import { cn } from '../../../../utils/lib/cn';

interface RequestCardProps {
  name: string;
  jenis_request: string;
}

const RequestCard = ({ name, jenis_request }: RequestCardProps) => (
  <div
    className={cn(
      'flex h-16 items-center gap-x-4 rounded-lg bg-gradient-to-b from-main to-secondary px-10',
    )}
  >
    <FaRegClock size={32} className={cn('text-white')} />
    <div>
      <p className={cn('font-lexend text-lg font-bold text-white')}>{name}</p>
      <p className={cn('font-lexend text-white')}>{jenis_request}</p>
    </div>
  </div>
);

export default RequestCard;
