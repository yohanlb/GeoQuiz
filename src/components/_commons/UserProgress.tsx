'use client';

import React from 'react';
import { FaRegFlag } from 'react-icons/fa6';
import { GiProgression } from 'react-icons/gi';
import { PiCity } from 'react-icons/pi';
import { useCountryHistory } from '@/src/stores/countryHistoryStore';
import useGameStore from '@/src/stores/gameStore';
import UserProgressBar from './UserProgressBar';

type Props = {
  countryIds: CountryData['id'][];
  hideTitle?: boolean;
  onlyCurrentQuestionType?: boolean;
};

type ProgressLineProps = {
  icon: React.ComponentType<{ className?: string }>;
  progress: number;
  placeholder?: boolean;
};

const ProgressLine = ({
  icon: Icon,
  progress,
  placeholder = false,
}: ProgressLineProps) => (
  <div className='flex items-center gap-1'>
    <Icon className='size-6 shrink-0' />
    <div className='col-span-2 w-20'>
      <UserProgressBar value={placeholder ? 0 : progress} />
    </div>
    <span className='font-mono font-medium'>
      {placeholder ? '__' : progress}%
    </span>
  </div>
);

const UserProgress = ({
  countryIds,
  hideTitle = false,
  onlyCurrentQuestionType = false,
}: Props) => {
  const { getProgressPercentForCountryIds } = useCountryHistory();
  const progress = getProgressPercentForCountryIds(countryIds);

  const { questionType } = useGameStore();

  return (
    <div className='flex flex-col gap-2'>
      {!hideTitle && <p className='font-normal leading-none'>Your Progress</p>}
      {(questionType === 'CountryToCapital' || !onlyCurrentQuestionType) && (
        <ProgressLine
          icon={onlyCurrentQuestionType ? GiProgression : PiCity}
          progress={progress}
        />
      )}
      {(questionType === 'CountryToFlag' || !onlyCurrentQuestionType) && (
        <ProgressLine
          icon={onlyCurrentQuestionType ? GiProgression : FaRegFlag}
          progress={0}
          placeholder
        />
      )}
    </div>
  );
};

export default UserProgress;
