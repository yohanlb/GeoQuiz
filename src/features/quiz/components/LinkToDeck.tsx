import React from 'react';
import useGameStore from '@stores/game-store';
import Link from 'next/link';

const LinkToDeck = () => {
  const { deck } = useGameStore();

  if (!deck) {
    return null;
  }

  return (
    <div className='w-full text-center'>
      <p className='mb-2'>
        Deck:{' '}
        <Link
          href={`/decks/${deck.name}`}
          rel='canonical'
          className='underline underline-offset-2'
        >
          {deck.displayName}
        </Link>
      </p>
    </div>
  );
};

export default LinkToDeck;
