import React from 'react';
import Image from 'next/image';
import ChipScore from '@components/quiz/ChipScore';
import { gameDeckImages } from '@lib/utils/importImages';
import ChipDeck from '@components/quiz/ChipDeck';
import ChipCommunity from '@components/quiz/ChipCommunity';
import playButton from '@assets/PlayButton.svg';
import Link from 'next/link';

type Props = {
  deck: Deck;
};

const GameDeckCard = ({ deck }: Props) => {
  const dynamicImageName = deck.name as Deck['name'];
  const image = gameDeckImages[dynamicImageName];

  return (
    <div className='group relative aspect-[16/10] w-full justify-between overflow-hidden rounded-lg bg-background p-1 text-left text-sm hover:bg-zinc-700 sm:p-2'>
      <div className='relative z-10 flex h-full flex-col '>
        <div className='flex grow justify-center pt-2 text-center'>
          <h3 className='line-clamp-2 text-lg font-bold leading-none tracking-wide text-white underline-offset-4 group-hover:underline sm:text-xl'>
            {deck.displayName}
          </h3>
        </div>
        <div className='invisible flex items-end justify-between group-hover:visible'>
          <ChipScore label='12%' />
          <ChipCommunity label='__%' />
          <ChipDeck value={deck.countryIds.length} />
          <Link href={`/setup/${deck.name}`} className='flex'>
            <button>
              <Image
                src={playButton}
                alt='Settings Icon'
                className='h-6 w-6 md:h-8 md:w-8'
              />
            </button>
          </Link>
        </div>
      </div>
      {image && (
        <Image
          alt={deck.displayName}
          src={image}
          fill
          sizes={'600px'}
          className='opacity-90 duration-300 ease-out group-hover:scale-105 group-hover:opacity-50'
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
