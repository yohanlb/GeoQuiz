import React from 'react';
import DeckCardUI from './DeckCardUI';

type Props = {
  deck: DeckWithStatsRecord;
};

const DeckCard = ({ deck }: Props) => {
  return (
    <div className='group relative aspect-[16/10] w-full justify-between overflow-hidden rounded-lg bg-background text-left text-sm hover:bg-zinc-700'>
      <DeckCardUI deck={deck} />
    </div>
  );
};

export default DeckCard;
