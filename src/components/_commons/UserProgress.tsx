'use client';

import React from 'react';
import { FaRegFlag } from 'react-icons/fa6';
import { PiCity } from 'react-icons/pi';
import { useCountryHistory } from '@/src/stores/countryHistoryStore';
import UserProgressBar from './UserProgressBar';

type Props = { deck: Deck };

const UserProgress = ({ deck }: Props) => {
  const { getProgressPercentForCountryIds } = useCountryHistory();
  const progress = getProgressPercentForCountryIds(deck.countryIds);

  return (
    <div className='flex flex-col gap-2'>
      <p className='font-normal leading-none'>Your Progress</p>
      <div className='flex items-center gap-1'>
        <PiCity className='size-6 shrink-0' />
        <div className='col-span-2 w-20'>
          <UserProgressBar value={progress} />
        </div>
        <span className='font-mono font-medium'>{progress}%</span>
      </div>
      <div className='flex items-center gap-1'>
        <FaRegFlag className='size-6 shrink-0' />
        <div className='col-span-2 w-20'>
          <UserProgressBar value={0} />
        </div>
        <span className='font-mono font-medium'>__%</span>
      </div>
    </div>
  );
};

export default UserProgress;
