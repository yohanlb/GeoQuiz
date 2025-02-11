import React from 'react';
import clsx from 'clsx';

const bgColors = [
  'bg-blue-700',
  'bg-blue-700',
  'bg-sky-600',
  'bg-green-700',
  'bg-green-500',
  'bg-green-400',
  'bg-orange-500',
  'bg-orange-600',
  'bg-red-600',
  'bg-red-700',
];

const sizeClasses = {
  xl: 'w-6 h-6 text-base md:w-7 md:h-7 md:text-xl',
  md: 'w-5 h-5 text-sm md:w-6 md:h-6 md:text-lg',
  sm: 'w-4 h-4 text-xs md:w-5 md:h-5 md:text-base',
};

type Props = {
  digit: number;
  size?: 'xl' | 'md' | 'sm';
};

const DifficultyIndex: React.FC<Props> = ({ digit, size = 'sm' }) => {
  const bgColor = bgColors[digit];

  return (
    <div
      className={clsx(
        'text flex items-center justify-center rounded-md',
        sizeClasses[size],
        bgColor,
      )}
    >
      {digit}
    </div>
  );
};

export default DifficultyIndex;
