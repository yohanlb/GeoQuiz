'use client';

import React from 'react';
import useGameStore from '@/src/stores/gameStore';
import CountryScoreOverview from '@components/_commons/CountryScoreOverview';
import UserProgress from '@components/_commons/UserProgress';

type Props = {
  countryIds: CountryData['id'][];
};

const DeckCountryProgressSection = ({ countryIds }: Props) => {
  const { questionType } = useGameStore();

  React.useEffect(() => {
    // Force re-render on questionType change
  }, [questionType]);

  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <CountryScoreOverview countryIds={countryIds} />
      <span className='flex items-center gap-2'>
        Progress:
        <UserProgress countryIds={countryIds} />
      </span>
    </div>
  );
};

export default DeckCountryProgressSection;
