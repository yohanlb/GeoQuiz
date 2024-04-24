import React from 'react';
import GameDeckCard from './GameDeckCard';
import Link from 'next/link';

type Props = {
  decks: Deck[];
};

const GameDeckGrid = ({ decks }: Props) => {
  return (
    <div className='grid grid-cols-2 justify-items-center gap-x-3 gap-y-2 px-3 md:grid-cols-3 md:gap-x-4 md:gap-y-2 md:px-0'>
      {decks.map((deck) => (
        <Link key={deck.name} href={`/setup/${deck.name}`} className='w-full'>
          <GameDeckCard key={deck.name} deck={deck} />
        </Link>
      ))}
    </div>
  );
};

export default GameDeckGrid;
