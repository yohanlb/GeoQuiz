'use client';

import React from 'react';
import { Dialog, DialogTrigger } from '@components/ui/dialog';

type Props = {
  gameDeck: Deck;
  children: React.ReactNode;
  dialogContent: React.JSX.Element;
};

export default function SetupDialog({
  gameDeck,
  children,
  dialogContent,
}: Props) {
  if (!gameDeck) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger className='h-full w-full'>{children}</DialogTrigger>
      {dialogContent}
    </Dialog>
  );
}
