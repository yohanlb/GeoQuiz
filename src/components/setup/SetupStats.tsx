'use client';

import React from 'react';
import { GoPerson } from 'react-icons/go';
import { GoPeople } from 'react-icons/go';
import { TbCardsFilled } from 'react-icons/tb';
import { useDeckHistory } from '@/src/stores/deckHistoryStore';

type Props = {
  gameDeck: Deck;
};

function SetupStats({ gameDeck }: Props) {
  const getDeckScore = useDeckHistory((state) => state.getDeckScore);
  const userScore = getDeckScore(gameDeck.id);
  const userScoreFormatted = userScore ? `${userScore}%` : 'Unplayed';

  return (
    <div className='flex flex-col gap-1 text-sm font-thin'>
      <div className='flex'>
        <GoPerson className='mr-1 size-5' />
        <span>
          Your Last Score:{' '}
          <strong className='font-medium'>{userScoreFormatted}</strong>.
        </span>
      </div>
      {gameDeck.averageSuccessRatio && (
        <div className='flex'>
          <GoPeople className='mr-1 size-5' />
          <span>
            Community Average Score:{' '}
            <strong className='font-medium'>
              {gameDeck.averageSuccessRatio}%
            </strong>
            .
          </span>
        </div>
      )}
      <div className='flex'>
        <span>
          <TbCardsFilled className='inline size-5' />{' '}
          {gameDeck.countryIds.length} Countries.
        </span>
      </div>
    </div>
  );
}

export default SetupStats;
