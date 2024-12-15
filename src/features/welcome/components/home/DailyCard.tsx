'use client';

import React from 'react';
import { Card } from '@nextui-org/react';
import Image from 'next/image';

const DailyCard = () => {
  return (
    <Card className='group flex h-full w-full items-center justify-center rounded-lg bg-neutral-800'>
      <h3 className='z-10 text-8xl text-white duration-300 ease-in-out group-hover:text-9xl'>
        ?
      </h3>
      <Image
        src={'/images/deckImages/Daily.jpg'}
        alt='Country of the Day'
        fill
        sizes={'600px'}
        className='blur-md duration-300 ease-out group-hover:scale-105'
        style={{
          objectFit: 'cover',
        }}
      />
    </Card>
  );
};

export default DailyCard;
