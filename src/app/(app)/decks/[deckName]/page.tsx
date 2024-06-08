import React from 'react';
import { getDeckByName } from '@/src/queries/gameDecks';
import DeckPageContent from '@components/decks/DeckPageContent';

type Props = {
  params: { deckName: string };
};

const Country = async ({ params }: Props) => {
  const deck = await getDeckByName(params.deckName);

  return (
    <div className='mx-auto flex max-w-md flex-col gap-4 px-4 py-2 md:gap-8 md:px-0'>
      <DeckPageContent deck={deck} />
    </div>
  );
};

export default Country;
