import React from 'react';
import DeckGrid from './DeckGrid';
import SectionTitle from '@components/_commons/SectionTitle';

type Props = {
  decks: Deck[];
};

const ContinentsSection = ({ decks }: Props) => {
  const howManyToDisplay = 6;

  const continentsDecks = decks.filter((deck) =>
    deck.categories?.includes('continent'),
  );

  return (
    <section>
      <SectionTitle text='Continents 🌏' />
      <DeckGrid decks={continentsDecks.slice(0, howManyToDisplay)} />
    </section>
  );
};

export default ContinentsSection;
