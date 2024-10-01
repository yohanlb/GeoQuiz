import React from 'react';
import clsx from 'clsx';

type Props = {
  status?: UserResultsStatus;
  size?: number;
  isLast?: boolean;
};

const AttemptSquare: React.FC<Props> = ({
  status = 'unplayed',
  size = 16,
  isLast = false,
}) => {
  const baseClasses = 'flex items-center justify-center rounded-sm border-2';
  const statusClasses = clsx({
    'bg-green-500 border-green-500': status === 'valid',
    'bg-red-500 border-red-500': status === 'invalid',
    'bg-transparent border-gray-500': status === 'default',
  });

  const boxShadow = isLast ? '0 0 4px rgba(0, 0, 0, 0.5)' : 'none';

  return (
    <div
      className={`${baseClasses} ${statusClasses}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        boxShadow: boxShadow,
      }}
    ></div>
  );
};

export default AttemptSquare;
