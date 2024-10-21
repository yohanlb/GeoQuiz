import React from 'react';
import DeckCard from './DeckCard';

type Props = {
  decks: DeckWithStatsRecord[];
};

const DeckGrid = ({ decks }: Props) => {
  return (
    <div className='grid grid-cols-2 justify-items-center gap-x-3 gap-y-2 py-1 md:grid-cols-3 md:gap-x-4 md:gap-y-2 md:px-0'>
      {decks.map((deck) => (
        <DeckCard key={deck.name} deck={deck} />
      ))}
    </div>
  );
};

export default DeckGrid;
