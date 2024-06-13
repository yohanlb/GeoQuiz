import React from 'react';
import { getAllCountries } from '@/src/queries/countries';
import { getDecks } from '@/src/queries/gameDecks';
import { navigationLinks } from '@lib/navigationLinks';
import dynamic from 'next/dynamic';
import PageCenteredLink from '@components/_commons/PageCenteredLink';
import SectionTitle from '@components/_commons/SectionTitle';
import TabsQuestionType from '@components/_commons/TabsQuestionType';

const CountryHistory = dynamic(
  () => import('@components/history/CountryHistory'),
  {
    ssr: false,
  },
);
const DeckHistory = dynamic(() => import('@components/history/DeckHistory'), {
  ssr: false,
});

const History = async () => {
  const decks = await getDecks();
  const countries = await getAllCountries();

  return (
    <div className='flex flex-col gap-6 px-4 py-2 md:px-0'>
      <SectionTitle text='Stats and History' />
      <div className='flex justify-end'>
        <TabsQuestionType />
      </div>
      <CountryHistory countries={countries} />
      <DeckHistory decks={decks} />
      <PageCenteredLink href={navigationLinks.home.href} label='Back' />
    </div>
  );
};

export default History;
