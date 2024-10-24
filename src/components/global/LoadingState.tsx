import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';

import { cn } from '@/lib/utils';

type LoadingStateProps = {
  containerClass?: string;
};

const LoadingState = ({ containerClass }: LoadingStateProps) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center gap-4',
      containerClass,
    )}
  >
    <FadeLoader color='#FFFFFF' />
    <p className={cn('font-lexend text-xl text-white')}>Loading...</p>
  </div>
);

export default LoadingState;
