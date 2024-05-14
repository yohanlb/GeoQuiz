import Image from 'next/image';
import React from 'react';
import deckIcon from '@assets/deck-icon.svg';
import peopleIcon from '@assets/people-icon.svg';

type Props = {
  gameDeck: Deck;
};

function SetupDescriptionStats({ gameDeck }: Props) {
  return (
    <div className='text-left text-sm md:text-lg'>
      <p>
        Goal:
        <strong className='font-semibold italic'>
          {' '}
          Guess the right capitals.
        </strong>
      </p>
      <div className='flex gap-1'>
        <span>Countries in this deck:</span>
        <span className='font-semibold italic'>
          {gameDeck.countryIds.length}
        </span>
        <Image src={deckIcon} width={18} height={18} alt='deck-icon' />
      </div>
      <div className='flex gap-1'>
        <span>Community Average Score:</span>
        <Image src={peopleIcon} width={18} height={18} alt='deck-icon' />
        <span className='font-semibold italic'>
          {gameDeck.averageSuccessRatio}%
        </span>
      </div>
    </div>
  );
}

export default SetupDescriptionStats;
