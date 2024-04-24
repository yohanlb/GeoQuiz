import React from 'react';
import Link from 'next/link';
import ReturnButton from '@assets/ReturnButton.svg';
import Image from 'next/image';
import { gameDeckImages } from '@lib/utils/importImages';
import deckIcon from '@assets/deck-icon.svg';
import peopleIcon from '@assets/people-icon.svg';

type Props = {
  gameDeck: GameDeck;
  communityAveragePercent: number;
};

const GameDeckInfos = ({ gameDeck, communityAveragePercent }: Props) => {
  const dynamicImageName = gameDeck.name;
  const image = gameDeckImages[dynamicImageName];

  return (
    <div className='px-4 md:px-0'>
      <div className='mx-auto max-w-lg'>
        <div className='flex items-center gap-2 '>
          <Link href='/'>
            <Image src={ReturnButton} alt='Return Button' className='w-8' />
          </Link>
          <h1 className='text-2xl font-medium md:text-4xl'>
            {gameDeck.displayName}
          </h1>
        </div>
        <div className='mt-4 flex flex-col gap-4 px-0 md:mt-8 md:gap-8'>
          <p className='text-left text-sm md:text-lg'>{gameDeck.description}</p>
          {image && (
            <div className='relative mx-auto h-40 w-52 overflow-hidden rounded-xl md:h-96 md:w-full'>
              <Image
                alt={gameDeck.displayName}
                src={image}
                fill
                sizes={'600px'}
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
          )}
          <div className='text-left text-sm md:text-lg'>
            <p>
              Goal:
              <strong className='font-semibold italic'>
                {' '}
                Guess the right capitals.
              </strong>
            </p>
            {/* <p>
              Your Best Score:
              <strong className='font-semibold italic'> Unplayed</strong>
            </p> */}
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
                {communityAveragePercent}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDeckInfos;
