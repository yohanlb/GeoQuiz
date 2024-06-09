import React from 'react';
import { Progress } from '@nextui-org/react';

const Gauge = ({
  value,
  variant = 'score',
}: {
  value: number;
  variant?: 'progress' | 'score';
}) => {
  const clampedValue = Math.max(Math.min(value, 100), 0);

  let color: any = 'success'; //eslint-disable-line
  if (value < 66) {
    if (variant === 'progress') {
      color = 'primary';
    } else {
      color = 'warning';
    }
  }
  if (value < 33) {
    if (variant === 'progress') {
      color = 'default';
    } else {
      color = 'danger';
    }
  }

  return (
    <div className='relative w-16'>
      <Progress
        size='lg'
        aria-label={`${clampedValue}%`}
        value={clampedValue}
        color={color}
      />
      <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center text-xs font-medium text-white'>
        {clampedValue}%
      </div>
    </div>
  );
};

export default Gauge;
