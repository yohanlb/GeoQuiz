import React from 'react';

type Props = {
  percent: number;
};

const StarsIndicator = ({ percent }: Props) => {
  const getStarClass = (starNumber: number) => {
    if (100 - percent >= (starNumber - 1) * 33.33) {
      return 'text-yellow-500';
    }
    return 'text-gray-300';
  };

  return (
    <div className='flex items-center'>
      {[1, 2, 3].map((star) => (
        <svg
          key={star}
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 24 24'
          stroke='currentColor'
          className={`h-4 w-4 ${getStarClass(star)}`}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1}
            d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.908c.969 0 1.371 1.24.588 1.81l-3.973 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.973-2.883a1 1 0 00-1.175 0l-3.973 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.82 10.1c-.783-.57-.38-1.81.588-1.81h4.908a1 1 0 00.95-.69l1.518-4.674z'
          />
        </svg>
      ))}
    </div>
  );
};

export default StarsIndicator;
