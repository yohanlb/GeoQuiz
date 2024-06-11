'use client';

import React from 'react';
// import { FaRegFlag } from 'react-icons/fa6';
// import { GiProgression } from 'react-icons/gi';
// import { PiCity } from 'react-icons/pi';
import { useCountryHistory } from '@/src/stores/countryHistoryStore';
import useGameStore from '@/src/stores/gameStore';
import UserProgressBar from './UserProgressBar';

type Props = {
  countryIds: CountryData['id'][];
  hideTitle?: boolean;
  onlyCurrentQuestionType?: boolean;
  width?: 'lg' | 'md' | 'sm';
};

type ProgressLineProps = {
  icon?: React.ComponentType<{ className?: string }>;
  progress: number;
  width?: 'lg' | 'md' | 'sm';
};

const ProgressLine = ({
  icon: Icon,
  progress,
  width = 'md',
}: ProgressLineProps) => {
  let widthClass = 'w-32';
  if (width === 'lg') {
    widthClass = 'w-48';
  } else if (width === 'sm') {
    widthClass = 'w-16';
  }

  return (
    <div className='flex items-center gap-2'>
      {!!Icon && <Icon className='size-6 shrink-0' />}
      <div className={`col-span-2 ${widthClass}`}>
        <UserProgressBar value={progress} />
      </div>
    </div>
  );
};

const UserProgress = ({
  countryIds,
  hideTitle = false,
  onlyCurrentQuestionType = false,
  width = 'md',
}: Props) => {
  const { questionType } = useGameStore();
  const { getProgressPercentForCountryIds } = useCountryHistory();
  const progress = getProgressPercentForCountryIds(countryIds);

  return (
    <div className='flex flex-col gap-2'>
      {!hideTitle && (
        <p className='font-extralight leading-none'>Your Progress</p>
      )}
      {(questionType === 'CountryToCapital' || !onlyCurrentQuestionType) && (
        <ProgressLine
          width={width}
          // icon={onlyCurrentQuestionType ? GiProgression : PiCity}
          progress={progress}
        />
      )}
      {(questionType === 'CountryToFlag' || !onlyCurrentQuestionType) && (
        <ProgressLine
          width={width}
          // icon={onlyCurrentQuestionType ? GiProgression : FaRegFlag}
          progress={progress}
        />
      )}
    </div>
  );
};

export default UserProgress;
