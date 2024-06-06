import React from 'react';
import { getAllCountries } from '@/src/queries/countries';
import { getDecks } from '@/src/queries/gameDecks';
import { navigationLinks } from '@lib/navigationLinks';
import PageCenteredLink from '@components/_commons/PageCenteredLink';
import SectionTitle from '@components/_commons/SectionTitle';
import CountryHistory from '@components/history/CountryHistory';
import DeckHistory from '@components/history/DeckHistory';

const History = async () => {
  const decks = await getDecks();
  const countries = await getAllCountries();

  return (
    <div className='flex flex-col gap-6 px-4 py-2 md:px-0'>
      <SectionTitle text='Stats and History' />
      <CountryHistory countries={countries} />
      <DeckHistory decks={decks} />
      <PageCenteredLink href={navigationLinks.home.href} label='Back' />
    </div>
  );
};

export default History;
