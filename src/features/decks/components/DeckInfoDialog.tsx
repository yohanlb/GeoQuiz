'use client';

import React from 'react';
import { Dialog, DialogTrigger } from '@/src/shared/components/ui/dialog';

type Props = {
  deck: DeckRecord;
  children: React.ReactNode;
  dialogContent: React.JSX.Element;
};

export default function DeckInfoDialog({
  deck,
  children,
  dialogContent,
}: Props) {
  if (!deck) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger className='h-full w-full'>{children}</DialogTrigger>
      {dialogContent}
    </Dialog>
  );
}
