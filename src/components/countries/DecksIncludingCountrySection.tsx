import React from 'react';
import { getDecks } from '@/src/queries/gameDecks';
import SectionTitle from '@components/_commons/SectionTitle';
import DeckList from '@components/decks/DeckList';

const DecksIncludingCountrySection = async ({
  countryId,
}: {
  countryId: number;
}) => {
  const decks = await getDecks();

  const decksIncludingCountry = decks.filter((deck) =>
    deck.countryIds?.includes(countryId),
  );

  if (decksIncludingCountry.length === 0) {
    return null;
  }

  return (
    <div className='space-y-2'>
      <SectionTitle
        text='Included in the following decks:'
        variant='description'
      />
      <DeckList decks={decksIncludingCountry} />
    </div>
  );
};

export default DecksIncludingCountrySection;
