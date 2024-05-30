'use client';

import React from 'react';
import Link from 'next/link';
import DeckImage from '@components/_commons/DeckImage';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import SetupStats from './SetupStats';

type Props = {
  gameDeck: Deck;
};

export default function SetupDialogContent({ gameDeck }: Props) {
  if (!gameDeck) {
    return null;
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className='text-2xl font-extralight'>
          {gameDeck.displayName}
        </DialogTitle>
      </DialogHeader>
      <div className='flex flex-col gap-6 font-extralight '>
        {gameDeck.description && (
          <p className='text-left text-sm italic'>{gameDeck.description}</p>
        )}
        <DeckImage
          imageName={gameDeck.name}
          alt={gameDeck.displayName || gameDeck.name}
        />
        <SetupStats gameDeck={gameDeck} />
        <div className='flex justify-center'>
          <Link href={`/quiz/${gameDeck.name || ''}?length=10`}>
            <button
              type='submit'
              className='w-60 rounded-xl border border-gray-400 py-2 text-2xl font-bold italic text-white hover:border-white active:bg-white active:text-background md:w-96 md:text-5xl'
            >
              Play !
            </button>
          </Link>
        </div>
      </div>
    </DialogContent>
  );
}
