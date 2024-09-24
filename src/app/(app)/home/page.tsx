import React from 'react';
import { navigationLinks } from '@lib/navigationLinks';
import dynamic from 'next/dynamic';
import PageCenteredLink from '@components/_commons/PageCenteredLink';
import ContinentsSection from '@components/home/ContinentsSection';
import CountryOfTheDay from '@components/home/CountryOfTheDay';
import DifficultySection from '@components/home/DifficultySection';
import FeaturedAndPopularSection from '@components/home/FeaturedAndPopularSection';
import RegionSection from '@components/home/RegionSection';
import { getDecks, getFeaturedDecks } from '../../../utils/queries/gameDecks';

// Dynamically import components to avoid client-side hydration
const UnplayedDecksSection = dynamic(
  () => import('@components/home/UnplayedDecksSection'),
  {
    ssr: false,
  },
);
// const LowestScoresDecksSection = dynamic(
//   () => import('@components/home/LowestScoresDecksSection'),
//   {
//     ssr: false,
//   },
// );

async function Home() {
  const decks = await getDecks();
  const featuredDecks = await getFeaturedDecks();

  return (
    <div className='flex flex-col gap-12 px-4 py-4 text-center md:px-0'>
      {/* <Hero /> */}
      <FeaturedAndPopularSection featuredDecks={featuredDecks} />
      <CountryOfTheDay />
      <DifficultySection decks={decks} />
      {/*  TODO Rework section to show decks already played with worst progress? 
      or keep it based on the latest deck score */}
      {/* <LowestScoresDecksSection decks={decks} /> */}
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
