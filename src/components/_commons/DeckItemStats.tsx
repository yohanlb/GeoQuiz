'use client';

import React from 'react';
import CommunityScore from './CommunityScore';
import UserProgress from './UserProgress';

type Props = {
  deck: Deck;
};

function DeckItemStats({ deck }: Props) {
  return (
    <div className='flex justify-between'>
      <UserProgress deck={deck} />
      <CommunityScore deck={deck} />
    </div>
  );
}

export default DeckItemStats;
