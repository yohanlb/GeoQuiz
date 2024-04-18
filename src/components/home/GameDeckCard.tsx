import React from 'react';
import Image from 'next/image';
import ChipScore from '@components/quiz/ChipScore';
import ChipCommunity from '@components/quiz/ChipCommunity';
import IconDeck from '@components/_commons/IconDeck';

type Props = {
  gameDeck: GameDeck;
};

const GameDeckCard = ({ gameDeck }: Props) => (
  <div className='aspect-[4/3] w-full text-left text-sm'>
    <div className='relative aspect-video w-full overflow-hidden rounded-lg'>
      <div className='absolute left-1 top-1 z-20'>
        <ChipScore label='Unplayed' />
      </div>
      <div className='absolute right-1 top-1'>
        <ChipCommunity label='54%' />
      </div>
      <Image
        alt={gameDeck.displayName}
        src={gameDeck.imageUrl}
        fill
        style={{ objectFit: 'cover', zIndex: -1 }}
      />
    </div>
    <div className='flex h-8 items-center align-middle'>
      <h3 className='grow text-sm font-light leading-none tracking-tight text-white'>
        {gameDeck.displayName}
      </h3>
      <div className='flex w-12 shrink-0 gap-1 text-right'>
        <span className='text-xs'>100</span>
        <IconDeck />
      </div>
    </div>
  </div>
);

export default GameDeckCard;
