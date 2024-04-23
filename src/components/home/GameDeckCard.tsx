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

  if (!image) {
    return (
      <div className='group flex aspect-[16/9] w-full flex-col justify-between rounded-lg bg-background p-1 text-left text-sm hover:bg-zinc-700'>
        <div className='flex justify-between'>
          <ChipScore label='87%' />
          <ChipCommunity label='54%' />
        </div>
        <div className='flex grow items-center justify-center text-center'>
          <h3 className='text-base font-bold leading-none tracking-wider text-white underline-offset-4 group-hover:underline'>
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
    );
  } else {
    return (
      <div className='group relative flex aspect-[16/9] w-full flex-col justify-between overflow-hidden rounded-lg bg-black/20 p-1 text-left text-sm transition-all duration-200 hover:bg-black/0 '>
        <div className='flex justify-between'>
          <ChipScore label='87%' />
          <ChipCommunity label='54%' />
        </div>
        <div className='flex grow items-center justify-center text-center'>
          <h3 className='text-base font-bold leading-none tracking-wider text-white underline-offset-4 group-hover:underline'>
            {gameDeck.displayName}
          </h3>
        </div>
        <div className='flex justify-end'>
          <div className='flex gap-1'>
            <span className='text-xs'>{gameDeck.countryIds.length}</span>
            <IconDeck />
          </div>
        </div>
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
      </div>
    );
  }
};

export default GameDeckCard;
