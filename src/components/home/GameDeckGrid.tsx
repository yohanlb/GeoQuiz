import React from 'react';
import GameDeckCard from './GameDeckCard';
import Link from 'next/link';

type Props = {
  gameDecks: GameDeck[];
};

const GameDeckGrid = ({ gameDecks }: Props) => {
  return (
    <div className='grid grid-cols-2 justify-items-center gap-x-3 gap-y-2 px-3 md:grid-cols-3 md:gap-x-4 md:gap-y-2 md:px-0'>
      {gameDecks.map((gameDeck) => (
        <Link
          key={gameDeck.name}
          href={`/setup/${gameDeck.name}`}
          className='w-full'
        >
          <GameDeckCard key={gameDeck.name} gameDeck={gameDeck} />
        </Link>
      ))}
    </div>
  );
};

export default GameDeckGrid;
