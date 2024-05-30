'use client';

import React from 'react';
import { TbCardsFilled } from 'react-icons/tb';
import { useStoreDeckResults } from '@/src/stores/deckResults';
import Image from 'next/image';
import peopleIcon from '@icons/people-icon.svg';
import personIcon from '@icons/person-icon.svg';

type Props = {
  gameDeck: Deck;
};

function SetupStats({ gameDeck }: Props) {
  const getDeckScores = useStoreDeckResults((state) => state.getDeckScores);
  const userScore = getDeckScores(gameDeck.id);
  const userScoreFormatted = userScore?.capital
    ? `${userScore.capital}%`
    : 'Unplayed';

  return (
    <div className='flex flex-col text-sm font-thin'>
      <div className='flex'>
        <Image
          className='mr-2 inline-block'
          src={personIcon}
          width={14}
          height={14}
          alt='person-icon'
        />
        <span>
          Your Last Score:{' '}
          <strong className='font-medium'>{userScoreFormatted}</strong>.
        </span>
      </div>
      {gameDeck.averageSuccessRatio && (
        <div className='flex'>
          <Image
            className='mr-2 inline-block'
            src={peopleIcon}
            width={14}
            height={14}
            alt='people-icon'
          />
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
