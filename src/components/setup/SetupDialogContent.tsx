'use client';

import React from 'react';
import { TbCardsFilled } from 'react-icons/tb';
import Link from 'next/link';
import DeckImage from '@components/_commons/DeckImage';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import SetupStats from './SetupStats';

type Props = {
  deck: Deck;
};

export default function SetupDialogContent({ deck }: Props) {
  if (!deck) {
    return null;
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className='text-2xl font-extralight'>
          {deck.displayName}
        </DialogTitle>
        <div className='flex items-center gap-1'>
          <TbCardsFilled className='inline size-5' />
          <span className='font-thin'>{deck.countryIds.length} Countries.</span>
        </div>
      </DialogHeader>
      <div className='flex flex-col gap-6 font-extralight'>
        {deck.description && (
          <p className='text-left text-sm italic'>{deck.description}</p>
        )}
        <DeckImage imageName={deck.name} alt={deck.displayName || deck.name} />
        <SetupStats deck={deck} />
        <div className='flex justify-center'>
          <Link href={`/quiz/${deck.name || ''}?length=10`}>
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
