import React from 'react';
import Image from 'next/image';

type Props = {
  imageName: string | null;
  alt: string;
};

const DeckImage = ({ imageName, alt }: Props) => {
  return (
    imageName && (
      <div className='flex w-60 overflow-hidden rounded-lg'>
        <Image
          alt={alt}
          src={'/images/deckImages/' + imageName}
          width={240}
          height={240}
        />
      </div>
    )
  );
};

export default DeckImage;
