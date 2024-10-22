import React from 'react';
import FilterableDeckList from '@features/decks/components/FilterableDeckList';
import { getDecks } from '@features/decks/server/db/decks';
import { navigationLinks } from '@lib/data/navigation-links';
import PageCenteredLink from '@components/global/PageCenteredLink';
import SectionTitle from '@components/global/SectionTitle';

export const metadata = {
  title: 'Decks',
  description: 'Select a deck to start the quiz.',
};

async function page() {
  const decks = await getDecks();
  decks.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className='flex w-full flex-col gap-2 px-2 py-2 md:px-0'>
      <SectionTitle text='All Decks' />
      <FilterableDeckList decks={decks} />
      <PageCenteredLink href={navigationLinks.home.href} label='Back' />
    </div>
  );
}

export default page;
