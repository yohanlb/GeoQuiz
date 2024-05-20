import { getDecks } from '@/src/queries/gameDecks';
import DeckList from '@components/decks/DeckList';
import Link from 'next/link';
import React from 'react';

async function page() {
  const decks = await getDecks();

  return (
    <div className='mx-auto max-w-md px-2 md:px-0'>
      <h2 className='my-2 text-base tracking-wide'>All Decks</h2>
      <DeckList decks={decks} />
      <div className='mt-4 w-full text-center'>
        <Link href='/' className='text-blue-500 hover:underline'>
          Back
        </Link>
      </div>
    </div>
  );
}

export default page;
