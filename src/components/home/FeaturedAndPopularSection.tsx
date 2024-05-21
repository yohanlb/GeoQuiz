import React from 'react';
import DeckGrid from './DeckGrid';
import SectionTitle from '@components/_commons/SectionTitle';

type Props = {
  decks: Deck[];
};

const FeaturedAndPopularSection = ({ decks }: Props) => {
  const howManyToDisplay = 6;

  const featuredAndPopularDecks = decks.filter((deck) =>
    deck.categories?.includes('featured'),
  );

  return (
    <section>
      <SectionTitle text='Featured and Popular 🔥' />
      <DeckGrid decks={featuredAndPopularDecks.slice(0, howManyToDisplay)} />
    </section>
  );
};

export default FeaturedAndPopularSection;
