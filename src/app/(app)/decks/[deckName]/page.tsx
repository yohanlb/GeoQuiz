import React from 'react';
import DeckPageContent from '@features/decks/components/DeckPageContent';
import { getDeckByName, getDecks } from '@features/decks/server/db/decks-rest';

type Props = {
  params: Promise<{ deckName: string }>;
};

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const { displayName } = await getDeckByName(params.deckName);

  return {
    title: `Play: ${displayName}`,
    description: `Start a quiz about ${displayName}!`,
  };
}

export async function generateStaticParams() {
  const decks = await getDecks();
  return decks.map((deck) => ({
    deckName: deck.name,
  }));
}

const Country = async (props: Props) => {
  const params = await props.params;
  const deck = await getDeckByName(params.deckName);

  return (
    <div className='mx-auto max-w-md px-4 py-2 md:px-0'>
      <DeckPageContent deck={deck} />
    </div>
  );
};

export default Country;
