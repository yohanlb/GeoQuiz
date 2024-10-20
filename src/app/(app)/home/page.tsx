import React from 'react';
import { navigationLinks } from '@data/navigationLinks';
import dynamic from 'next/dynamic';
import PageCenteredLink from '@components/_commons/PageCenteredLink';
import ContinentsSection from '@components/home/ContinentsSection';
import CountryOfTheDay from '@components/home/CountryOfTheDay';
import DifficultySection from '@components/home/DifficultySection';
import FeaturedAndPopularSection from '@components/home/FeaturedAndPopularSection';
import RegionSection from '@components/home/RegionSection';
import UpdateMessageAlert from '@components/home/UpdateMessageAlert';
import { getDecks, getFeaturedDecks } from '../../../lib/queries/gameDecks';

const UnplayedDecksSection = dynamic(
  () => import('@components/home/UnplayedDecksSection'),
  {
    ssr: false,
  },
);

export const metadata = {
  title: 'Home',
  description: 'Select a deck to start the quiz!',
};

async function Home() {
  const decks = await getDecks();
  const featuredDecks = await getFeaturedDecks();

  return (
    <div className='flex flex-col gap-12 px-4 py-4 text-center md:px-0'>
      <UpdateMessageAlert />
      <FeaturedAndPopularSection featuredDecks={featuredDecks} />
      <CountryOfTheDay />
      <DifficultySection decks={decks} />
      <UnplayedDecksSection decks={decks} />
      <ContinentsSection decks={decks} />
      <RegionSection decks={decks} />
      <PageCenteredLink
        href={navigationLinks.allDecks.href}
        label='See all decks'
      />
    </div>
  );
}

export default Home;
