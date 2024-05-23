import React from 'react';
import DeckGrid from './DeckGrid';
import SectionTitle from '@components/_commons/SectionTitle';

type Props = {
  decks: Deck[];
};

const defaultPriority = 50;

const FeaturedAndPopularSection = ({ decks }: Props) => {
  const howManyToDisplay = 6;

  const featuredAndPopularDecks = decks.filter((deck) =>
    deck.categories?.includes('featured'),
  );

  const sortedDecks = featuredAndPopularDecks
    .sort(
      (a, b) =>
        (a.displayPriority || defaultPriority) -
        (b.displayPriority || defaultPriority),
    )
    .slice(0, howManyToDisplay);

  return (
    <section>
      <SectionTitle text='Featured and Popular 🔥' />
      <DeckGrid decks={sortedDecks.slice(0, howManyToDisplay)} />
    </section>
  );
};

export default FeaturedAndPopularSection;
