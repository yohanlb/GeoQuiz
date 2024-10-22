import React from 'react';

const LoadingSpinner = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='42'
      height='42'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={'animate-spin'}
    >
      <path d='M21 12a9 9 0 1 1-6.219-8.56' />
    </svg>
  );
};

export default LoadingSpinner;
