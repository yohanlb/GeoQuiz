'use client';

import React from 'react';
import DeckPageContent from '@components/decks/DeckPageContent';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';

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
        <DialogTitle className='text-left text-2xl font-semibold'>
          {deck.displayName}
        </DialogTitle>
      </DialogHeader>
      <DeckPageContent deck={deck} hideTitle />
    </DialogContent>
  );
}
