'use client';

import React from 'react';
import CommunityScore from '@components/_commons/CommunityScore';
import UserProgress from '@components/_commons/UserProgress';

type Props = {
  deck: Deck;
};

function SetupStats({ deck }: Props) {
  return (
    <div className='flex flex-col gap-4 text-sm font-thin'>
      <div className='flex justify-between'>
        <UserProgress deck={deck} />
        <CommunityScore deck={deck} />
      </div>
    </div>
  );
}

export default SetupStats;
