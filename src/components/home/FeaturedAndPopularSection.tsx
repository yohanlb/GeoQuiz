import React from 'react';
import GameDeckGrid from './GameDeckGrid';

type Props = {
  decks: Deck[];
};

const FeaturedAndPopularSection = ({ decks }: Props) => {
  const howManyToDisplay = 6;

  return (
    <section>
      <h2>Featured and Popular 🔥</h2>
      <GameDeckGrid decks={decks.slice(0, howManyToDisplay)} />
    </section>
  );
};

export default FeaturedAndPopularSection;
