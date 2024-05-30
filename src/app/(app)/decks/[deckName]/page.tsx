import React from 'react';
import { getDeckByName } from '@/src/queries/gameDecks';
import Link from 'next/link';
import DeckImage from '@components/_commons/DeckImage';
import SetupStats from '@components/setup/SetupStats';
import { Button } from '@components/ui/button';

type Props = {
  params: { deckName: string };
};

const Country = async ({ params }: Props) => {
  const deck = await getDeckByName(params.deckName);

  return (
    <div className='mx-auto flex max-w-md flex-col gap-2 px-2 py-2 md:px-0'>
      <h1 className='text-center text-3xl'>{deck.displayName}</h1>
      <DeckImage imageName={deck.name} alt={deck.name} />
      <p className=''> {deck.description}</p>
      <SetupStats gameDeck={deck} />
      <div className='flex justify-center'>
        <Link href={`/quiz/${deck.name || ''}?length=10`}>
          <Button>Play !</Button>
        </Link>
      </div>
    </div>
  );
};

export default Country;
