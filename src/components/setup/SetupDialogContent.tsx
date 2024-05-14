'use client';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gameDeckImages } from '@lib/utils/importImages';
import SetupDescriptionStats from './SetupDescriptionStats';

type Props = {
  gameDeck: Deck;
};

export default function SetupDialogContent({ gameDeck }: Props) {
  if (!gameDeck) {
    return null;
  }

  const dynamicImageName = gameDeck.name;
  const image = gameDeckImages[dynamicImageName];

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className='text-2xl font-medium md:text-4xl'>
          {gameDeck.displayName}
        </DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <div className='mx-auto max-w-lg'>
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
          <SetupDescriptionStats gameDeck={gameDeck} />
        </div>
      </div>
      <div className='mt-12 flex justify-center md:mt-24'>
        <Link href={`/quiz/${gameDeck.name || ''}?length=10`}>
          <button
            type='submit'
            className='w-60 rounded-xl border border-gray-400 py-2 text-2xl font-bold italic text-white hover:border-white active:bg-white active:text-background md:w-96 md:text-5xl'
          >
            Play !
          </button>
        </Link>
      </div>
    </DialogContent>
  );
}
