import React from 'react';
import { getDecks } from '@/src/utils/queries/gameDecks';
import { navigationLinks } from '@lib/navigationLinks';
import PageCenteredLink from '@components/_commons/PageCenteredLink';
import SectionTitle from '@components/_commons/SectionTitle';
import FilterableDeckList from '@components/decks/FilterableDeckList';

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
