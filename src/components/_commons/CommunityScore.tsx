'use client';

import React from 'react';
import { GrScorecard } from 'react-icons/gr';
import useGameStore from '@/src/stores/gameStore';
import HorizontalBars from './HorizontalBars';

type Props = {
  deck: Deck;
};

function CommunityScore({ deck }: Props) {
  const { questionType } = useGameStore();
  const scoreToDisplay = deck.decks_stats[questionType].averageScore;

  return (
    <div className='flex flex-col items-end gap-2'>
      <p className='font-normal leading-none'>Community Score</p>
      <div className='flex items-center gap-2'>
        <GrScorecard className='size-6 shrink-0' />
        <HorizontalBars value={scoreToDisplay} />
        <span className='text-right font-mono font-medium'>
          {scoreToDisplay}%
        </span>
      </div>
    </div>
  );
}

export default CommunityScore;
