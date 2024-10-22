import React from 'react';
import DeckGrid from '@features/decks/components/DeckGrid';
import SectionTitle from '@shared/components/global/SectionTitle';

type Props = {
  featuredDecks: DeckWithStatsRecord[];
};

const FeaturedAndPopularSection = ({ featuredDecks }: Props) => {
  const howManyToDisplay = 6;

  return (
    <section>
      <SectionTitle text='Featured and Popular 🔥' />
      <SectionTitle
        text='Explore popular and featured decks, favored by the community.'
        variant='description'
      />
      <DeckGrid decks={featuredDecks.slice(0, howManyToDisplay)} />
    </section>
  );
};

export default FeaturedAndPopularSection;
