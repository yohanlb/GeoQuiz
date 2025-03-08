import React from 'react';
import ContinentsSection from '@features/decks/components/ContinentsSection';
import DifficultySection from '@features/decks/components/DifficultySection';
import FeaturedAndPopularSection from '@features/decks/components/FeaturedAndPopularSection';
import RegionSection from '@features/decks/components/RegionSection';
import {
  getDecks,
  getFeaturedDecks,
} from '@features/decks/server/db/decks-rest';
import DailyChallengesSection from '@features/welcome/components/home/DailyChallengesSection';
import UpdateMessageAlert from '@features/welcome/components/home/UpdateMessageAlert';
import { navigationLinks } from '@lib/data/navigation-links';
import PageCenteredLink from '@components/global/PageCenteredLink';

// const UnplayedDecksSection = dynamic(
//   () => import('@features/decks/components/UnplayedDecksSection'),
//   {
//     ssr: false,
//   },
// );

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
      <DailyChallengesSection />
      <DifficultySection decks={decks} />
      {/* <UnplayedDecksSection decks={decks} /> */}
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
