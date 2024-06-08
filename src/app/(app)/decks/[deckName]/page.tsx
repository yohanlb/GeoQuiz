import React from 'react';
import { TbCardsFilled } from 'react-icons/tb';
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
    <div className='mx-auto flex max-w-md flex-col gap-4 px-4 py-2 md:gap-8 md:px-0'>
      <div>
        <h1 className='text-2xl font-semibold'>{deck.displayName}</h1>
        <div className='flex items-center gap-1'>
          <TbCardsFilled className='inline size-5' />
          <span className='font-thin'>
            <strong> {deck.countryIds.length}</strong> Countries.
          </span>
        </div>
      </div>
      {deck.description && <p>{deck.description}</p>}
      <DeckImage imageName={deck.name} alt={deck.name} />
      <SetupStats deck={deck} />

      <div className='flex justify-center'>
        <Link href={`/quiz/${deck.name || ''}?length=10`}>
          <Button
            size={'lg'}
            className='rounded-xl p-6 text-4xl font-extrabold italic'
          >
            Play !
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Country;
