import React from 'react';
import SectionTitle from '@components/_commons/SectionTitle';
import DeckGrid from './DeckGrid';

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
      <SectionTitle
        variant='description'
        text="Discover decks by difficulty, ranked by the community's average success scores per country."
      />
      <DeckGrid decks={sortedDecks} />
    </section>
  );
};

export default DifficultySection;
