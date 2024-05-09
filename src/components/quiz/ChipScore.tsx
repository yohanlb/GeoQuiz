import React from 'react';
import personIcon from '@assets/person-icon.svg';
import Image from 'next/image';

type Props = {
  label?: string;
};

const ChipScore = ({ label }: Props) => {
  if (label === undefined) {
    return <div className='flex gap-1'></div>;
  }
  return (
    <div className='flex gap-1'>
      <Image src={personIcon} width={16} height={16} alt='score-icon' />
      <span className='text-xs'>{label}</span>
    </div>
  );
};

export default ChipScore;
