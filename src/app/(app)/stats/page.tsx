import { getAllCountries } from '@/src/queries/countries';
import { getDecks } from '@/src/queries/gameDecks';
import PageCenteredLink from '@components/_commons/PageCenteredLink';
import SectionTitle from '@components/_commons/SectionTitle';
import CountryStats from '@components/stats/CountryStats';
import DeckStats from '@components/stats/DeckStats';
import { navigationLinks } from '@lib/navigationLinks';
import React from 'react';

const Stats = async () => {
  const decks = await getDecks();
  const countries = await getAllCountries();

  return (
    <div className='flex flex-col gap-6 px-4 py-2 md:px-0'>
      <SectionTitle text='Stats and History' />
      <CountryStats countries={countries} />
      <DeckStats decks={decks} />
      <PageCenteredLink href={navigationLinks.home.href} label='Back' />
    </div>
  );
};

export default Stats;
