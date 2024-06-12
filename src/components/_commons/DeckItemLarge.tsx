import React from 'react';
import { TbCardsFilled } from 'react-icons/tb';

type Props = {
  deck: Deck;
};

function DeckItemLarge({ deck }: Props) {
  return (
    <div className='flex flex-col gap-2 rounded-lg border border-gray-400 bg-background p-2 hover:border-gray-50'>
      <div className='flex justify-between'>
        <div className='text-lg font-medium'>{deck.displayName}</div>
        <div className='flex shrink-0 items-center gap-1'>
          {deck.countryIds.length}
          <TbCardsFilled className='size-6' />
        </div>
      </div>
    </div>
  );
}

export default DeckItemLarge;
