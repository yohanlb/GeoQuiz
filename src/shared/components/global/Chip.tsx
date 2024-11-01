import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Chip = ({ children }: Props) => {
  return (
    <div className='rounded-full bg-background bg-opacity-0 px-1 py-0.5 text-sm font-extralight duration-100 group-hover:bg-opacity-70'>
      {children}
    </div>
  );
};

export default Chip;
