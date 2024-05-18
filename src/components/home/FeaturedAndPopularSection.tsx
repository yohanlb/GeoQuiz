import React from 'react';
import GameDeckGrid from './GameDeckGrid';

type Props = {
  decks: Deck[];
};

const FeaturedAndPopularSection = ({ decks }: Props) => {
  const howManyToDisplay = 6;

  const featuredAndPopularDecks = decks.filter((deck) =>
    deck.categories?.includes('featured'),
  );

  console.log(
    featuredAndPopularDecks.map((deck) => [
      deck.id,
      deck.name,
      deck.categories,
    ]),
  );

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
