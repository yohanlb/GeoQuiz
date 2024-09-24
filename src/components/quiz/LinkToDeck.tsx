import React from 'react';
import useGameStore from '@/src/utils/stores/gameStore';
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
          className='underline underline-offset-2'
        >
          {deck.displayName}
        </Link>
      </p>
    </div>
  );
};

export default LinkToDeck;
