import React from 'react';
import { FaRegFlag } from 'react-icons/fa6';
import { PiCity } from 'react-icons/pi';
import HorizontalBars from './HorizontalBars';

type Props = {
  deck: Deck;
};

function CommunityScore({ deck }: Props) {
  return (
    <div className='flex flex-col items-end gap-2'>
      <p className='font-medium leading-none'>Community Score</p>
      <div className='flex items-center gap-2'>
        <PiCity className='size-6 shrink-0' />
        <HorizontalBars value={deck.averageSuccessRatio} />
        <span className='text-right font-mono font-medium'>
          {deck.averageSuccessRatio}%
        </span>
      </div>
      <div className='flex items-center gap-2'>
        <FaRegFlag className='size-6 shrink-0' />
        <HorizontalBars value={0} />
        <span className='text-right font-mono font-medium'>__%</span>
      </div>
    </div>
  );
}

export default CommunityScore;
