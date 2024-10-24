import React from 'react';

import { cn } from '@/lib/utils';

type ErrorStateProps = {
  message: string;
  containerClass?: string;
};

const ErrorState = ({ message, containerClass }: ErrorStateProps) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center gap-4',
      containerClass,
    )}
  >
    <div className='rounded-full bg-red-100 p-4'>
      <svg
        className='h-8 w-8 text-main'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
      </svg>
    </div>
    <p className={cn('text-center font-lexend text-lg text-white')}>
      {message}
    </p>
  </div>
);

export default ErrorState;
