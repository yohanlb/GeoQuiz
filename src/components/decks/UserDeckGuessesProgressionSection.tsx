'use client';

import React from 'react';
import { Database } from '@lib/types/database.types';
import useFetchUserCountryGuesses from '@utils/hooks/useFetchUserCountryGuesses';
// import Link from 'next/link';
import UserDeckGuessesProgression, {
  UserDeckGuessesProgressionSkeleton,
} from '@components/decks/UserDeckGuessesProgression';

type UserStatsRow = Database['public']['Tables']['user_guesses_history']['Row'];

type Props = { countryIds: CountryData['id'][] };

function UserDeckGuessesProgressionSection({ countryIds }: Readonly<Props>) {
  const { userGuesses, loading, error } = useFetchUserCountryGuesses({
    countryIds,
  });

  const userGuessesForCapitals = userGuesses?.filter(
    (guess) => guess.question_type_id === 1,
  ) as UserStatsRow[];
  const userGuessesForFlags = userGuesses?.filter(
    (guess) => guess.question_type_id === 2,
  ) as UserStatsRow[];

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='flex flex-col items-center justify-center gap-2 text-center'>
      <div>
        <div className='text-base font-semibold'>
          Your Overall Deck Progress
        </div>
        {/* <Link href='/' className='text-sm text-blue-500 hover:underline'>
          Detailed progress
        </Link> */}
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
