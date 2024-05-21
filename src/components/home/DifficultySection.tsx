import React from 'react';
import DeckGrid from './DeckGrid';
import SectionTitle from '@components/_commons/SectionTitle';

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
      <SectionTitle text='By Difficulty 🤯' variant='h2' />
      <DeckGrid decks={sortedDecks} />
    </section>
  );
};

export default DifficultySection;
