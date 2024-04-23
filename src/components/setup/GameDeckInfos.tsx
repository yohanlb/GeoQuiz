import React from 'react';
import Link from 'next/link';
import ReturnButton from '@assets/ReturnButton.svg';
import Image from 'next/image';
import { gameDeckImages } from '@lib/utils/importImages';

type Props = {
  gameDeck: GameDeck;
};

const GameDeckInfos = ({ gameDeck }: Props) => {
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
            <p>
              Your Best Score:
              <strong className='font-semibold italic'> Unplayed</strong>
            </p>
            <p>
              Community Average Score:
              <strong className='font-semibold italic'> 73%</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDeckInfos;
