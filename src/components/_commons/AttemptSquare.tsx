import React from 'react';
import clsx from 'clsx';

type Props = {
  status?: 'correct' | 'wrong' | 'unplayed';
  size?: number;
  isLast?: boolean;
};

const AttemptSquare: React.FC<Props> = ({
  status = 'unplayed',
  size = 16,
  isLast = false,
}) => {
  const baseClasses = 'flex items-center justify-center rounded-sm';
  const statusClasses = clsx({
    'bg-green-500 border-green-500': status === 'correct',
    'bg-red-500 border-red-500': status === 'wrong',
    'bg-transparent border-gray-500': status === 'unplayed',
  });

  const actualSize = isLast ? size : size - 4;

  return (
    <div
      className={`${baseClasses} ${statusClasses}`}
      style={{
        width: `${actualSize}px`,
        height: `${actualSize}px`,
        borderWidth: '2px',
      }}
    ></div>
  );
};

export default AttemptSquare;
