'use client';

import React from 'react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/src/shared/components/ui/dialog';
import DeckPageContent from '@features/decks/components/DeckPageContent';

type Props = {
  deck: DeckWithStatsRecord;
};

export default function DeckInfoDialogContent({ deck }: Props) {
  if (!deck) {
    return null;
  }

  return (
    <DialogContent
      className='bg-gradient-to-b from-bg-gradient-start to-bg-gradient-end'
      aria-describedby={undefined}
    >
      <DialogHeader>
        <DialogTitle className='text-left text-2xl font-semibold'>
          {deck.displayName}
        </DialogTitle>
      </DialogHeader>
      <DeckPageContent deck={deck} hideTitle />
    </DialogContent>
  );
}
