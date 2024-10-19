import React from 'react';
import CountryProgressList from '@/src/app/(app)/decks/[deckName]/progress/CountryProgressList';
import { getDeckByName } from '@/src/utils/queries/gameDecks';
import { getCountryById } from '@utils/db/countries';
import SectionTitle from '@components/_commons/SectionTitle';

type Props = {
  params: { deckName: string };
};

export async function generateMetadata({ params }: Props) {
  const { displayName } = await getDeckByName(params.deckName);

  return {
    title: `Deck Progress: ${displayName}`,
    description: `Check your progress for the deck ${displayName}!`,
  };
}

const DeckProgress = async ({ params }: Props) => {
  const deck = await getDeckByName(params.deckName);
  const deckCountries = await getCountryById(deck.countryIds);

  return (
    <div className='flex flex-col gap-8'>
      <SectionTitle text={`Progress for deck: ${deck.displayName}`} />
      {deckCountries && deckCountries.length > 0 ? (
        <CountryProgressList countries={deckCountries} />
      ) : (
        <p>No countries to display.</p>
      )}
    </div>
  );
};

export default DeckProgress;
