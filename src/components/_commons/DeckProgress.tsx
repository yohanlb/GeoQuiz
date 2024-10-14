'use client';

import React from 'react';
import { useCountryHistory } from '@/src/utils/stores/countryHistoryStore';
import { Progress } from '@nextui-org/react';

type Props = {
  countryIds: CountryRecord['id'][];
  width?: 'lg' | 'md' | 'sm';
};

const getColor = (value: number) => {
  if (value > 60) {
    return 'success';
  }
  if (value > 20) {
    return 'primary';
  }
  return 'default';
};

export const PopoverContentDeckProgress = () => {
  return (
    <div className='flex flex-col gap-2 p-4'>
      <h4 className='text-xl font-medium'>Deck Progression Percentage:</h4>
      <p>
        It is calculated based on your results for every country in this deck.
      </p>
      <p>
        The more countries you answer correctly, the higher your progress will
        be.
      </p>
    </div>
  );
};

const DeckProgress = ({ countryIds, width = 'md' }: Props) => {
  const { getProgressPercentForCountryIds } = useCountryHistory();
  const progress = getProgressPercentForCountryIds(countryIds);

  let widthClass = 'w-32';
  if (width === 'lg') {
    widthClass = 'w-48';
  } else if (width === 'sm') {
    widthClass = 'w-16';
  }
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-2'>
        <div className={`col-span-2 ${widthClass}`}>
          <div className='relative'>
            <Progress
              size='lg'
              aria-label={`${progress}%`}
              value={progress}
              color={getColor(progress)}
            />
            <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center text-xs font-medium text-white'>
              {progress}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeckProgress;
