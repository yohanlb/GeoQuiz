import React from 'react';
import SectionTitle from '@components/_commons/SectionTitle';
import DeckGrid from './DeckGrid';

type Props = {
  decks: DeckWithStatsRecord[];
};

const ContinentsSection = ({ decks }: Props) => {
  const howManyToDisplay = 6;

  const continentsDecks = decks.filter((deck) =>
    deck.categories?.includes('continent'),
  );

  return (
    <section>
      <SectionTitle text='Continents 🌏' />
      <SectionTitle
        text='Explore decks organized by continents.'
        variant='description'
      />
      <DeckGrid decks={continentsDecks.slice(0, howManyToDisplay)} />
    </section>
  );
};

export default ContinentsSection;
