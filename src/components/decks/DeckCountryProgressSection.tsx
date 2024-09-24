'use client';

import React from 'react';
import useGameStore from '@/src/utils/stores/gameStore';
import CountryScoreOverview, {
  PopoverContentScoreOverview,
} from '@components/_commons/CountryScoreOverview';
import DeckProgress, {
  PopoverContentDeckProgress,
} from '@components/_commons/DeckProgress';
import PopoverCustom from '@components/_commons/Popover';

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
      <PopoverCustom content={PopoverContentScoreOverview()} placement='top'>
        <CountryScoreOverview countryIds={countryIds} />
      </PopoverCustom>
      <PopoverCustom content={PopoverContentDeckProgress()} placement='top'>
        <span className='flex items-center gap-2'>
          Progress:
          <DeckProgress countryIds={countryIds} />
        </span>
      </PopoverCustom>
    </div>
  );
};

export default DeckCountryProgressSection;
