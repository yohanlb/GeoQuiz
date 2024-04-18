import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Chip = ({ children }: Props) => {
  return (
    <div className='bg-background rounded-full bg-opacity-50 px-1 py-0.5 text-sm font-extralight'>
      {children}
    </div>
  );
};

export default Chip;
