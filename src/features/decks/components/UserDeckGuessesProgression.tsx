'use client';

import React from 'react';
import { FaRegFlag } from 'react-icons/fa6';
import { PiCity } from 'react-icons/pi';
import DeckProgressByQuestionType from '@features/decks/components/DeckProgressByQuestionType';
import { Skeleton } from '@nextui-org/react';

type Props = {
  countryIds: CountryRecord['id'][];
  userGuessesForCapitals: UserGuessHistoryRecord[];
  userGuessesForFlags: UserGuessHistoryRecord[];
};

function UserDeckGuessesProgression({
  countryIds,
  userGuessesForCapitals,
  userGuessesForFlags,
}: Readonly<Props>) {
  return (
    <div className='flex items-center gap-1'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <DeckProgressByQuestionType
          countryIds={countryIds}
          userGuesses={userGuessesForCapitals ?? []}
          icon={<PiCity className='text-xl' />}
        />
      </div>
      <div className='flex flex-col items-center justify-center gap-2'>
        <DeckProgressByQuestionType
          countryIds={countryIds}
          userGuesses={userGuessesForFlags ?? []}
          icon={<FaRegFlag className='text-xl' />}
        />
      </div>
    </div>
  );
}

export function UserDeckGuessesProgressionSkeleton() {
  return (
    <div className='flex items-center gap-1'>
      {/* Skeleton for Capital cities progress */}
      <div className='flex flex-col items-center justify-center gap-2'>
        <Skeleton className='h-24 w-24 rounded-full' />
      </div>

      {/* Skeleton for Flags progress */}
      <div className='flex flex-col items-center justify-center gap-2'>
        <Skeleton className='h-24 w-24 rounded-full' />
      </div>
    </div>
  );
}

export default UserDeckGuessesProgression;
