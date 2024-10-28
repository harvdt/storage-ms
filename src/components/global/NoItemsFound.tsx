import React from 'react';

import { cn } from '@/lib/utils';

type NoItemsFoundProps = {
  containerStyles?: string;
  message: string;
};

const NoItemsFound = ({ containerStyles, message }: NoItemsFoundProps) => {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center',
        containerStyles,
      )}
    >
      <p className={cn('text-center font-lexend text-white')}>{message}</p>
    </div>
  );
};

export default NoItemsFound;
