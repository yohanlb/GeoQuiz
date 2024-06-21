'use client';

import React from 'react';
import { useCountryHistory } from '@/src/stores/countryHistoryStore';
import UserProgressBar from './UserProgressBar';

type Props = {
  countryIds: CountryData['id'][];
  width?: 'lg' | 'md' | 'sm';
};

type ProgressLineProps = {
  progress: number;
  width?: 'lg' | 'md' | 'sm';
};

const ProgressLine = ({ progress, width = 'md' }: ProgressLineProps) => {
  let widthClass = 'w-32';
  if (width === 'lg') {
    widthClass = 'w-48';
  } else if (width === 'sm') {
    widthClass = 'w-16';
  }

  return (
    <div className='flex items-center gap-2'>
      <div className={`col-span-2 ${widthClass}`}>
        <UserProgressBar value={progress} />
      </div>
    </div>
  );
};

const UserProgress = ({ countryIds, width = 'md' }: Props) => {
  const { getProgressPercentForCountryIds } = useCountryHistory();
  const progress = getProgressPercentForCountryIds(countryIds);

  return (
    <div className='flex flex-col gap-2'>
      <ProgressLine width={width} progress={progress} />
    </div>
  );
};

export default UserProgress;
