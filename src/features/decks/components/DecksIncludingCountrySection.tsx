'use client';

import React from 'react';
import DeckList from '@features/decks/components/DeckList';
import SectionTitle from '@components/global/SectionTitle';

interface Props {
  countryId: number;
  decks: DeckWithStatsRecord[];
}

const DecksIncludingCountrySection = ({ countryId, decks }: Props) => {
  const decksIncludingCountry = decks.filter((deck) =>
    deck.countryIds?.includes(countryId),
  );

  if (decksIncludingCountry.length === 0) {
    return null;
  }

  return (
    <div className='space-y-2'>
      <SectionTitle
        text='Included in the following decks'
        variant='description'
        centered={true}
      />
      <DeckList decks={decksIncludingCountry} />
    </div>
  );
};

export default DecksIncludingCountrySection;
