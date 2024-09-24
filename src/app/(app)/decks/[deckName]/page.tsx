import React from 'react';
import { getDeckByName } from '@/src/utils/queries/gameDecks';
import DeckPageContent from '@components/decks/DeckPageContent';

type Props = {
  params: { deckName: string };
};

const Country = async ({ params }: Props) => {
  const deck = await getDeckByName(params.deckName);

  return (
    <div className='mx-auto max-w-md px-4 py-2 md:px-0'>
      <DeckPageContent deck={deck} />
    </div>
  );
};

export default Country;
