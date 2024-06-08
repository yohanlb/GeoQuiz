'use client';

import React from 'react';
import { FaRegFlag } from 'react-icons/fa6';
import { PiCity } from 'react-icons/pi';
import { useCountryHistory } from '@/src/stores/countryHistoryStore';
import useGameStore from '@/src/stores/gameStore';
import UserProgressBar from './UserProgressBar';

type Props = {
  countryIds: CountryData['id'][];
  hideTitle?: boolean;
  onlyCurrentQuestionType?: boolean;
};

const UserProgress = ({
  countryIds,
  hideTitle = false,
  onlyCurrentQuestionType = false,
}: Props) => {
  const { getProgressPercentForCountryIds } = useCountryHistory();
  const progress = getProgressPercentForCountryIds(countryIds); // TODO can maybe optimize when countryIds.length === 1

  const { questionType } = useGameStore();

  const lineCapital = (
    <div className='flex items-center gap-1'>
      <PiCity className='size-6 shrink-0' />
      <div className='col-span-2 w-20'>
        <UserProgressBar value={progress} />
      </div>
      <span className='font-mono font-medium'>{progress}%</span>
    </div>
  );

  const lineFlag = (
    <div className='flex items-center gap-1'>
      <FaRegFlag className='size-6 shrink-0' />
      <div className='col-span-2 w-20'>
        <UserProgressBar value={0} />
      </div>
      <span className='font-mono font-medium'>__%</span>
    </div>
  );

  return (
    <div className='flex flex-col gap-2'>
      {!hideTitle && <p className='font-normal leading-none'>Your Progress</p>}
      {(questionType === 'CountryToCapital' || !onlyCurrentQuestionType) &&
        lineCapital}
      {(questionType === 'CountryToFlag' || !onlyCurrentQuestionType) &&
        lineFlag}
    </div>
  );
};

export default UserProgress;
