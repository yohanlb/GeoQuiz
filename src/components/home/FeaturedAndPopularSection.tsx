import React from 'react';
import SectionTitle from '@components/_commons/SectionTitle';
import DeckGrid from './DeckGrid';

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
