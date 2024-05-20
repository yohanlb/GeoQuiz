import React from 'react';
import Image from 'next/image';
import { DECK_IMAGES } from '@lib/utils/importImages';
import SetupDialog from '@components/setup/SetupDialog';
import SetupDialogContent from '@components/setup/SetupDialogContent';

type Props = {
  deck: Deck;
};

const DeckCard = ({ deck }: Props) => {
  const dynamicImageName = deck.name as Deck['name'];
  const image = DECK_IMAGES[dynamicImageName];

  const dialogContent = <SetupDialogContent gameDeck={deck} />;

  return (
    <div className='group relative aspect-[16/10] w-full justify-between overflow-hidden rounded-lg bg-background text-left text-sm hover:bg-zinc-700'>
      <SetupDialog gameDeck={deck} dialogContent={dialogContent}>
        <div className='relative z-10'>
          <h3
            className={`line-clamp-3	text-base font-normal leading-none  tracking-tight text-white underline-offset-4 ${deck.isTextTransparent ? 'opacity-0' : ''} group-hover:underline sm:text-xl`}
          >
            {deck.displayName}
          </h3>
        </div>
        {image && (
          <div className='absolute inset-0 h-full w-full'>
            <Image
              src={image}
              alt={deck.displayName || deck.name}
              fill
              sizes={'600px'}
              className='opacity-70 duration-300 ease-out group-hover:scale-105 group-hover:opacity-50'
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        )}
      </SetupDialog>
    </div>
  );
};

export default DeckCard;
