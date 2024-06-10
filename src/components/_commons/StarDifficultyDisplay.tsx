'use client';

import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import StarsIndicator from './StarsIndicator';

type Props = {
  percent: number;
};

function StarDifficultyDisplay({ percent }: Props) {
  return (
    <Popover color='default' placement='bottom' showArrow={true}>
      <PopoverTrigger>
        <button className='border-0 outline-none'>
          <StarsIndicator percent={percent} />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <p className='text-sm'>
          Average community score for this country: <strong>{percent}%</strong>
        </p>
      </PopoverContent>
    </Popover>
  );
}

export default StarDifficultyDisplay;
