import React from 'react';
import DeckPageContent from '@features/decks/components/DeckPageContent';
import { getDeckByName } from '@lib/queries/gameDecks';

type Props = {
  params: { deckName: string };
};

export async function generateMetadata({ params }: Props) {
  const { displayName } = await getDeckByName(params.deckName);

  return {
    title: `Play: ${displayName}`,
    description: `Start a quiz about ${displayName}!`,
  };
}

const Country = async ({ params }: Props) => {
  const deck = await getDeckByName(params.deckName);

  return (
    <div className='mx-auto max-w-md px-4 py-2 md:px-0'>
      <DeckPageContent deck={deck} />
    </div>
  );
};

export default Country;
