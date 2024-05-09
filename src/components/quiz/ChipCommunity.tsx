import React from 'react';
import peopleIcon from '@assets/people-icon.svg';
import Image from 'next/image';

type Props = {
  label: string;
};

const ChipCommunity = ({ label }: Props) => {
  return (
    <div className='flex gap-1'>
      <Image
        src={peopleIcon}
        width={16}
        height={16}
        alt='community-score-icon'
      />
      <span className='text-xs'>{label}</span>
    </div>
  );
};

export default ChipCommunity;
