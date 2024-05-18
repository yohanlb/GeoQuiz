import React from 'react';
import GameDeckGrid from './GameDeckGrid';

type Props = {
  decks: Deck[];
};

const FeaturedAndPopularSection = ({ decks }: Props) => {
  const featuredAndPopularDecks = decks.filter(
    (deck) =>
      deck.categories?.includes('featured') ||
      deck.categories?.includes('popular'),
  );

  console.log('LOGGG', featuredAndPopularDecks.length);

  return (
    <section>
      <h2>Featured and Popular 🔥</h2>
      <GameDeckGrid decks={featuredAndPopularDecks} />
    </section>
  );
};

export default FeaturedAndPopularSection;
