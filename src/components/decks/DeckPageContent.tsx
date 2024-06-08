import React from 'react';
import { TbCardsFilled } from 'react-icons/tb';
import Link from 'next/link';
import DeckImage from '@components/_commons/DeckImage';
import SwitchQuestionType from '@components/_commons/SwitchQuestionType';
import SetupStats from '@components/setup/SetupStats';
import { Button } from '@components/ui/button';

type Props = {
  deck: Deck;
  hideTitle?: boolean;
};

const DeckPageContent = ({ deck, hideTitle = false }: Props) => {
  return (
    <>
      <div>
        {!hideTitle && (
          <h1 className='text-2xl font-semibold'>{deck.displayName}</h1>
        )}
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

      <SwitchQuestionType />
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
    </>
  );
};

export default DeckPageContent;
