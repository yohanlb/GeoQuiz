import React from 'react';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

type Props = {
  gameDeck: GameDeck;
};

const GameDeckCard = ({ gameDeck }: Props) => (
  <div
    className='
  from-bg-gradient-start to-bg-gradient-end group transform rounded-2xl
  border border-gray-700 bg-gradient-to-b
  p-2.5 outline-1 drop-shadow-md transition duration-300 hover:outline'
  >
    <div className='overflow-hidden rounded-xl'>
      <div className='relative h-32 duration-500 ease-out group-hover:scale-105 sm:h-52'>
        <Image
          alt={gameDeck.displayName}
          src={gameDeck.imageUrl}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>

    <div className='mt-3 text-left text-xs font-extralight text-gray-400 '>
      <div className='mb-3 flex items-center justify-between'>
        <h3 className='text-xl font-light leading-none tracking-tight text-white'>
          {gameDeck.displayName}
        </h3>
        <span className=' flex-shrink-0'>
          <span className='mr-1'>10</span>
          <span className='hidden md:inline'>Questions</span>
          <QuestionMarkCircledIcon className='inline align-top md:hidden' />
        </span>
      </div>
      <p>Unplayed</p>
      <p>
        Community average:
        <em className='font-medium text-white'> _</em>
      </p>
    </div>
  </div>
);

export default GameDeckCard;
