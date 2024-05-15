import React from 'react';
import deckIcon from '@icons/deck-icon.svg';
import Image from 'next/image';

type Props = {
  size?: number;
};

const IconDeck = ({ size = 16 }: Props) => {
  return <Image src={deckIcon} width={size} height={size} alt='deck-icon' />;
};

export default IconDeck;
