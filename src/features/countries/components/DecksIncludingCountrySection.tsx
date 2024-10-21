import React from 'react';
import DeckList from '@features/decks/components/DeckList';
import { getDecks } from '@lib/queries/gameDecks';
import SectionTitle from '@components/_commons/SectionTitle';

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
        text='Included in the following decks'
        variant='description'
        centered={true}
      />
      <DeckList decks={decksIncludingCountry} />
    </div>
  );
};

export default DecksIncludingCountrySection;
