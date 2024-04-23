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
  const dynamicImageName = gameDeck.name as GameDeck['name'];
  const image = gameDeckImages[dynamicImageName];

  return (
    <div className='group relative aspect-[16/10] w-full justify-between overflow-hidden rounded-lg bg-background p-1 text-left text-sm hover:bg-zinc-700 sm:p-2'>
      <div className='relative z-10 flex h-full flex-col '>
        <div className='flex justify-between'>
          <ChipScore label='87%' />
          <ChipCommunity label='54%' />
        </div>
        <div className='flex grow items-center justify-center text-center'>
          <h3 className='line-clamp-2 text-base font-bold leading-none tracking-wide text-white underline-offset-4 group-hover:underline sm:text-xl'>
            {gameDeck.displayName}
          </h3>
        </div>
        <div className='flex justify-end'>
          <div className='flex gap-1'>
            <span className='text-xs'>{gameDeck.countryIds.length}</span>
            <IconDeck />
          </div>
        </div>
      </div>
      {image && (
        <Image
          alt={gameDeck.displayName}
          src={image}
          fill
          sizes={'600px'}
          className='opacity-70 duration-300 ease-out group-hover:scale-105 group-hover:opacity-100'
          style={{
            objectFit: 'cover',
            zIndex: 5,
          }}
        />
      )}
    </div>
  );
};

export default GameDeckCard;
