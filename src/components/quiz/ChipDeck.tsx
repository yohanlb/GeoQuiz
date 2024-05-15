import React from 'react';
import deckIcon from '@icons/deck-icon.svg';
import Image from 'next/image';

type Props = {
  value: number;
};

const ChipDeck = ({ value }: Props) => {
  return (
    <div className='flex gap-1'>
      <span className='text-xs'>{value}</span>
      <Image src={deckIcon} width={16} height={16} alt='deck-icon' />
    </div>
  );
};

export default ChipDeck;
