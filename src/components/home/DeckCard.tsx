import React from 'react';
import { DECK_IMAGES } from '@lib/utils/importImages';
import Image from 'next/image';
import SetupDialog from '@components/setup/SetupDialog';
import SetupDialogContent from '@components/setup/SetupDialogContent';

type Props = {
  deck: Deck;
};

const gradients = [
  'radial-gradient(circle at 30% 70%, #ff9a76, #ffb899)',
  'radial-gradient(circle at 90% 90%, #33aaff, #66d1ff)',
  'radial-gradient(circle at 50% 50%, #ffa386, #ffccaa)',
  'radial-gradient(circle at 20% 20%, #ff6f61, #ff9470)',
  'radial-gradient(circle at 10% 50%, #4d8ff7, #85afff)',
  'radial-gradient(circle at 50% 50%, #ffab73, #ffd6a5)',
  'radial-gradient(circle at 70% 30%, #70d3a5, #a1e7cd)',
];

const getRandomGradient = () => {
  const gradient1 = gradients[Math.floor(Math.random() * gradients.length)];
  const gradient2 = gradients[Math.floor(Math.random() * gradients.length)];
  return `${gradient1}, ${gradient2}`;
};

const DeckCard = ({ deck }: Props) => {
  const dynamicImageName = deck.name as Deck['name'];
  const image = DECK_IMAGES[dynamicImageName];

  const dialogContent = <SetupDialogContent deck={deck} />;

  const gradientStyle = {
    backgroundImage: getRandomGradient(),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundBlendMode: 'overlay',
  };

  return (
    <div className='group relative aspect-[16/10] w-full justify-between overflow-hidden rounded-lg bg-background text-left text-sm hover:bg-zinc-700'>
      <SetupDialog deck={deck} dialogContent={dialogContent}>
        <div className='relative z-10'>
          <h3
            className={`line-clamp-3 text-base font-normal leading-none tracking-tight text-white underline-offset-4 ${deck.isTextTransparent ? 'opacity-0' : ''} group-hover:underline sm:text-xl`}
          >
            {deck.displayName}
          </h3>
        </div>
        {image ? (
          <div className='absolute inset-0 h-full w-full'>
            <Image
              src={image}
              alt={deck.displayName || deck.name}
              fill
              sizes={'600px'}
              className='opacity-70 duration-300 ease-out group-hover:scale-105 group-hover:opacity-50'
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        ) : (
          <div
            style={gradientStyle}
            className={`absolute inset-0 h-full w-full`}
          ></div>
        )}
      </SetupDialog>
    </div>
  );
};

export default DeckCard;
