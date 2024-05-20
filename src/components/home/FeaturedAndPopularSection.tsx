import React from 'react';
import DeckGrid from './DeckGrid';

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
      <h2>Featured and Popular 🔥</h2>
      <DeckGrid decks={featuredAndPopularDecks.slice(0, howManyToDisplay)} />
    </section>
  );
};

export default FeaturedAndPopularSection;
