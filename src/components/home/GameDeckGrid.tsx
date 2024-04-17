import React from 'react';
import GameDeckCard from './GameDeckCard';
import Link from 'next/link';

type Props = {
  gameDecks: GameDeck[];
};

const GameDeckGrid = ({ gameDecks }: Props) => {
  return (
    <div className='grid grid-cols-2 gap-2 px-2 md:grid-cols-3 md:gap-4 md:px-0'>
      {gameDecks.map((gameDeck) => (
        <Link key={gameDeck.name} href={`/setup/${gameDeck.name}`}>
          <GameDeckCard key={gameDeck.name} gameDeck={gameDeck} />
        </Link>
      ))}
    </div>
  );
};

export default GameDeckGrid;
