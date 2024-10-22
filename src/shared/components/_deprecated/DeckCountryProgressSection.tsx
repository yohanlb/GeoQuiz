'use client';

import React from 'react';
import CountryScoreOverview, {
  PopoverContentScoreOverview,
} from '@shared/components/global/CountryScoreOverview';
import DeckProgress, {
  PopoverContentDeckProgress,
} from '@shared/components/global/DeckProgress';
import PopoverCustom from '@shared/components/global/Popover';
import useGameStore from '@stores/game-store';

type Props = {
  countryIds: CountryRecord['id'][];
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