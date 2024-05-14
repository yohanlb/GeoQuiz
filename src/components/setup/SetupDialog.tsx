'use client';
import { Dialog, DialogTrigger } from '@components/ui/dialog';
import React from 'react';

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
