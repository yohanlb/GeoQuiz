import React from 'react';
import { Progress } from '@nextui-org/react';

type Props = {
  value: number;
};

const getColor = (value: number) => {
  if (value > 60) {
    return 'success';
  }
  if (value > 20) {
    return 'primary';
  }
  return 'default';
};

const UserProgressBar = ({ value }: Props) => {
  return (
    <div className='relative'>
      <Progress
        size='lg'
        aria-label={`${value}%`}
        value={value}
        color={getColor(value)}
      />
      <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center text-xs font-medium text-white'>
        {value}%
      </div>
    </div>
  );
};

export default UserProgressBar;
