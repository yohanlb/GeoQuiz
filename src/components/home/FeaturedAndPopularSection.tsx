import React from 'react';
import GameDeckGrid from './GameDeckGrid';

type Props = {
  decks: Deck[];
};

const FeaturedAndPopularSection = ({ decks }: Props) => {
  const howManyToDisplay = 6;

  const featuredAndPopularDecks = decks.filter(
    (deck) =>
      deck.categories?.includes('featured') ||
      deck.categories?.includes('popular'),
  );

  console.log('LOGGG', featuredAndPopularDecks.length);

  return (
    <section>
      <h2>Featured and Popular 🔥</h2>
      <GameDeckGrid
        decks={featuredAndPopularDecks.slice(0, howManyToDisplay)}
      />
    </section>
  );
};

export default FeaturedAndPopularSection;
