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
};

const ProgressLine = ({ icon: Icon, progress }: ProgressLineProps) => (
  <div className='flex items-center gap-2'>
    <Icon className='size-6 shrink-0' />
    <div className='col-span-2 w-32'>
      <UserProgressBar value={progress} />
    </div>
  </div>
);

const UserProgress = ({
  countryIds,
  hideTitle = false,
  onlyCurrentQuestionType = false,
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
          icon={onlyCurrentQuestionType ? GiProgression : PiCity}
          progress={progress}
        />
      )}
      {(questionType === 'CountryToFlag' || !onlyCurrentQuestionType) && (
        <ProgressLine
          icon={onlyCurrentQuestionType ? GiProgression : FaRegFlag}
          progress={progress}
        />
      )}
    </div>
  );
};

export default UserProgress;
