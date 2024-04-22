import React from 'react';
import Image from 'next/image';
import ChipScore from '@components/quiz/ChipScore';
import ChipCommunity from '@components/quiz/ChipCommunity';
import IconDeck from '@components/_commons/IconDeck';
import { gameDeckImages } from '@lib/utils/importImages';

type Props = {
  gameDeck: GameDeck;
};

const GameDeckCard = ({ gameDeck }: Props) => {
  const dynamicImageName = gameDeck.name;
  const image = gameDeckImages[dynamicImageName];

  console.log(image, dynamicImageName);

  return (
    <div className='group  w-full text-left text-sm'>
      <div className='relative aspect-video w-full overflow-hidden rounded-lg shadow-light shadow-black/40 group-hover:shadow-strong'>
        <div className='absolute left-1 top-1 z-20'>
          <ChipScore label='87%' />
        </div>
        <div className='absolute right-1 top-1'>
          <ChipCommunity label='54%' />
        </div>
        {gameDeck.imageAvailable && (
          <Image
            alt={gameDeck.displayName}
            src={image}
            fill
            sizes={'600px'}
            className=' duration-300 ease-out group-hover:scale-105'
            style={{
              objectFit: 'cover',
              zIndex: -1,
            }}
          />
        )}
      </div>
      <div className=' flex h-8 items-center gap-1 align-middle '>
        <h3 className='grow text-base font-light leading-none tracking-tight text-white '>
          {gameDeck.displayName}
        </h3>
        <div className='flex w-12 shrink-0 gap-1 text-right '>
          <span className='text-xs'>100</span>
          <IconDeck />
        </div>
      </div>
    </div>
  );
};

export default GameDeckCard;
