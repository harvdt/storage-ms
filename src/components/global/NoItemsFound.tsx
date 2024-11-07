import React from 'react';

import { cn } from '@/lib/utils';

type NoItemsFoundProps = {
  containerStyles?: string;
  textStyles?: string;
  message: string;
};

const NoItemsFound = ({
  containerStyles,
  message,
  textStyles,
}: NoItemsFoundProps) => {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center',
        containerStyles,
      )}
    >
      <p className={cn('text-center font-lexend text-white', textStyles)}>
        {message}
      </p>
    </div>
  );
};

export default NoItemsFound;
