'use client';

import React from 'react';
import UserDeckGuessesProgression, {
  UserDeckGuessesProgressionSkeleton,
} from '@features/decks/components/UserDeckGuessesProgression';
import useFetchUserCountryGuesses from '@hooks/useFetchUserCountryGuesses';
import { navigationLinks } from '@lib/data/navigation-links';
import Link from 'next/link';

type Props = {
  countryIds: CountryRecord['id'][];
  deckName: string;
  questionTypeId: Question['questionTypeId'];
};

function UserDeckGuessesProgressionSection({
  countryIds,
  deckName,
  questionTypeId,
}: Readonly<Props>) {
  const { userGuesses, loading, error } = useFetchUserCountryGuesses({
    countryIds,
  });

  const userGuessesForCapitals = userGuesses?.filter(
    (guess) => guess.question_type_id === 1,
  ) as UserGuessHistoryRecord[];
  const userGuessesForFlags = userGuesses?.filter(
    (guess) => guess.question_type_id === 2,
  ) as UserGuessHistoryRecord[];

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='flex flex-col items-center justify-center gap-2 text-center'>
      <div>
        <div className='text-base font-semibold'>
          Your Overall Deck Progress
        </div>
        <Link
          href={`${navigationLinks.allDecks.href}/${deckName}/${questionTypeId}/progress`}
          className='text-sm text-blue-500 hover:underline'
        >
          Detailed progress
        </Link>
      </div>
      {loading ? (
        <UserDeckGuessesProgressionSkeleton />
      ) : (
        <UserDeckGuessesProgression
          userGuessesForCapitals={userGuessesForCapitals}
          userGuessesForFlags={userGuessesForFlags}
          countryIds={countryIds}
        />
      )}
    </div>
  );
}

export default UserDeckGuessesProgressionSection;
