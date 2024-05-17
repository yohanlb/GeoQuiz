import React from 'react';
import { getDecks } from '../queries/gameDecks';
import dynamic from 'next/dynamic';
import FeaturedAndPopularSection from '@components/home/FeaturedAndPopularSection';

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
    <div className='flex flex-col gap-6 px-4 py-2 text-center md:px-0 md:[&_h2]:text-xl'>
      <FeaturedAndPopularSection decks={decks} />
      <UnplayedDecksSection decks={decks} />
      <LowestScoresDecksSection decks={decks} />
    </div>
  );
}

export default Home;
