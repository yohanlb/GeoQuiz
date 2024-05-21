import { getDecks } from '@/src/queries/gameDecks';
import PageCenteredLink from '@components/_commons/PageCenteredLink';
import DeckList from '@components/decks/DeckList';
import React from 'react';

async function page() {
  const decks = await getDecks();
  decks.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className='mx-auto max-w-md px-2 md:px-0'>
      <h2 className='my-2 text-base tracking-wide'>All Decks</h2>
      <DeckList decks={decks} />
      <PageCenteredLink href='/' label='Back' />
    </div>
  );
}

export default page;
