import React from 'react';

const Gauge = ({
  value,
  variant = 'score',
}: {
  value: number;
  variant?: 'progress' | 'score';
}) => {
  const clampedValue = Math.max(Math.min(value, 100), 0);

  let color = 'bg-green-500';

  if (value < 66) {
    if (variant === 'progress') {
      color = 'bg-blue-500';
    } else {
      color = 'bg-yellow-500';
    }
  }
  if (value < 33) {
    if (variant === 'progress') {
      color = 'bg-gray-800';
    } else {
      color = 'bg-red-500';
    }
  }

  return (
    <div className='relative h-4 w-16 rounded-full bg-gray-800'>
      <div
        className={`absolute h-full ${color} rounded-full`}
        style={{ width: `${clampedValue}%` }}
      ></div>
      <div className='font-base absolute left-0 top-0 flex  h-full w-full items-center justify-center text-xs text-white'>
        {value}%
      </div>
    </div>
  );
};

export default Gauge;
