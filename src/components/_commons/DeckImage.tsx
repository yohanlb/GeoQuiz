import React from 'react';
import Image from 'next/image';

type Props = {
  imageName: string;
  alt: string;
};

const DeckImage = ({ imageName, alt }: Props) => {
  return (
    imageName && (
      <div className='aspect-[16/10] w-full overflow-hidden rounded-lg'>
        <Image
          alt={alt}
          src={'/images/deckImages/' + imageName}
          width={500}
          height={500}
        />
      </div>
    )
  );
};

export default DeckImage;
