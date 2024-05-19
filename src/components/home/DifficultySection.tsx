import React from 'react';
import GameDeckGrid from './GameDeckGrid';

type Props = {
  decks: Deck[];
};

const defaultPriority = 50;

const DifficultySection = ({ decks }: Props) => {
  const howManyToDisplay = 3;

  const difficultyDecks = decks.filter((deck) =>
    deck.categories?.includes('difficulty'),
  );
  const sortedDecks = difficultyDecks
    .sort(
      (a, b) =>
        (a.displayPriority || defaultPriority) -
        (b.displayPriority || defaultPriority),
    )
    .slice(0, howManyToDisplay);

  return (
    <section>
      <h2>By Difficulty 🤯</h2>
      <GameDeckGrid decks={sortedDecks} />
    </section>
  );
};

export default DifficultySection;
