import React from 'react';
import { getDecks } from '../../../queries/gameDecks';
import dynamic from 'next/dynamic';
import FeaturedAndPopularSection from '@components/home/FeaturedAndPopularSection';
import DifficultySection from '@components/home/DifficultySection';
import PageCenteredLink from '@components/_commons/PageCenteredLink';
import ContinentsSection from '@components/home/ContinentsSection';
import { navigationLinks } from '@lib/navigationLinks';

// Dynamically import components to avoid client-side hydration
const UnplayedDecksSection = dynamic(
  () => import('@components/home/UnplayedDecksSection'),
  {
    ssr: false,
  },
);
const LowestScoresDecksSection = dynamic(
  () => import('@components/home/LowestScoresDecksSection'),
  {
    ssr: false,
  },
);

async function Home() {
  const decks = await getDecks();

  return (
    <div className='flex flex-col gap-6 px-4 py-2 text-center md:px-0'>
      <FeaturedAndPopularSection decks={decks} />
      <DifficultySection decks={decks} />
      <LowestScoresDecksSection decks={decks} />
      <UnplayedDecksSection decks={decks} />
      <ContinentsSection decks={decks} />
      <PageCenteredLink
        href={navigationLinks.allDecks.href}
        label='See all decks'
      />
    </div>
  );
}

export default Home;