import { getDecks } from '@/src/queries/gameDecks';
import DeckList from '@components/decks/DeckList';
import Link from 'next/link';
import React from 'react';

async function page() {
  const decks = await getDecks();
  decks.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className='mx-auto max-w-md px-2 md:px-0'>
      <h2 className='my-2 text-base tracking-wide'>All Decks</h2>
      <DeckList decks={decks} />
      <div className='mt-4 w-full text-center'>
        <Link
          href='/'
          className='underline underline-offset-4 hover:text-blue-500'
        >
          Back
        </Link>
      </div>
    </div>
  );
}

export default page;
