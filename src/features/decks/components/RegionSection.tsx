import React from 'react';
import DeckGrid from '@features/decks/components/DeckGrid';
import SectionTitle from '@components/global/SectionTitle';

type Props = {
  decks: DeckWithStatsRecord[];
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
