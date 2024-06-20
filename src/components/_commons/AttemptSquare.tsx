import React from 'react';
import clsx from 'clsx';

type Props = {
  status?: 'correct' | 'wrong' | 'unplayed';
  size?: number;
};

const AttemptSquare: React.FC<Props> = ({ status = 'unplayed', size = 16 }) => {
  const baseClasses = 'flex items-center justify-center rounded-sm';
  const statusClasses = clsx({
    'bg-green-500 border-green-500': status === 'correct',
    'bg-red-500 border-red-500': status === 'wrong',
    'bg-transparent border-gray-500': status === 'unplayed',
  });

  return (
    <div
      className={`${baseClasses} ${statusClasses}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: '2px',
      }}
    ></div>
  );
};

export default AttemptSquare;
