import { getDecks } from '@/src/queries/gameDecks';
import PageCenteredLink from '@components/_commons/PageCenteredLink';
import DeckStats from '@components/stats/DeckStats';
import React from 'react';

const Stats = async () => {
  const decks = await getDecks();

  return (
    <div className='flex flex-col gap-6 px-4 py-2 md:px-0 md:[&_h2]:text-xl'>
      <DeckStats decks={decks} />
      <PageCenteredLink href='/' label='Back' />
    </div>
  );
};

export default Stats;
