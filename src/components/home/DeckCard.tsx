import React from 'react';
import { getRandomCardGradient } from '@lib/utils';
import Image from 'next/image';
import DeckInfoDialog from '@components/home/DeckInfoDialog';
import DeckInfoDialogContent from '@components/home/DeckInfoDialogContent';

type Props = {
  deck: Deck;
};

const DeckCard = ({ deck }: Props) => {
  const dialogContent = <DeckInfoDialogContent deck={deck} />;

  const gradientStyle = {
    backgroundImage: getRandomCardGradient(),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundBlendMode: 'overlay',
  };

  return (
    <div className='group relative aspect-[16/10] w-full justify-between overflow-hidden rounded-lg bg-background text-left text-sm hover:bg-zinc-700'>
      <DeckInfoDialog deck={deck} dialogContent={dialogContent}>
        <div className='relative z-10'>
          <h3
            className={`line-clamp-3 text-base font-normal leading-none tracking-tight text-white underline-offset-4 ${deck.isTextTransparent ? 'opacity-0' : ''} group-hover:underline sm:text-xl`}
          >
            {deck.displayName}
          </h3>
        </div>
        {deck.image_name ? (
          <div className='absolute inset-0 h-full w-full'>
            <Image
              src={'/images/deckImages/' + deck.image_name}
              alt={deck.displayName || deck.name}
              fill
              sizes={'600px'}
              className='opacity-70 duration-300 ease-out group-hover:scale-105 group-hover:opacity-50'
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        ) : (
          <div
            style={gradientStyle}
            className={`absolute inset-0 h-full w-full`}
          ></div>
        )}
      </DeckInfoDialog>
    </div>
  );
};

export default DeckCard;
