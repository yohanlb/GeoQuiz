import React from 'react';
import SectionTitle from '@components/_commons/SectionTitle';
import DeckGrid from './DeckGrid';

type Props = {
  decks: Deck[];
};

const RegionSection = ({ decks }: Props) => {
  const howManyToDisplay = 6;

  const continentsDecks = decks.filter((deck) =>
    deck.categories?.includes('subregion'),
  );

  return (
    <section>
      <SectionTitle text='Regions' />
      <SectionTitle
        text='A selection of different regions of the world.'
        variant='description'
      />
      <DeckGrid decks={continentsDecks.slice(0, howManyToDisplay)} />
    </section>
  );
};

export default RegionSection;
