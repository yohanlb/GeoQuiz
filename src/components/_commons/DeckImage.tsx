import React from 'react';
import Image from 'next/image';
import { DECK_IMAGES } from '@lib/utils/importImages';

type Props = {
  imageName: string;
  alt: string;
};

const DeckImage = ({ imageName, alt }: Props) => {
  const image = DECK_IMAGES[imageName];

  return (
    image && (
      <div className='aspect-[16/10] w-full overflow-hidden rounded-lg'>
        <Image alt={alt} src={image} />
      </div>
    )
  );
};

export default DeckImage;
