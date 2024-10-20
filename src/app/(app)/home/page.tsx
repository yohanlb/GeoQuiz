import React from 'react';
import ContinentsSection from '@features/welcome/components/home/ContinentsSection';
import CountryOfTheDay from '@features/welcome/components/home/CountryOfTheDay';
import DifficultySection from '@features/welcome/components/home/DifficultySection';
import FeaturedAndPopularSection from '@features/welcome/components/home/FeaturedAndPopularSection';
import RegionSection from '@features/welcome/components/home/RegionSection';
import UpdateMessageAlert from '@features/welcome/components/home/UpdateMessageAlert';
import { navigationLinks } from '@lib/data/navigation-links';
import dynamic from 'next/dynamic';
import PageCenteredLink from '@components/_commons/PageCenteredLink';
import { getDecks, getFeaturedDecks } from '../../../lib/queries/gameDecks';

const UnplayedDecksSection = dynamic(
  () => import('@features/welcome/components/home/UnplayedDecksSection'),
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
