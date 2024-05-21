import { getAllCountries } from '@/src/queries/countries';
import { getDecks } from '@/src/queries/gameDecks';
import PageCenteredLink from '@components/_commons/PageCenteredLink';
import CountryStats from '@components/stats/CountryStats';
import DeckStats from '@components/stats/DeckStats';
import React from 'react';

const Stats = async () => {
  const decks = await getDecks();
  const countries = await getAllCountries();

  return (
    <div className='flex flex-col gap-6 px-4 py-2 md:px-0 md:[&_h2]:text-xl'>
      <h1 className='font-base text-center text-xl'>Stats and History</h1>
      <CountryStats countries={countries} />
      <DeckStats decks={decks} />
      <PageCenteredLink href='/' label='Back' />
    </div>
  );
};

export default Stats;
